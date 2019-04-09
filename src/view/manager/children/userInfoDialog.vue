<template>
  <div class="userInfoDia">
    <Modal v-model="modal1" :title="title" :mask-closable="false" @on-cancel="cancel" width="800">
      <Row>
        <Col span="24" class="pl20 pr20">
          <Tabs type="card" :animated="false" @on-click="select" v-model="newSelectTag">
            <TabPane
              label="企业"
              name="company"
              v-if="(this.$parent.dialogType=='客户编辑'&& this.$parent.selectTag=='company')||this.$parent.dialogType=='添加客户'"
            >
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>企业名称：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="companyList.name"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>简称：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="companyList.name"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>公司行业：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Select v-model="companyList.tradeDesc">
                      <Option
                        v-for="item in tradeTypeList"
                        :value="item.item"
                        :key="item.id"
                      >{{ item.item }}</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>公司人数：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Select v-model="companyList.scaleDesc">
                      <Option
                        v-for="item in companyNumberList"
                        :value="item.item"
                        :key="item.id"
                      >{{ item.item }}</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>法人姓名：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="companyList.legal"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>证件类型：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Select v-model="companyList.idcardType">
                      <Option
                        v-for="item in priseIdcardTypeList"
                        :value="item.id"
                        :key="item.id"
                      >{{ item.item }}</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>证件号码：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="companyList.idcard"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>联系人：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="companyList.contacts"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>联系电话：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="companyList.contacts"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>联系邮箱：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="companyList.email"></Input>
                  </Col>
                </Row>
              </Col>
              <!-- <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>证件号码：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="companyList.idcard"></Input>
                  </Col>
                </Row>
              </Col> -->
              <!-- <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>证件号码：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="companyList.idcard"></Input>
                  </Col>
                </Row>
              </Col> -->
              <Col span="24">
                <!-- 企业上传 -->
                <uploadFile
                  v-for="(item,ind) in enterpriseUploadlist" :key="ind" :img="item.img" :name="'enterpriseUploadlist'" :onUploadlist="enterpriseUploadlist"
                  @enterpriseUploadlist="enterpriseUploadlistEmit" :indexKey="ind" :newSelectTag="newSelectTag" :state="item.status"
                  :uploadTitle="item.title" :actionUrl="item.actionUrl"
                ></uploadFile>
              </Col>
            </TabPane>
            <TabPane
              label="个人"
              name="persona"
              v-if="(this.$parent.dialogType=='客户编辑'&& this.$parent.selectTag=='persona')||this.$parent.dialogType=='添加客户'"
            >
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>登录名称：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="personaList.loginName"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>密码：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="personaList.password"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>姓名：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="personaList.name"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>姓名简称：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="personaList.name"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>证件类型：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Select v-model="personaList.idcardType">
                      <Option
                        v-for="item in personaIdcardList"
                        :value="item.id"
                        :key="item.id"
                      >{{ item.item }}</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>证件号码：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="personaList.idcard"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>联系地址：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="personaList.address"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>邮箱：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="personaList.email"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>邮箱：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="personaList.email"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="12" class="pr20">
                <Row class="_labelFor">
                  <Col span="6" offset="1">
                    <p>
                      <span class="_span">*</span>
                      <b>邮箱：</b>
                    </p>
                  </Col>
                  <Col span="16">
                    <Input class="inputOf" v-model="personaList.email"></Input>
                  </Col>
                </Row>
              </Col>
              <Col span="24">
                <!-- 个人上传 -->
                <uploadFile
                  v-for="(item,ind) in personalUploadlist"
                  :name="'personalUploadlist'"
                  @personalUploadlist="personalUploadlistEmit"
                  :onUploadlist="personalUploadlist"
                  :img="item.img"
                  :indexKey="ind"
                  :key="ind"
                  :newSelectTag="newSelectTag"
                  :status="item.status"
                  :uploadTitle="item.title"
                  :actionUrl="item.actionUrl"
                ></uploadFile>
              </Col>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <div>
        <slot></slot>
      </div>
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="addOrEdit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import uploadFile from '@/view/manager/children/uploadFile'
// personIdcardType
import {
  personIdcardType,
  priseIdcardType,
  companyNumber,
  tradeType,
  getCompanyForm,
  getPersonForm
} from '@/api/contrace.js'
export default {
  props: {
    selectTag: String
  },
  components: {
    uploadFile
  },
  data () {
    return {
      newSelectTag: this.selectTag,
      tradeTypeList: [], // 公司类型列表
      companyNumberList: [], // 公司人数列表
      personaIdcardList: [], // 个人证件类型
      priseIdcardTypeList: [], // 企业证件类型
      hangye: null,
      companyList: {},
      personaList: {},
      userList: [
        { name: 'dewd', id: 2 },
        { name: 'dewd', id: 1 },
        { name: 'dewd', id: 3 }
      ],
      title: '',
      personalUploadlist: [
        {
          title: '身份证正面',
          actionUrl: '/file/uploadToId',
          img: [{
            name: '123',
            url: 'https://exp.bdstatic.com/static/common-jquery/widget/search-box/img/logo_83ae7e2.png'
          }], // 回显
          status: false
        },
        {
          title: '身份证反面',
          actionUrl: '/file/uploadToId',
          img: [{
            name: '123',
            url: 'https://exp.bdstatic.com/static/common-jquery/widget/search-box/img/logo_83ae7e2.png'
          }], // 回显,
          status: true

        },
        {
          title: '手持身份证',
          actionUrl: '/file/uploadToId',
          img: [{
            name: '123',
            url: 'https://exp.bdstatic.com/static/common-jquery/widget/search-box/img/logo_83ae7e2.png'
          }], // 回显,
          status: true
        }
      ],
      enterpriseUploadlist: [
        {
          title: '身份证正面',
          actionUrl: '/file/uploadToId',
          status: false,
          img: [] // 回显,
        },
        {
          title: '身份证反面',
          actionUrl: '/file/uploadToId',
          status: true,
          img: [] // 回显,
        },
        {
          title: '营业执照',
          actionUrl: '/file/uploadToId',
          status: true,
          img: [] // 回显,
        },
        {
          title: '授权委托书文件',
          actionUrl: '/file/uploadToId',
          status: true,
          img: [] // 回显,
        }
      ],
      companyImgList: [],
      //   selectTag: "",
      modal1: true
    }
  },
  methods: {
    enterpriseUploadlistEmit (data) {
      this.enterpriseUploadlist = data
    },
    personalUploadlistEmit (data) {
      this.personalUploadlist = data
    },
    select () {
      console.log(this.newSelectTag)
    },
    addOrEdit () {
      console.log('000000')
      console.log(22222)
      // this.$emit('childByValue', false)
    },
    cancel () {
      console.log(888888)
      this.$emit('childByValue', false)
    },
    getpersonIdcardList () {
      personIdcardType({}).then(res => {
        //   console.log(res.data.data, "个人");
        this.personaIdcardList = res.data.data
      }).catch(e => {
        this.resMessage('warning', '操作失败，稍后重试！')
      })
    },
    getpriseIdcardList () {
      // priseIdcardType
      priseIdcardType({}).then(res => {
        this.priseIdcardTypeList = res.data.data
        //   console.log(this.priseIdcardTypeList, "公司的");
      }).catch(e => {
        this.resMessage('warning', '操作失败，稍后重试！')
      })
    },
    getcompanyNumber () {
      companyNumber({}).then(res => {
        this.companyNumberList = res.data.data
      }).catch(e => {
        this.resMessage('warning', '操作失败，稍后重试！')
      })
    },
    getTradeType () {
      tradeType({}).then(res => {
        this.tradeTypeList = res.data.data
        //   console.log(res.data.data, "公司的类型");
      }).catch(e => {
        this.resMessage('warning', '操作失败，稍后重试！')
      })
    },
    getCompanyFormList (id) {
      getCompanyForm({ id: id }).then(res => {
        this.companyList = res.data.data
        this.companyImgList = res.data.data.fileList
        this.companyImgList.forEach((item, index) => {
          // 是否会空？？？
          this.enterpriseUploadlist[index].status = true
          this.enterpriseUploadlist[index].img.push({
            name: item.filename,
            url: item.filepath,
            status: 'finished'
          })
        })
      }).catch(e => {
        this.resMessage('warning', '操作失败，稍后重试！')
      })
    },
    //
    getPersonFormList (userid) {
      getPersonForm({ id: userid }).then(res => {
        console.log(res, '个人')
        this.personaList = res.data.data
        this.companyImgList = res.data.data.fileList
      }).catch(e => {
        this.resMessage('warning', '操作失败，稍后重试！')
      })
    }
  },
  mounted () {
    this.getpersonIdcardList() // 获取个人证件类型
    this.getpriseIdcardList() // 获取企业证件类型
    this.getcompanyNumber() // 获取企业人数
    this.getTradeType() // 获取企业类型
  },
  created () {
    console.log(this.$parent.thisRow, 'selectTag222222222222222')
    // this.thisRow
    this.title = this.$parent.dialogType
    if (this.$parent.selectTag === 'company') {
      if (this.$parent.thisRow.id) {
        this.getCompanyFormList(this.$parent.thisRow.id)
      } else {
        console.log('添加')
      }
    } else if (this.$parent.selectTag === 'persona') {
      if (this.$parent.thisRow.userid) {
        this.getPersonFormList(this.$parent.thisRow.userid)
      } else {
        console.log('tianjai ')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.userInfoDia {
  background: transparent;
  @include mw(1180px);
  @include bc;
  padding-top: 40px;
  ._search {
    max-width: 450px;
    margin-bottom: 20px;
  }
  ._caseList {
    margin-bottom: 20px;
  }
}
._labelFor {
  margin-bottom: 10px;
  p {
    padding: 7px 0;
  }
  ._span {
    color: #ff7a7a;
  }
}
// @import "@/style/mixin.scss";
// .AddDialog {
//   background: transparent;
//   @include mw(1180px);
//   @include bc;
//   padding-top: 40px;
//   ._labelFor {
//     p {
//       padding: 7px 0;
//     }
//     input{
//         margin-bottom: 10px;
//     }
//     ._span {
//       color: #ff7a7a;
//     }
//   }
// }
// ._labelFor {
//  margin: 10px 0;
// }
</style>

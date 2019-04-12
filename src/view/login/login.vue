<template>
  <div class="_login clearfix" :style="style.bg">
    <div class="center_top">
      <Row>
        <Col span="3" class="tc pt5">
          <img :src="style.icon.src" :style="style.loginLogo">
        </Col>
        <Col span="21">
          <p class="text_chi">凡预智能法务运营管理平台</p>
          <p class="text_eng">Fanyu intelligent legal operation and management platform</p>
        </Col>
      </Row>
    </div>
    <div class="_center not_s bgf" :style="style.bgCenter">
      <Row>
        <Col span="8" offset="15">
          <div class="_box">
            <p class="b_header">账号登录</p>
            <Row>
              <Col span="18" offset="3">
                <input type="text" class="_input _name" placeholder="用户名" v-model.trim="user.userName">
              </Col>
              <Col span="18" offset="3" class="pr">
                <input class="_input _password" placeholder="密码" v-model="user.password" :type="user.showPass === true?'text':'password'" @keyup.enter="resLogin">
                <Icon size="18" class="hand ml30 vtt _icon" :type="user.showPass === true?'md-eye':'md-eye-off'" @click="showPass"></Icon>
              </Col>
              <Col span="18" offset="3">
                <input type="text" class="_input _code" placeholder="验证码" v-model.trim="user.code" @keyup.enter="resLogin">
                <img class="_img" :src="codeImgSrc" alt="" @click="resGetCode">
              </Col>
              <Col span="18" offset="3">
                <button class="_loginBtn" @click="resLogin">登 录</button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { login } from '@/api/user.js'
import setRegExp from '@/config/regExp.js'
export default {
  name: 'login',
  data () {
    return {
      style: {
        bg: {
          backgroundImage: 'url(' + require('_static/images/login_bg.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        },
        icon: {
          src: require('_static/images/login_icon.png')
        },
        loginLogo: {
          height: '65px',
          userSelect: 'none'
        },
        bgCenter: {
          backgroundImage: 'url(' + require('_static/images/login_center.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        }
      },
      user: {
        userName: '',
        password: '',
        code: '',
        showPass: false
      },
      loginInfo: null,
      codeSrc: ''
    }
  },
  created () {
    if (window.localStorage) {
      let loc = window.localStorage
      loc.removeItem('tagNaveList')
    }
    this.resGetCode()
  },
  computed: {
    codeImgSrc () {
      return '/verify/code' + this.codeSrc
    }
  },
  methods: {
    ...mapActions([
      'setUsersInfo'
    ]),
    resMessage (type, text) {
      // warning success error
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    showPass () {
      this.user.showPass = !this.user.showPass
    },
    resGetCode () {
      this.codeSrc = '?t=' + (new Date()).valueOf()
    },
    resLogin () {
      if (this.user.username === '') {
        this.resMessage('warning', '请输入用户名')
      } else if (this.user.password === '') {
        this.resMessage('warning', '请输入密码')
      } else if (!setRegExp(this.user.password, 'password')) {
        this.resMessage('warning', '密码错误')
      } else if (this.user.code === '') {
        this.resMessage('warning', '请输入验证码')
      } else if (this.user.code.length !== 4) {
        this.resMessage('warning', '请正确输入四位验证码')
      } else {
        login({
          userName: this.user.userName,
          password: this.user.password,
          verifyCode: this.user.code
        }).then(res => {
          let _res = res.data.data
          this.$store.commit('setToken', _res.token)
          if (window.localStorage) {
            let loc = window.localStorage
            loc.setItem('usersInfo', JSON.stringify(_res))
          }
          this.setUsersInfo(_res)
          this.$store.commit('setAvatar', '')
          this.$store.commit('setUserName', _res.name)
          this.$store.commit('setUserId', _res.user_id)
          this.$store.commit('setAccess', _res.access)
          this.$store.commit('setHasGetInfo', true)
          try {
            if (_res.access.length === 0) {
              this.user.password = ''
              this.user.code = ''
              this.resGetCode()
              this.resMessage('error', '登录身份未知,禁止登录')
            } else {
              this.$router.push({
                name: this.$config.homeName
              })
            }
          } catch (e) {
            this.user.password = ''
            this.user.code = ''
            this.resGetCode()
            this.resMessage('error', '错误信息:' + e)
          }
        }).catch(e => {
          this.user.password = ''
          this.user.code = ''
          this.resGetCode()
          this.resMessage('error', '错误信息:' + e)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
._login {
  @include mw(1180px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .center_top {
    @include centerTop(11%);
    width: 960px;
    height: 80px;
    color: #fff;
    z-index: 5;
    .text_chi {
      font-size: 36px;
      letter-spacing: 34px;
    }
    .text_eng {
      font-size: 12px;
      letter-spacing: 9px;
    }
  }
  ._center {
    @include centerTop(55%);
    width: 1180px;
    height: 680px;
    z-index: 2;
    ._box {
      width: 310px;
      height: 370px;
      background: #6979F8;
      margin-top: 100px;
      border-radius: 4px;
      padding-top: 15px;
      .b_header {
        text-align: center;
        font-size: 18px;
        padding: 20px 0 20px 12px;
        color: #ffffff;
        letter-spacing: 17px;
      }
      ._name, ._password {
        width: 100%;
      }
      ._code {
        width: 60%;
      }
      ._img {
        width: 35%;
        float: right;
        border-radius: 3px;
        height: 40px;
      }
      ._input {
        padding: 10px 0 10px 10px;
        border-radius: 4px;
        letter-spacing: 1px;
        margin-bottom: 30px;
        border: none;
        font-size: 14px;
        color: #666;
      }
      ._icon {
        position: absolute;
        right: 20px;
        top: 11px;
      }
      ._loginBtn {
        @include btn(#FFCF5C, 100%, 16px, 40px);
        @include borderRadius(4px);
        letter-spacing: 10px;
      }
    }
  }
}
</style>

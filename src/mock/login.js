const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    access: ['casePend', 'caseAudi', 'caseTran', 'caseAll', 'orgaMana', 'juriMana', 'roleMana', 'userMana', 'contrace', 'userInfo', 'arbitration', 'userReview'],
    token: 'super_admin',
    roleType: '1',
    avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['casePend', 'caseAudi', 'caseTran', 'caseAll', 'orgaMana', 'userMana'],
    token: 'admin',
    roleType: '2',
    avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  },
  user: {
    name: 'user',
    user_id: '2',
    access: ['casePend', 'caseAudi', 'caseTran', 'caseAll'],
    token: 'user',
    roleType: '3',
    avatar: 'http://img.ssmanfang.com/news/2018-05-24/b6447ff9beefc249cd793534b2c6948c.png_c640'
  }
}

export const getParam = url => {
  const keyValueArr = url.split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

export const login = req => {
  const params = getParam(req.body)
  return {
    flag: true,
    data: USER_MAP[params.userName],
    code: '000000',
    message: null
  }
}

export const logout = req => {
  return {
    flag: true,
    data: 1,
    code: '000000',
    message: null
  }
}

import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/caseMana/caseAll',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    }
  },
  {
    path: '/caseMana',
    name: 'caseMana',
    meta: {
      access: ['casePend', 'caseAudi', 'caseTran', 'caseAll'],
      icon: 'md-list',
      title: '案件管理',
      notCache: true
    },
    component: Main,
    children: [
      {
        path: 'casePend',
        name: 'casePend',
        meta: {
          access: ['casePend'],
          icon: 'ios-albums',
          title: '待审核案件',
          notCache: true
        },
        component: () => import('@/view/caseMana/casePend.vue')
      },
      {
        path: 'caseAudi',
        name: 'caseAudi',
        meta: {
          access: ['caseAudi'],
          icon: 'ios-albums',
          title: '已审核案件',
          notCache: true
        },
        component: () => import('@/view/caseMana/caseAudi.vue')
      },
      {
        path: 'caseTran',
        name: 'caseTran',
        meta: {
          access: ['caseTran'],
          icon: 'ios-albums',
          title: '已移送案件',
          notCache: true
        },
        component: () => import('@/view/caseMana/caseTran.vue')
      },
      {
        path: 'caseAll',
        name: 'caseAll',
        meta: {
          access: ['caseAll'],
          icon: 'ios-albums',
          title: '全部案件',
          notCache: true
        },
        component: () => import('@/view/caseMana/caseAll.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      access: ['orgaMana', 'juriMana', 'roleMana', 'userMana'],
      icon: 'md-settings',
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'orgaMana',
        name: 'orgaMana',
        meta: {
          access: ['orgaMana'],
          icon: 'ios-settings',
          title: '组织机构管理'
        },
        component: () => import('@/view/multilevel/orgaMana.vue')
      },
      {
        path: 'juriMana',
        name: 'juriMana',
        meta: {
          access: ['juriMana'],
          icon: 'ios-settings',
          title: '权限管理'
        },
        component: () => import('@/view/multilevel/juriMana.vue')
      },
      {
        path: 'roleMana',
        name: 'roleMana',
        meta: {
          access: ['roleMana'],
          icon: 'ios-settings',
          title: '角色管理'
        },
        component: () => import('@/view/multilevel/roleMana.vue')
      },
      {
        path: 'userMana',
        name: 'userMana',
        meta: {
          access: ['userMana'],
          icon: 'ios-settings',
          title: '用户管理'
        },
        component: () => import('@/view/multilevel/userMana.vue')
      }
    ]
  },
  {
    path: '/cont',
    name: 'cont',
    meta: {
      access: ['contrace'],
      icon: 'md-menu',
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'contrace',
        name: 'contrace',
        meta: {
          icon: 'md-list-box',
          title: '合同类型管理'
        },
        component: () => import('@/view/manager/contrace.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      access: ['userInfo'],
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'userInfo',
        name: 'userInfo',
        meta: {
          icon: 'md-people',
          title: '客户信息管理'
        },
        component: () => import('@/view/manager/userInfo.vue')
      }
    ]
  },
  {
    path: '/arbi',
    name: 'arbi',
    meta: {
      access: ['arbitration'],
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'arbitration',
        name: 'arbitration',
        meta: {
          icon: 'md-hammer',
          title: '仲裁委信息管理'
        },
        component: () => import('@/view/manager/arbitration.vue')
      }
    ]
  },
  {
    path: '/revi',
    name: 'revi',
    meta: {
      access: ['userReview'],
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'userReview',
        name: 'userReview',
        meta: {
          icon: 'md-pause',
          title: '客户信息审核管理'
        },
        component: () => import('@/view/manager/userReview.vue')
      }
    ]
  },
  {
    path: '/type',
    name: 'type',
    meta: {
      access: ['casetypeSet'],
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'casetypeSet',
        name: 'casetypeSet',
        meta: {
          icon: 'md-git-merge',
          title: '客户合同类型分配'
        },
        component: () => import('@/view/manager/casetypeSet.vue')
      }
    ]
  },
  {
    path: '/case',
    name: 'case',
    meta: {
      hideInMenu: true,
      hideInBread: true,
      notCache: true
    },
    component: Main,
    children: [
      {
        path: 'caseInfo',
        name: 'caseInfo',
        meta: {
          icon: 'md-list-box',
          title: '案件详情',
          notCache: true
        },
        component: () => import('@/view/caseInfo/caseInfo.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]

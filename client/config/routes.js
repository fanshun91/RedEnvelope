// import Login from '../views/login/login.vue'
// import User from '../views/pages/user/user-manage.vue'
// import Msg from '../views/pages/msgs/msg-notice.vue'

export default [
  // 登录页
  {
    path: '/login',
    // component: () => import(/* webpackChunkName: "login-view" */ '../views/login/login.vue')
    component: () => import('../views/login/login.vue')
  },
  // 用户管理
  {
    path: '/user',
    component: () => import('../views/pages/user/user-manage.vue')
  },
  // 内容管理  1.红包通知
  {
    path: '/rp_notice',
    component: () => import('../views/pages/content/redp-notice.vue')
  },
  // 内容管理  2.用户留言
  {
    path: '/user_msg',
    component: () => import('../views/pages/content/user-message.vue')
  },
  // 订单管理
  {
    path: '/order',
    component: () => import('../views/pages/orders/order-manage.vue')
  },
  // 提现管理  1.提现记录
  {
    path: '/wd_record',
    component: () => import('../views/pages/withdraw/withdraw-record.vue')
  },
  // 提现管理  2.待审核提现
  {
    path: '/pending_wd',
    component: () => import('../views/pages/withdraw/withdraw-pending.vue')
  },
  // 提现管理  3.异常提现
  {
    path: '/abnormal_wd',
    component: () => import('../views/pages/withdraw/withdraw-exceptions.vue')
  },
  // 举报管理
  {
    path: '/tips',
    component: () => import('../views/pages/tips/tips-manage.vue')
  },
  // 消息提醒
  {
    path: '/msg',
    component: () => import('../views/pages/msgs/msg-notice.vue')
  },
  // 查看详情
  {
    path: '/details',
    component: () => import('../views/pages/user/user-details.vue')
  },
  // {
  //   path: '/pop',
  //   component: () => import('../components/dialog/di.vue')
  // },
  {
    path: '/',
    redirect: '/login'
  }
]

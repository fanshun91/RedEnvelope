<template>
  <div>
    <Header currNavSite="user"/>
    <Side :list="links" :site="links[0].name"/>
    <div class="main-body">
      <ul class="inner-tab-title">
        <li class="active" index="0" @click="tabs">用户详情</li>
        <li index="1" @click="tabs">订单记录</li>
        <li index="2" @click="tabs">提现记录</li>
        <li index="3" @click="tabs">红包通知</li>
      </ul>
      <router-link class="backToUpper" to="/user">返回 > </router-link>
      <div class="inner-tab-content">
        <div class="tab-item">
          <div class="info-list">
            <ul class="info-list-item">
              <!-- <li>用户头像：<img :src="getUserInfo().user_avator" alt="用户头像"></li> -->
              <li>用户头像：<img class="tab-user-avator" src="../../../assets/images/sun.jpg" alt="用户头像"></li>
              <li>用户昵称：{{getUserInfo().user_nickname}}</li>
            </ul>
            <ul class="info-list-item">
              <li>微信ID：{{getUserInfo().wxid}}</li>
              <li>注册时间：{{getUserInfo().regi_time}}</li>
              <li>最后登录时间：{{getUserInfo().last_login}}</li>
            </ul>
            <ul class="info-list-item">
              <li>累计发送金额：{{getUserInfo().accum_amount}}元</li>
              <li>累计提现金额：{{getUserInfo().accum_wd}}元</li>
              <li>账户余额：{{getUserInfo().acco_balance}}元</li>
            </ul>
            <ul class="info-list-item">
              <li>账户状态：{{getUserInfo().acco_status}}</li>
            </ul>
          </div>
          <h5>商户信息</h5>
          <el-table
            :data="userInfo"
            height="300"
            border
            style="width: 100%">
            <el-table-column
              prop="shop_profile"
              label="商户头像"
              align="center"
              width="120">
              <template slot-scope="item">
                <img :src="item.row.shop_profile">
              </template>
            </el-table-column>
            <el-table-column
              prop="shop_name"
              label="商户名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="shop_phone"
              label="联系电话"
              align="center"
              width="200">
            </el-table-column>
            <el-table-column
              prop="shop_site"
              label="商户地址"
              align="center">
            </el-table-column>
            <el-table-column
              prop="shop_link"
              label="链接网址"
              align="center"
              width="260">
            </el-table-column>
            <el-table-column
              prop="industry"
              label="所属行业"
              align="center"
              width="150">
            </el-table-column>
          </el-table>
        </div>
        <div class="tab-item item-hidden">
          <el-table
            :data="userOrder"
            height="500"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              :index="createId"
              label="商户头像"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="recharge_amount"
              label="充值金额"
              align="center">
              <template slot-scope="item">
                <span>{{item.row.recharge_amount}}元</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="recharge_time"
              label="充值时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="order_num"
              label="订单编号"
              align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="tab-item item-hidden">
          <el-table
            :data="wd_record"
            height="500"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              :index="createId"
              label="序号"
              align="center"
              width="140">
            </el-table-column>
            <el-table-column
              prop="wd_amount"
              label="提现金额"
              align="center"
              width="320">
              <template slot-scope="item">
                <span>{{item.row.wd_amount}}元</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="wd_time"
              label="提现时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="wd_status"
              label="提现状态"
              align="center"
              width="350">
            </el-table-column>
            <el-table-column
              label="操作"
              width="200"
              align="center">
              <template slot-scope="item">
                <el-button @click="w_dialog(item.row)" type="text" size="small">{{status(item.row)}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="tab-item item-hidden">
          <el-form :inline="true" :model="searchFm" class="searchbar">
            <el-form-item label="红包通知ID" class="normal-input">
              <el-input v-model="searchFm.rpid" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="文字内容" class="normal-input">
              <el-input v-model="searchFm.content" placeholder="请输入"/>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form>
          <el-table
            :data="rpData"
            height="560"
            border
            style="width: 100%">
            <el-table-column
              prop="rp_notice_id"
              label="红包通知ID"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="release_time"
              label="发布时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="content"
              label="文字内容"
              align="center">
            </el-table-column>
            <el-table-column
              prop="pics"
              label="图片"
              align="center">
              <template slot-scope="item">
                <img style="height: 40px; width: auto;" v-for="url in item.row.pics" :key="url.id" src="../../../assets/images/shop1.png">
              </template>
            </el-table-column>
            <el-table-column
              prop="amount_num"
              label="红包金额/个数"
              align="center">
              <template slot-scope="item">
                <span>{{item.row.amount_num.amount}}</span>
                /
                <span>{{item.row.amount_num.num}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="position_radius"
              label="红包定位/领取半径"
              width="160"
              align="center">
              <template slot-scope="item">
                <span>{{item.row.position_radius.position}}</span>
                /
                <span>{{item.row.position_radius.radius}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="开始时间"
              width="160"
              align="center">
            </el-table-column>
            <el-table-column
              prop="merchants_info"
              label="商户信息"
              width="160"
              align="center">
              <template slot-scope="item">
                <span>{{item.row.merchants_info.name}}</span>
                <br/>
                <span>{{item.row.merchants_info.phone}}</span>
                <br/>
                <span>{{item.row.merchants_info.site}}</span>
                <br/>
                <span>{{item.row.merchants_info.url}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="rp_status"
              label="状态"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="120"
              align="center">
              <template slot-scope="item">
                <el-button @click="dialog(item.row)" type="text" size="small">{{rp_status(item.row)}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../../layout/header.vue'
  import Side from '../../../layout/side.vue'
  import bus from '../../../util/bus'

  export default {
    components: {
      Header,
      Side
    },
    data () {
      return {
        links: [
          {
            link: '',
            name: '用户管理'
          }
        ],
        userInfo: [
          {
            shop_profile: '../../../assets/images/shop1.jpg',
            shop_name: '大顺餐饮',
            shop_phone: '13587123900',
            shop_site: '北京市安慧北里小区10号',
            shop_link: 'wwww.anhuibeili.com',
            industry: '餐饮'
          },
          {
            shop_profile: '../../../assets/images/shop1.jpg',
            shop_name: '大顺餐饮',
            shop_phone: '13587123900',
            shop_site: '北京市安慧北里小区10号',
            shop_link: 'wwww.anhuibeili.com',
            industry: '餐饮'
          }
        ],
        userOrder: [
          {
            recharge_amount: '100',
            recharge_time: '2017-12-12 12:00:30',
            order_num: '0122323344445203'
          }
        ],
        wd_record: [
          {
            wd_amount: 90,
            wd_time: '2017-12-23 13:00',
            wd_status: '提现中'
          }
        ],
        searchFm: {
          rpid: '',
          content: ''
        },
        rpData: [
          {
            rp_notice_id: '23219',
            release_time: '2018-02-21',
            content: '搜点什么内容',
            pics: [
              ''
            ],
            amount_num: {
              amount: 230,
              num: 2
            },
            position_radius: {
              position: '清华东路西口',
              radius: 60
            },
            start_time: '2018-09-21',
            merchants_info: {
              name: '陕西肉夹馍',
              phone: '12309293282',
              site: '北京市奥运大道东侧',
              url: 'www.332c.com'
            },
            rp_status: '启用'
          }
        ]
      }
    },
    methods: {
      getUserInfo () {
        let data = {
          user_avator: '../../../assets/images/sun.jpg',
          user_nickname: 'ruisun',
          wxid: '020301',
          regi_time: '2017-12-12 12:00',
          last_login: '2017-12-12 12:00',
          accum_amount: 200,
          accum_wd: 20,
          acco_balance: 100,
          acco_status: '启用'
        }
        return data
      },
      tabs (e) {
        let titles = document.querySelectorAll('.inner-tab-title li')
        let contents = document.querySelectorAll('.tab-item')
        let index = e.target.getAttribute('index')
        let active = 'active'
        let keyCln = 'item-hidden'

        if (titles.length !== contents.length) {
          throw new Error('tabs function occured a error!')
        }

        Array.prototype.slice.call(titles).forEach((title, i) => {
          let t = title.className
          let c = contents[i].className

          // 还原title类名，删除 active
          if (t.indexOf(' ') > -1) {
            title.className = t.replace(' ' + active, '')
          } else if (t === active) {
            title.removeAttribute('class')
          }

          // 还原content类名，添加 item-hidden
          if (c.indexOf(keyCln) === -1) {
            if (c.className !== '') {
              contents[i].className += ' ' + keyCln
            } else {
              contents[i].className = keyCln
            }
          }
        })

        // 修改当前项类名
        if (titles[index].className === '') {
          titles[index].className = active
        } else {
          titles[index].className += '' + active
        }

        if (contents[index].className.indexOf(' ') > -1) {
          contents[index].className = contents[index].className.replace(' ' + keyCln, '')
        } else {
          if (contents[index].className === keyCln) {
            contents[index].removeAttribute('class')
          }
        }
      },
      createId (index) {
        return index + 1
      },
      status (row) {
        if (row.wd_status === '提现中') {
          return '锁定提现'
        } else if (row.wd_status === '锁定中') {
          return '解除锁定'
        } else {
          return '---'
        }
      },
      // changeStatus (row) {
      //   if () {
      //     row.wd_status = '已提现'
      //     return
      //   }
      //   row.wd_status = row.wd_status === '提现中' ? '锁定中' : '提现中'
      // },
      w_confirm (row) {
        bus.$off()
        bus.$on('affirm', () => {
          row.wd_status = row.wd_status === '提现中' ? '锁定中' : '提现中'
          bus.$off()
        })
      },
      w_dialog (row) {
        this.$dialog({
          theme: this.status(row)
        })

        this.w_confirm(row)
      },
      rp_status (row) {
        return row.rp_status === '启用' ? '禁用' : '启用'
      },
      confirm (row) {
        bus.$off()
        bus.$on('affirm', () => {
          row.rp_status = this.rp_status(row)
          bus.$off()
        })
      },
      dialog (row) {
        this.$dialog({
          theme: this.rp_status(row)
        })

        this.confirm(row)
      },
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .inner-tab-title
    position relative
    height 60px
    padding-left 20px
    line-height 60px
    font-size 14px
    // text-align center
    background-color #2F4056
    li
      display inline-block
      width 96px
      line-height inherit
      text-align center
      color rgba(255, 255, 255, .8)
      cursor pointer
      transition all 0.3 ease

  .backToUpper
    position absolute
    top 15px
    right 30px
    z-index 9
    line-height 60px
    color rgba(255, 255, 255, .9)
    &:hover
      color rgba(255, 255, 255, .7)

  .inner-tab-content
    padding 20px
    .info-list
      padding 5px
    h5
      margin-top 16px
      padding 0 10px
      line-height 40px
      font-size 15px
      color #666

  .item-hidden
    display none

  .info-list-item
    height 60px
    padding 5px 0
    font-size 15px
    li
      display inline-block
      width 240px
      line-height 60px

  .tab-user-avator
    display inline
    width 54px
    height 54px
    margin-right 10px
    border-radius 50%
    vertical-align middle

  .active
    height 57px
    line-height 57px
    border-bottom 3px solid #409eff

</style>

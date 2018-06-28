<template>
  <div>
    <Header currNavSite="msgs"/>
    <Side :list="links" :site="links[0].name"/>
    <div class="main-body">
      <Bread :current-site="breadTagName"/>
      <el-form :inline="true" :model="searchFm" class="searchbar">
        <el-form-item label="用户微信ID/昵称" class="normal-input">
          <el-input v-model="searchFm.user" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="消息提醒类型" class="normal-input">
          <el-select v-model="searchFm.notice_type" placeholder="请选择">
            <el-option label="全部" value="total"/>
            <el-option label="红包通知禁用" value="notice_disabled"/>
            <el-option label="红包已被领取完" value="hold_up"/>
            <el-option label="提现到帐" value="arrived"/>
          </el-select>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-date-picker
            v-model="searchFm.send_dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
      <el-table
        :data="msg_notice"
        height="560"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          :index="createId"
          label="序号"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="user"
          label="用户微信ID/昵称"
          align="center">
          <template slot-scope="item">
            <span>微信ID：{{item.row.user.id}}</span>
            <br/>
            <span>用户昵称：{{item.row.user.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="notice_type"
          label="消息提醒类型"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="msg_content"
          label="订单编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="send_time"
          label="发送时间"
          align="center">
        </el-table-column>
      </el-table>
      <Page/>
    </div>
  </div>
</template>

<script>
  import Header from '../../../layout/header.vue'
  import Side from '../../../layout/side.vue'
  import Bread from '../../../components/bread-tag.vue'
  import Page from '../../../components/pages.vue'

  export default {
    components: {
      Header,
      Side,
      Bread,
      Page
    },
    data () {
      return {
        links: [
          {
            link: '/msg',
            name: '消息提醒'
          }
        ],
        breadTagName: '消息提醒',
        searchFm: {
          user: '',
          order_amount: '',
          recharge_dateRange: ''
        },
        msg_notice: [
          {
            user: {
              id: '312899318',
              nickname: 'wojrer'
            },
            notice_type: '红包通知禁用',
            title: '红包通知禁用',
            msg_content: '尊敬的用户您好，您于2017-12-23 18:30 发布的“兰州牛肉面回馈新老用户”红包通知，由于涉嫌违规被禁用，剩余未领取红包金额将在2天内自动返回到您的账号余额中。',
            send_time: '2017-12-23 13:00'
          },
          {
            user: {
              id: '312899318',
              nickname: 'wojrer'
            },
            notice_type: '红包已经被领取完',
            title: '红包已经被领取完',
            msg_content: '尊敬的用户您好，您于2017-12-23 18:30 发布的“兰州牛肉面回馈新老用户”红包通知，所有红包都已被领取完啦！',
            send_time: '2017-12-23 13:00'
          },
          {
            user: {
              id: '312899318',
              nickname: 'wojrer'
            },
            notice_type: '提现到帐通知',
            title: '提现到帐通知',
            msg_content: '尊敬的用户您好，您于2017-12-23 19:30发起的提现申请，提现金额20.00元，先已提现到您的微信钱包中，请查收。',
            send_time: '2017-12-23 15:00'
          }
        ]
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      createId (index) {
        return index + 1
      }
    }
  }
</script>

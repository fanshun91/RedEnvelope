<template>
  <div>
    <Header currNavSite="order"/>
    <Side :list="links" :site="links[0].name"/>
    <div class="main-body">
      <Bread :current-site="breadTagName"/>
      <el-form :inline="true" :model="searchFm" class="searchbar">
        <el-form-item label="用户微信ID/昵称" class="normal-input">
          <el-input v-model="searchFm.user" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="订单金额" class="normal-input">
          <el-input v-model="searchFm.order_amount" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="充值时间">
          <el-date-picker
            v-model="searchFm.recharge_dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
      <el-table
        :data="order_mg"
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
          prop="recharge_amount"
          label="充值金额"
          align="center"
          width="150">
          <template slot-scope="item">
            <span>{{item.row.recharge_amount}} 元</span>
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
            link: '/order',
            name: '订单管理'
          }
        ],
        breadTagName: '订单管理',
        searchFm: {
          user: '',
          order_amount: '',
          recharge_dateRange: ''
        },
        order_mg: [
          {
            user: {
              id: '312899318',
              nickname: 'wojrer'
            },
            recharge_amount: 1000,
            recharge_time: '2018-02-22',
            order_num: '0122323344445203'
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
      },
      status (row) {
        return row.msg_status === '启用' ? '禁用' : '启用'
      },
      changeStatus (row) {
        row.msg_status = this.status(row)
      }
    }
  }
</script>

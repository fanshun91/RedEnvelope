<template>
  <div>
    <Header currNavSite="user"></Header>
    <Side :list="links" :site="links[0].name"/>
    <div class="main-body">
      <Bread :current-site="breadTagName"/>
      <el-form :inline="true" :model="searchFm" class="searchbar">
        <el-form-item label="微信ID" class="normal-input">
          <el-input v-model="searchFm.wxid" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="昵称" class="normal-input">
          <el-input v-model="searchFm.nickname" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="累计提现金额" class="normal-input">
          <el-input v-model="searchFm.withdrawalAmount" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="账号状态" class="normal-input">
          <el-select v-model="searchFm.status" placeholder="请选择">
            <el-option label="全部" value="total"/>
            <el-option label="启用" value="enable"/>
            <el-option label="禁用" value="disabled"/>
          </el-select>
        </el-form-item>
        <el-form-item label="注册日期">
          <el-date-picker
            v-model="searchFm.reg_dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
      <el-table
        :data="userManage"
        height="560"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          :index="createId"
          label="序号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="wxid"
          label="微信ID"
          align="center">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="registerTime"
          label="注册时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="最后登录时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="amountSpend"
          label="累计发送金额"
          width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="withdrawalAmount"
          label="累计体现金额"
          width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="accountBalance"
          label="账户余额"
          width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="accountStatus"
          label="账户状态"
          width="110"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          align="center">
          <template slot-scope="item">
            <el-button @click="dialog(item.row)" type="text">{{status(item.row)}}</el-button>
            <router-link to="/details" tag="a" class="el-button el-button--text"><span>查看详情</span></router-link>
          </template>
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
  import bus from '../../../util/bus'

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
            link: '/',
            name: '用户管理'
          }
        ],
        breadTagName: '用户管理',
        searchFm: {
          wxid: '',
          nickname: '',
          withdrawalAmount: '',
          status: '',
          reg_dateRange: ''
        },
        dataValue: '',
        userManage: [
          {
            wxid: '32983120381xa',
            nickname: '小黑',
            registerTime: '2018-10-23',
            lastLoginTime: '2018-10-28',
            amountSpend: 300,
            withdrawalAmount: 120,
            accountBalance: 90,
            accountStatus: '启用'
          },
          {
            wxid: '32983128781xa',
            nickname: '小红',
            registerTime: '2018-10-23',
            lastLoginTime: '2018-10-28',
            amountSpend: 300,
            withdrawalAmount: 120,
            accountBalance: 90,
            accountStatus: '禁用'
          },
          {
            wxid: '32983128781xa',
            nickname: '小黑',
            registerTime: '2018-10-23',
            lastLoginTime: '2018-10-28',
            amountSpend: 300,
            withdrawalAmount: 120,
            accountBalance: 90,
            accountStatus: '启用'
          },
          {
            wxid: '32983128781xa',
            nickname: '小红',
            registerTime: '2018-10-23',
            lastLoginTime: '2018-10-28',
            amountSpend: 300,
            withdrawalAmount: 120,
            accountBalance: 90,
            accountStatus: '启用'
          },
          {
            wxid: '32983128781xa',
            nickname: '小黑',
            registerTime: '2018-10-23',
            lastLoginTime: '2018-10-28',
            amountSpend: 300,
            withdrawalAmount: 120,
            accountBalance: 90,
            accountStatus: '启用'
          },
          {
            wxid: '32983128781xa',
            nickname: '小红',
            registerTime: '2018-10-23',
            lastLoginTime: '2018-10-28',
            amountSpend: 300,
            withdrawalAmount: 120,
            accountBalance: 90,
            accountStatus: '启用'
          },
          {
            id: '007',
            wxid: '32983128781xa',
            nickname: '小黑',
            registerTime: '2018-10-23',
            lastLoginTime: '2018-10-28',
            amountSpend: 300,
            withdrawalAmount: 120,
            accountBalance: 90,
            accountStatus: '启用'
          },
          {
            wxid: '32983128781xa',
            nickname: '小红',
            registerTime: '2018-10-23',
            lastLoginTime: '2018-10-28',
            amountSpend: 300,
            withdrawalAmount: 120,
            accountBalance: 90,
            accountStatus: '启用'
          }
        ]
      }
    },
    methods: {
      onSubmit () {
        console.log('success')
      },
      createId (index) {
        return index + 1
      },
      status (row) {
        return row.accountStatus === '启用' ? '禁用' : '启用'
      },
      confirm (row) {
        bus.$off()
        bus.$on('affirm', () => {
          row.accountStatus = this.status(row)
          bus.$off()
        })
      },
      dialog (row) {
        this.$dialog({
          theme: this.status(row)
        })

        this.confirm(row)
      }
    }
  }
</script>


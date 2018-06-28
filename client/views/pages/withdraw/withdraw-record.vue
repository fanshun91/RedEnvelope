<template>
  <div>
    <Header currNavSite="withdraw"/>
    <Side :list="links" :site="links[0].name"/>
    <div class="main-body">
      <Bread :current-site="breadTagName"/>
      <el-form :inline="true" :model="searchFm" class="searchbar">
        <el-form-item label="用户微信ID/昵称" class="normal-input">
          <el-input v-model="searchFm.user" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="提现金额" class="normal-input">
          <el-input v-model="searchFm.wd_amount" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="提现状态" class="normal-input">
          <el-select v-model="searchFm.wd_status" placeholder="请选择">
            <el-option label="全部" value="total"/>
            <el-option label="提现中" value="processing"/>
            <el-option label="已提现" value="completed"/>
          </el-select>
        </el-form-item>
        <el-form-item label="提现时间">
          <el-date-picker
            v-model="searchFm.wd_dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
      <el-table
        :data="wd_record"
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
          prop="wd_amount"
          label="提现金额"
          align="center"
          width="160">
          <template slot-scope="item">
            <span>{{item.row.wd_amount}}元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="acc_balance"
          label="账户余额"
          align="center"
          width="160">
          <template slot-scope="item">
            <span>{{item.row.acc_balance}}元</span>
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
          width="160">
        </el-table-column>
        <el-table-column
          label="操作"
          width="160"
          align="center">
          <template slot-scope="item">
            <el-button @click="dialog(item.row)" type="text" size="small">{{status(item.row)}}</el-button>
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
            link: '/wd_record',
            name: '提现记录'
          },
          {
            link: '/pending_wd',
            name: '待审核提现'
          },
          {
            link: '/abnormal_wd',
            name: '异常提现'
          }
        ],
        breadTagName: '提现记录',
        searchFm: {
          user: '',
          wd_amount: '',
          wd_status: '',
          wd_dateRange: ''
        },
        wd_record: [
          {
            user: {
              id: '5646765',
              nickname: 'pooooxa'
            },
            wd_amount: 90,
            acc_balance: 10,
            wd_time: '2017-12-23 13:00',
            wd_status: '提现中'
          }
        ],
        btnText: ''
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
      confirm (row) {
        bus.$off()
        bus.$on('affirm', () => {
          row.wd_status = row.wd_status === '提现中' ? '锁定中' : '提现中'
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

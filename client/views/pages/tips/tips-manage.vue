<template>
  <div>
    <Header currNavSite="tips"/>
    <Side :list="links" :site="links[0].name"/>
    <div class="main-body">
      <Bread :current-site="breadTagName"/>
      <el-form :inline="true" :model="searchFm" class="searchbar">
        <el-form-item label="用户微信ID/昵称" class="normal-input">
          <el-input v-model="searchFm.user" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="举报状态" class="normal-input">
          <el-select v-model="searchFm.notice_type" placeholder="请选择">
            <el-option label="全部" value="total"/>
            <el-option label="未处理" value="Unprocessed"/>
            <el-option label="已处理" value="processed"/>
          </el-select>
        </el-form-item>
        <el-form-item label="举报时间">
          <el-date-picker
            v-model="searchFm.tips_dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
      <el-table
        :data="tips_mg"
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
          label="举报用户微信ID/昵称"
          align="center">
          <template slot-scope="item">
            <span>微信ID：{{item.row.user.id}}</span>
            <br/>
            <span>用户昵称：{{item.row.user.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tips_type"
          label="举报类型"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          align="center">
        </el-table-column>
        <el-table-column
          prop="tips_rpid"
          label="举报红包通知ID"
          align="center">
        </el-table-column>
        <el-table-column
          prop="withdraw_time"
          label="提现时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="tips_status"
          label="举报状态"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
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
            link: '/tips',
            name: '举报管理'
          }
        ],
        breadTagName: '举报管理',
        searchFm: {
          user: '',
          order_amount: '',
          recharge_dateRange: ''
        },
        tips_mg: [
          {
            user: {
              id: '231543452',
              nickname: 'oospadmm'
            },
            tips_type: '虚假信息',
            phone: '1231239893',
            tips_rpid: '9382812',
            withdraw_time: '2017-12-23 17:00',
            tips_status: '未处理'
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
        return row.tips_status === '未处理' ? '已处理' : '未处理'
      },
      confirm (row) {
        bus.$off()
        bus.$on('affirm', () => {
          row.tips_status = this.status(row)
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

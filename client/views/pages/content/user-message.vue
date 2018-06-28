<template>
  <div>
    <Header currNavSite="content"/>
    <Side :list="links" :site="links[1].name"/>
    <div class="main-body">
      <Bread :current-site="breadTagName"/>
      <el-form :inline="true" :model="searchFm" class="searchbar">
        <el-form-item label="用户微信ID/昵称" class="normal-input">
          <el-input v-model="searchFm.user" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="留言内容" class="normal-input">
          <el-input v-model="searchFm.msg_content" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="留言状态" class="normal-input">
          <el-select v-model="searchFm.msg_status" placeholder="请选择">
            <el-option label="全部" value="total"/>
            <el-option label="启用" value="enable"/>
            <el-option label="禁用" value="disabled"/>
          </el-select>
        </el-form-item>
        <el-form-item label="留言时间">
          <el-date-picker
            v-model="searchFm.msg_dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
      <el-table
        :data="user_msg"
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
          prop="msg_time"
          label="留言时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="msg_acount_info"
          label="留言账号信息"
          align="center">
          <template slot-scope="item">
            <span>微信ID：{{item.row.msg_acount_info.id}}</span>
            <br/>
            <span>用户昵称：{{item.row.msg_acount_info.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="msg_content"
          label="留言内容"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="receive_msg_acount"
          label="被留言用户账号信息"
          align="center">
          <template slot-scope="item">
            <span>微信ID：{{item.row.receive_msg_acount.id}}</span>
            <br/>
            <span>用户昵称：{{item.row.receive_msg_acount.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="msg_status"
          label="状态"
          align="center"
          width="120">
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
            link: '/rp_notice',
            name: '红包通知'
          },
          {
            link: '/user_msg',
            name: '用户留言'
          }
        ],
        breadTagName: '用户留言',
        searchFm: {
          user: '',
          msg_content: '',
          msg_status: '',
          msg_dateRange: ''
        },
        user_msg: [
          {
            msg_time: '2017-12-23 12:00',
            msg_acount_info: {
              id: '09328372',
              nickname: 'dashun'
            },
            msg_content: '非常感谢',
            receive_msg_acount: {
              id: '2302891',
              nickname: 'ruisun'
            },
            msg_status: '启用'
          },
          {
            msg_time: '2017-12-25 12:00',
            msg_acount_info: {
              id: '09328372',
              nickname: 'dashun'
            },
            msg_content: '发个大红包',
            receive_msg_acount: {
              id: '2302891',
              nickname: 'ruisun'
            },
            msg_status: '禁用'
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
      confirm (row) {
        bus.$off()
        bus.$on('affirm', () => {
          row.msg_status = this.status(row)
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

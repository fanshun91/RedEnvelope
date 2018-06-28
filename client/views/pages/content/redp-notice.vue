<template>
  <div>
    <Header currNavSite="content"/>
    <Side :list="links" :site="links[0].name"/>
    <div class="main-body">
      <Bread :current-site="breadTagName"/>
      <el-form :inline="true" :model="searchFm" class="searchbar">
        <el-form-item label="红包通知ID" class="normal-input">
          <el-input v-model="searchFm.rpid" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="用户微信ID/昵称" class="normal-input">
          <el-input v-model="searchFm.user" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="文字内容" class="normal-input">
          <el-input v-model="searchFm.content" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="通知状态" class="normal-input">
          <el-select v-model="searchFm.notice_status" placeholder="请选择">
            <el-option label="全部" value="total"/>
            <el-option label="启用" value="enable"/>
            <el-option label="禁用" value="disabled"/>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="searchFm.rels_dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
          width="110"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
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
        breadTagName: '红包通知',
        searchFm: {
          rpid: '',
          user: '',
          content: '',
          notice_status: '',
          rels_dateRange: ''
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
          },
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
      onSubmit () {
        console.log('submit!')
      },
      status (row) {
        return row.rp_status === '启用' ? '禁用' : '启用'
      },
      confirm (row) {
        bus.$off()
        bus.$on('affirm', () => {
          row.rp_status = this.status(row)
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

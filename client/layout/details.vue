<template>
  <div class="main-body">
     <ul class="inner-tab-title">
       <li>用户详情</li>
       <li>订单记录</li>
       <li>提现记录</li>
       <li>红包通知</li>
     </ul>
     <a class="backToUpper" href="./user-manage.html">返回 > </a>
     <div class="inner-tab-content">
       <div class="tab-item">
          <div class="info-list">
            <ul class="info-list-item">
              <li>
                用户头像：
                <span>
                  <img src="./image/sun.png" class="layui-nav-img">
                </span>
              </li>
              <li>
                昵称：
                <span>ruiusn</span>
              </li>
            </ul>
            <ul class="info-list-item">
              <li>
                微信ID：
                <span>000012</span>
              </li>
              <li>
                注册时间：
                <span>2017-12-12 12:00</span>
              </li>
              <li>
                最后登录时间：
                <span>2017-12-12 12:00</span>
              </li>
            </ul>
            <ul class="info-list-item">
              <li>
                累计发送金额：
                <span>200</span>元
              </li>
              <li>
                累计体现金额：
                <span>10</span>元
              </li>
              <li>
                账户余额：
                <span>14.91</span>元
              </li>
            </ul>
            <ul class="info-list-item">
              <li>
                账户状态：
                <span>启用</span>
              </li>
            </ul>
          </div>
          <el-table
          :data="ind_data"
          height="300"
          border
          style="width: 100%">
            <el-table-column
              prop="mc_avator"
              label="商户头像"
              width="140"
              align="center">
            </el-table-column>
            <el-table-column
              prop="mc_name"
              label="商户名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="联系电话"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="mc_posit"
              label="商户地址"
              align="center">
            </el-table-column>
                      <el-table-column
              prop="mc_website"
              label="链接网址"
              align="center">
            </el-table-column>
            <el-table-column
              prop="belong_industry"
              label="所属行业"
              width="110"
              align="center">
            </el-table-column>
          </el-table>
       </div>
       <div class="tab-item"></div>
       <div class="tab-item"></div>
       <div class="tab-item"></div>
     </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="stylus" scoped>
  .main-body
    position absolute
    left 180px
    top 80px
    right 0
    bottom 30px
    z-index 998
    width auto
    padding 15px
    box-sizing border-box

.inner-tab-title
	height 54px

.inner-tab-title li
	line-height 54px
	color rgba(255, 255, 255, .7)

.inner-tab-title .layui-thisafter
  height 54px
  border-width 3px

.inner-tab-title .layui-this
  color #fff
	transition color .9s ease

.layui-tab-content
	padding 20px

.info-list
	padding 5px

.info-list-item
	height 60px
	padding 5px 0

.info-list-item li
	display inline-block
	width 220px
	line-height 60px

.info-list-item li span
	margin 0 2px 0 4px

.user-default-info .layui-nav-img
	width 54px
	height 54px

.layui-table,
.layui-table th
	text-align center

.user-default-info .layui-table caption
	line-height 40px
	text-align left
	text-indent 2px

.user-default-info
  position relative

.user-default-info .backToUpper
	position absolute
	top 0
	right 12px
	line-height 54px
	color rgba(255, 255, 255, .7)
	transition color .7s ease

.user-default-info .backToUpper:hover
	color #fff

.user-shop-pic
	width 50px
	height 50px
	margin-bottom 4px

</style>


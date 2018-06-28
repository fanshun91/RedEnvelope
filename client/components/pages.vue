<template>
  <div class="page-block">
    <el-pagination
      class="pagebar"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalData">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentPage: 1,
        totalData: 10
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .page-block
    margin: 30px 0 10px
    text-align center
    .pagebar
      margin-left -20px
</style>

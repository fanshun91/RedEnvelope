<template>
  <div class="tag-container">
    <div class="bread-tag">{{currentSite}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      'currentSite': {
        type: String,
        required: true
      }
    }

  }
</script>

<style lang="stylus" scoped>
  .tag-container
    height 40px
    margin 10px 0 15px
    white-space nowrap
    border-bottom-width 1px
    border-bottom-style solid
    border-color #e6e6e6
    .bread-tag
      position relative
      display inline-block
      height 100%
      min-width 66px
      padding 0 15px
      line-height 40px
      text-align center
      vertical-align middle
      color #009688
      &::after
        position absolute
        left 0
        top 0
        content ''
        width 100%
        height 41px
        border-bottom 2px solid #5fb878
        box-sizing border-box
</style>

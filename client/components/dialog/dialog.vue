<template>
  <transition name="fade" @@after-leave="afterLeave">
    <div class="pop" v-show="visible">
      <div class="pop-shade" @click="handleCancel"></div>
      <div class="pop-core">
        <div class="pop-msg">
          确定执行 {{theme}} 操作吗？
        </div>
        <div class="pop-handle">
          <a class="guider" @click="handleCancel">取消</a>
          <a class="confirm" @click="handleClick">确认</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      theme: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        visible: true,
        affirm: false
      }
    },
    methods: {
      handleCancel (e) {
        e.preventDefault()
        e.stopPropagation()
        this.$emit('cancel')
      },
      handleClick (e) {
        e.preventDefault()
        this.$emit('close')
      },
      afterLeave () {
        this.$emit('closed')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .pop-shade
    position absolute
    top 0
    left 0
    z-index 998
    width 100%
    height 100%
    background-color #000
    opacity .3

  .pop-core
    position fixed
    top 50%
    left 50%
    z-index 999
    width 300px
    height 166px
    margin-top -83px
    margin-left -150px
    font-size 15px
    background-color #fff
    box-shadow: 1px 1px 50px rgba(0,0,0,.3)

  .pop-msg
    padding 35px 15px
    background-color #393d49
    color #fff

  .pop-handle
    line-height 50px
    padding 10px 15px 12px

  .pop-msg,
  .pop-handle
    text-align center
    vertical-align middle

  .pop-handle a
    display inline-block
    height 30px
    line-height 30px
    margin 5px 5px 0
    padding 0 15px
    border 1px solid #dedede
    background-color #fff
    color #333
    border-radius 2px
    font-weight 400
    cursor pointer

  .pop-handle .guider
    color #f6f6f6
    background-color #1e9fff
    border: none
    &:hover
      background-color #3fa7f5

  .pop-handle a.confirm:hover
    color #666
</style>



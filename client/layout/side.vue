<template>
  <div class="com-side">
    <div class="com-side-scroll">
      <ul class="com-list-nav">
        <li class="com-list-item" v-for="item in list" :key="item.id">
          <router-link :to="item.link" tag="a" :class="site === item.name ? 'side-nav-active' : ''"><span/>{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        required: true
      },
      site: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="stylus">
  @import '../assets/styles/side.styl'
</style>

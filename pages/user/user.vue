<template>
  <view class="my-container">
    <!-- 未登录 -->
    <my-login v-if="!isLogin"></my-login>
    <!-- 已登录 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import BadgeMixin from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [BadgeMixin],
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('User', ['token']),
      isLogin() {
        return this.token ? true : false
      }
    }
  }
</script>

<style lang="scss">
 page,
 .my-container {
   height: 100%;
 }
</style>

<template>
  <view>
    我是购物车页面
  </view>
</template>

<script>
  import BadgeMixin from '@/mixins/tabbar-badge.js'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [BadgeMixin],
    data() {
      return {
        
      };
    },
    computed: {
      ...mapGetters('Cart', ['getTotal'])
    },
    methods: {
    }
  }
</script>

<style lang="scss">

</style>

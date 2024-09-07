<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio color="#c00000" :checked="isAllSelected" @click="changeAllState">
        <text>全选</text>
      </radio>
    </label>
    
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{selectedGoodsAmount}}</text>
    </view>
    
    <!-- 结算按钮 -->
    <view class="btn-settle">结算({{getSelected}})</view>
  </view>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters('Cart', ['getTotal', 'getSelected', 'selectedGoodsAmount']),
      isAllSelected() {
        return this.getTotal === this.getSelected
      }
    },
    methods: {
      ...mapMutations('Cart', ['updateAllGoodsState']),
      changeAllState(){
        this.updateAllGoodsState(!this.isAllSelected)
      }
    }
  }
</script>
<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;
    .radio {
      display: flex;
      align-items: center;
    }
    .amount {
      color: #c00000;
    }
    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>

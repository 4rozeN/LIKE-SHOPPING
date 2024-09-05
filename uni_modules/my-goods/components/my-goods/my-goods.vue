<template>
  <view class="goods-item">
    <!-- 商品左侧图片 -->
    <view class="goods-item-left" style="margin-right: 5px;">
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 右侧信息 -->
    <view class="goods-item-right">
      <!-- 标题 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 价格 -->
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      defaultPic: 'https://fakeimg.pl/320x240/?text=default-Image'
    }
  },
  filters: {
    tofixed (num) {
      return Number(num).toFixed(2)
    }
  }
}
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    
    .goods-item-left {
      margin-right: 5px;
      
      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    
    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .goods-name {
        font-size: 13px;
      }
      
      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>

<template>
  <view class="goods-item">
    <!-- 商品左侧图片 -->
    <view class="goods-item-left" style="margin-right: 5px;">
      <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 右侧信息 -->
    <view class="goods-item-right">
      <!-- 标题 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 价格 -->
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <!-- 数量 -->
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: () => {}
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
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
  },
  methods: {
    // 商品被点击,返回操作的商品ID和state
    radioClickHandler(){
      this.$emit('click', {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state
      })
    },
    numChangeHandler(val){
      this.$emit('change', {
        goods_id: this.goods.goods_id,
        goods_count: +val
      })
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    
    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      
      .goods-name {
        font-size: 13px;
      }
      
      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>

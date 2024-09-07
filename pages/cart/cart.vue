<template>
  <view>
    <view class="address-info-box">
      <my-address></my-address>
    </view>
    <view class="cart-title">
      <!-- 左侧图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表 -->
    <uni-swipe-action>
      <block v-for="(goods,i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :showRadio="true" :showNum="true" @click="radioChange"
            @change="numChange"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
  import BadgeMixin from '@/mixins/tabbar-badge.js'
  import {
    mapGetters,
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [BadgeMixin],
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }]
      };
    },
    computed: {
      ...mapState('Cart', ['cart']),
      ...mapGetters('Cart', ['getTotal'])
    },
    methods: {
      ...mapMutations('Cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      // 是否选中该商品
      radioChange(e) {
        console.log('商品被选择：', e)
        this.updateGoodsState(e)
      },
      numChange(e) {
        console.log('e的数据', e)
        this.updateGoodsCount(e)
        this.setBadge()
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(goods) {
        console.log(goods)
        this.removeGoodsById(goods.goods_id)
        this.setBadge()
      }
    }
  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .goods-item {
    // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
  }
</style>
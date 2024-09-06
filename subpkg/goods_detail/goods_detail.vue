<template>
  <view class="goods-detail-container">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods-info-box">
      <!-- 价格 -->
      <view class="price">￥{{goods_info.goods_price | tofixed}}</view>
      <!-- 主体 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name" v-if="goods_info.goods_name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi" @click="myFavi">
          <uni-icons type="star" size="18" color="gray" v-if="!isMyFavi"></uni-icons>
          <uni-icons type="star-filled" size="18" color="#FF0000" v-else></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="freight">快递：免运费</view>
    </view>
    <!-- 商品介绍 -->
    <!-- <rich-text :nodes="goods_info.goods_introduce"></rich-text> -->
    <image src="../../static/webp-images/Cyber2.webp" mode="widthFix" style="display: block; width: 100%;"></image>
    <image src="../../static/webp-images/Cyber4.webp" mode="widthFix" style="display: block; width: 100%;"></image>
    <image src="../../static/webp-images/Cyber3.webp" mode="widthFix" style="display: block; width: 100%;"></image>
    <image src="../../static/webp-images/Witche1.webp" mode="widthFix" style="display: block; width: 100%;"></image>
    <image src="../../static/webp-images/wallpaper.webp" mode="widthFix" style="display: block; width: 100%;"></image>
    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 是否被收藏
        isMyFavi: false,
        // 商品详情对象
        goods_info: {},
        // 左侧按钮组的配置对象
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    onLoad(options) {
      // 获取商品Id
      const goods_id = options.goods_id
      // 调用请求商品详情数据的方法
      this.getGoodsDetail(goods_id)
    },
    methods: {
      // 添加到收藏
      myFavi () {
        this.isMyFavi = !this.isMyFavi
      },
      // 左侧按钮的点击事件
      onClick(e) {
        if (e.content.text === '购物车') {
          // 切换到购物车页面，跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
        console.log(e)
      },
      // 实现轮播图的预览效果
      preview(i) {
        // 调用uni.previewImage()
        uni.previewImage({
          // 预览时，默认显示图片的索引
          current: i,
          // 所有图片 url 地址的数组
          urls: this.goods_info.pics.map(p => p.pics_big)
        })
      },
      async getGoodsDetail(goods_id) {
        const res = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        console.log('res:', res)
        if (res.data.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.goods_info = res.data.message
        // 对数据中的goods_introduce做正则替换，使其没有间隙
        this.goods_info.goods_introduce = this.goods_info.goods_introduce.replace(/<img /g,
          '<img style="display:block;" ')
        console.log('this.goods_info', this.goods_info)
      }
    }
  }
</script>

<style lang="scss">
  .goods-detail-container {
    // 给页面外层的容器，添加 50px 的内padding，
    // 防止页面内容被底部的商品导航组件遮盖
    padding-bottom: 50px;
  }

  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  // 商品信息区域的样式
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }

      // 收藏区域
      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    // 运费
    .freight {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
</style>
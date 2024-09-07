<template>
  <view>
    <view class="search-box">
      <my-search :bgcolor="'#BC0000'" radius="12" @click="goSearch"></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in NavList" :key="item.name" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="item.floor_title.name">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(itemR,iR) in item.product_list" :key="iR" v-if="iR != 0" :url="itemR.url">
              <image :src="itemR.image_src" mode="widthFix" :style="{width:itemR.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
      </view>
    </view>
</template>

<script>
  import BadgeMixin from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [BadgeMixin],
    data() {
      return {
        // 存放轮播图
        swiperList: [],
        // 存放分类导航数据
        NavList: [],
        // 存放楼层数据
        floorList: []
      };
    },
    async onLoad () {
      // 开始加载时，得到轮播图数据
      this.getSwiperList()
      // 开始加载时，获取分类导航数据
      this.getNavList()
      // 开始加载时，获取楼层数据
      this.getFloorList()
    },
    methods: {
      // 点击搜索框跳转
      goSearch () {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      // 点击导航跳转
      navClickHandler (item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/category/category'
          })
        }
      },
      // 获取轮播图数据
      async getSwiperList () {
        const res = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.data.meta.status !== 200) {
          return uni.$showMsg(res.meta.msg, 1500)
        }
        // 成功后进行数据挂载
        this.swiperList = res.data.message
        console.log('swiperList:', this.swiperList)
      },
      // 获取分类导航数据
      async getNavList (){
        const res = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.data.meta.status !== 200) {
          return uni.$showMsg(res.meta.msg, 1500)
        }
        // 挂载数据
        this.NavList = res.data.message
        console.log('获取分类导航数据：', this.NavList)
      },
      // 获取楼层数据
      async getFloorList () {
        const res = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.data.meta.status !== 200) {
          return uni.$showMsg(res.meta.msg, 1500)
        }
        // 处理数据，给数据添加一个url解决分包带来的路径问题
        res.data.message.forEach(floor => {
          floor.product_list.forEach(product => {
            // split分割之后通过[1]表示保留分割后的第二部分，即查询参数?query=xx
            product.url = '/subpkg/goods_list/goods_list?' + product.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.data.message
        console.log('获取到楼层数据：', this.floorList)
      }
    }
  }
</script>

<style lang="scss" scoped>
.search-box {
  // 设置定位效果为吸顶
  position: sticky;
  // 吸顶的位置
  top: 0;
  // 提高层级，防止被覆盖
  z-index: 999;
}

swiper {
  height: 330rpx;
  .swiper-item,
  image {
    height: 100%;
    width: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
</style>

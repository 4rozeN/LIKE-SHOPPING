<template>
  <view>
    我是首页
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 存放轮播图
        swiperList: []
      };
    },
    async onLoad () {
      // 开始加载时，得到轮播图数据
      this.getSwiperList()
    },
    methods: {
      async getSwiperList () {
        const res = await uni.$http.get('/api/public/v1/home/swiperdata')
        console.log('res:', res)
        if (res.statusCode !== 200) {
          return uni.$showMsg(res.meta.msg, 1500)
        }
        // 成功后进行数据挂载
        this.swiperList = res.data.message
        console.log('swiperList:', this.swiperList)
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    height: 100%;
    width: 100%;
  }
}
</style>

<template>
  <view>
    <view class="goods-list">
      <block v-for="(goods, i) in goodsList" :key="goods.goods_name">
        <my-goods :goods="goods"></my-goods>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        defaultPic: 'https://fakeimg.pl/320x240/?text=default-Image',
        // 查询参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类ID
          cid: '',
          // 页数索引，页码值
          pagenum: 1,
          // 每页显示数据量
          pagesize: 20,
        },
        // 商品列表
        goodsList: [],
        // 总数量，实现分页用到
        total: 0
      };
    },
    onLoad (options) {
      // 得到查询参数
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 获取商品列表数据
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据
      async getGoodsList () {
        const res = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.data.meta.status !== 200) { return res.data.meta.msg}
        this.goodsList = res.data.message.goods
        this.total = res.data.message.total
        console.log('this.goodsList:', this.goodsList)
        console.log('this.total:', this.total)
      }
    }
  }
</script>

<style lang="scss">
</style>

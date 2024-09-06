<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="goods.goods_name" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 是否正在请求数据
        isLoading: false,
        // 默认图片，用于占位图片损坏的位置
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
      // 点击商品跳转到详情
      gotoDetail (goods) {
        console.log('跳转到商品详情，id=', goods.goods_id)
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      },
      // 上拉触底事件
      onReachBottom () {
        // 判断是否还有下一页
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
          return uni.$showMsg('数据全部加载完毕！')
        }
        // 判断是否正在请求，为真则不发起额外的请求，防止多次上拉触底
        if (this.isLoading) return

        // 上拉触底刷新实际拉取第二页的商品列表
        this.queryObj.pagenum += 1
        // 重新获取列表数据
        this.getGoodsList()
      },
      // 下拉刷新的响应事件
      onPullDownRefresh () {
        // 重置数据
        this.queryObj.pagenum = 1
        this.total = 0
        this.isLoading = false
        this.goodsList = []
        
        // 重新拉取
        this.getGoodsList(() => uni.stopPullDownRefresh())
      },
      // 获取商品列表数据
      async getGoodsList (callback) {
        // ** 打开节流阀
        this.isLoading = true
        const res = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // ** 关闭节流阀
        this.isLoading = false
        // 数据请求完毕且回调存在为真（不为null或undefined等）则执行回调
        callback && callback()

        if (res.data.meta.status !== 200) { return res.data.meta.msg}
        
        // 通过展开运算符，动态拼接新旧数据，使其通用
        this.goodsList = [...this.goodsList, ...res.data.message.goods]
        this.total = res.data.message.total
        console.log('this.goodsList:', this.goodsList)
        console.log('this.total:', this.total)
      }
    }
  }
</script>

<style lang="scss">
</style>

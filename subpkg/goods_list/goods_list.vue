<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="goods.goods_name" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
    <view class="back-to-top" :class="{show: showBackToTop}" @click="backToTop"></view>
  </view>
</template>

<script>
  import { debounce } from '../../common/utils/debounce';
  export default {
    data() {
      return {
        // scrollDistance
        scrollDistance: 0,
        // 控制是否显示返回顶部按钮
        showBackToTop: false,
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
      this.scrollDebounced = debounce(this.handleScroll, 200)
    },
    // 滑动生命周期
    onPageScroll (e) {
      this.scrollDebounced(e.scrollTop)
    },
    methods: {
      handleScroll (scrollTop) {
        this.checkShowBackToTop(scrollTop)
      },
      // 检查是否显示返回顶部按钮
      checkShowBackToTop(scrollTop) {
          if (scrollTop > 100) {
              this.showBackToTop = true;
              // console.log('展示返回顶部按钮')
          } else {
              this.showBackToTop = false;
          }
      },
      // 返回页面顶部
      backToTop () {
        uni.pageScrollTo ({
          scrollTop: 0,
          duration: 300 // 动画时长
        })
      },
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

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 35px; /* 设置按钮宽度 */
  height: 35px; /* 设置按钮高度，使其等于宽度 */
  background: linear-gradient(45deg, #ff7e5f, #feb47b); /* 渐变背景 */
  color: #fff;
  border-radius: 50%; /* 圆形按钮 */
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(-10px); /* 小幅度上移动画 */
}

.back-to-top::before {
  content: "↑"; /* 使用向上的箭头符号 */
  font-size: 21px;
}

</style>

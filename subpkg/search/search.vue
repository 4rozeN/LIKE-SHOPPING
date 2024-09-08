<template>
  <view class="search-box">
    <!-- 使用uni-ui的搜索组件 -->
    <uni-search-bar @input="input" @confirm="inputConfirm" :radius="100" cancelButton="none" clearButton="auto"></uni-search-bar>
    <!-- 搜索建议列表 sugg = suggestion -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view>猜你想找：</view>
      <view class="sugg-item" v-for="(item, i) in searchResults.slice(0, 5)" :key="i" @click="goDetailBySugg(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题 -->
      <view class="history-title">
        <text>{{historyList.length > 0 ? '搜索历史' : '暂无搜索历史'}}</text>
        <uni-icons type="trash" size="17" @click="historyClear" v-if="historyList.length > 0"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historyList" :key="i" @click="goGoodsListByHistory(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 延时器的timerId
        timer: null,
        // 搜索关键词
        keyWord: '',
        // 存放搜索建议列表
        searchResults: [],
        // 搜索历史
        historyList: []
      };
    },
    onLoad () {
      // 读取本地记录的搜索历史
      this.historyList = JSON.parse(uni.getStorageSync('keyWords') || '[]')
    },
    methods: {
      // 根据搜索历史前往搜索结果页
      goGoodsListByHistory (key) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + key
        })
      },
      // 清空搜索历史
      historyClear () {
        this.historyList = []
        uni.setStorageSync('keyWords', '[]')
      },
      // 确认搜索
      inputConfirm (e) {
        this.historySave(e)
        // console.log('确认搜索：', e.value)
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + e.value
        })
      },
      // 保存搜索历史到数组
      historySave (e) {
        // 搜索的关键词
        const key = e.value
        // 判断该关键词是否已经存在
        const index = this.historyList.indexOf(key)
        if (index !== -1) {
          // 将已存在的数据删除
          this.historyList.splice(index, 1)
        }
        // 将该搜索关键词加入到搜索历史数组中并置于首位
        this.historyList.unshift(key)
        // 将数组存入本地持久化存储
        uni.setStorageSync('keyWords', JSON.stringify(this.historyList))
      },
      // 输入触发事件
      input (e) {
        // 清除timer对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器，并把timerId赋值给this.timer
        this.timer = setTimeout(() => {
          // 如果500ms内，没有触发新的输入事件，则为搜索关键词赋值
          this.keyWord = e
          console.log('e:', e)
          console.log('当前keyWord为：', this.keyWord)
          // 根据关键词，查询搜索建议列表
          this.getSearchList()
        }, 500)
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList () {
        // 关键词是否为空？
        if (this.keyWord !== '') {
          // 请求搜索建议列数据
          const res = await uni.$http.get('/api/public/v1/goods/qsearch', {
            query: this.keyWord
          })
          if (res.data.meta.status !== 200) {
            return uni.$showMsg(res.meta.msg, 1500)
          }
          console.log('搜索建议：', res)
          this.searchResults = res.data.message
        } else {
          this.searchResults = []
          return
        }
      },
      // 从搜索建议跳转到商品详情页
      goDetailBySugg (goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    font-size: 12px;
    padding: 16px 5px;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 5px;
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
    .history-list {
      display: flex;
      flex-wrap: wrap;
    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
      background-color: #b3b3b3;
      border-radius: 8px;
      font-size: 13px;
      border: none;
    }
  }
}

</style>

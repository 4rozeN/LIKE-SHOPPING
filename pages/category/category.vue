<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧分类选项 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(itemL, iL) in categoryList" :key="iL">
          <view :class="['left-scroll-view-item', iL === active ? 'active' : '']" @click="activeChangeHandler(iL)">{{itemL.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧展示区 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(itemR, iR) in categoryLevel2" :key="iR">
          <view class="cate-lv2-title">/ {{itemR.cat_name}} /</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item, i) in itemR.children" :key="item.cat_id" @click="gotoGoodsList(item)">
              <image :src="item.cat_icon"></image>
              <text>{{item.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 滚动条距离顶部的距离
        scrollTop: 0,
        // 窗口可用高度
        wh: 0,
        // 分类数据
        categoryList: [],
        // 默认选择第一项
        active: 0,
        // 存放二级分类
        categoryLevel2: []
      };
    },
    async onLoad () {
      // 调用小程序API获得系统信息(同步获取)
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      // 获取分类数据
      this.getCategoryList()
    },
    methods: {
      // 点击三级分类项跳转到商品列表页面
      gotoGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      // 激活左侧点击事件
      activeChangeHandler (i) {
        this.active = i
        console.log('选择了', i)
        this.categoryLevel2 = this.categoryList[i].children
        
        // 让scrollTop的值在0与1之间切换
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 获取分类数据
      async getCategoryList () {
        const res = await uni.$http.get('/api/public/v1/categories')
        console.log('res:', res)
        if (res.statusCode !== 200) {
          return uni.$showMsg(res.meta.msg, 1500)
        }
        this.categoryList = res.data.message
        if (this.categoryList.length > 0) {
          this.categoryLevel2 = this.categoryList[this.active]?.children || [];
        }
        console.log('categoryLevel2:', this.categoryLevel2)
      }
    }
  }
</script>

<style lang="scss" scoped>
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;
  }

  .left-scroll-view-item {
    line-height: 60px;
    background-color: #F7F7F7;
    text-align: center;
    font-size: 12px;

    &.active {
      background-color: #ffffff;
      position: relative;

      &::before {
        content: ' ';
        display: block;
        width: 3px;
        height: 40px;
        background-color: #c00000;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
}
</style>

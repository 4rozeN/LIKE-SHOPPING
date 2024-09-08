<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio color="#c00000" :checked="isAllSelected" @click="changeAllState">
        <text>全选</text>
      </radio>
    </label>
    
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{selectedGoodsAmount}}</text>
    </view>
    
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{getSelected}})</view>
  </view>
</template>
<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'
  import BadgeMixin from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [BadgeMixin],
    data () {
      return {
        // 倒计时的秒数
        seconds: 3,
        timer: null
      }
    },
    computed: {
      ...mapGetters('Cart', ['getTotal', 'getSelected', 'selectedGoodsAmount', 'getSelectedIds']),
      ...mapGetters('User', ['addstr']),
      ...mapState('Cart', ['cart']),
      ...mapState('User', ['token']),
      isAllSelected() {
        return this.getTotal === this.getSelected
      },
      isLogin() {
        return !!this.token
      },
      haveSelected() {
        return !!this.getSelected
      },
      haveAddress() {
        return !!this.addstr
      }
    },
    methods: {
      ...mapMutations('Cart', ['updateAllGoodsState', 'removeGoodsByIds']),
      ...mapMutations('User', ['updateRedirectInfo']),
      // 展示提示消息
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请登录后再结算！' + n + ' 秒后自动跳转至登录页',
          mask: true, // 添加遮罩防止点击穿透
          duration: 1500 // 1.5s后消失
        })
      },
      // 全选反选
      changeAllState(){
        this.updateAllGoodsState(!this.isAllSelected)
      },
      // 延迟导航至user页
      delayNavigate() {
        this.seconds = 3
        this.showTips(this.seconds)
        // 创建定时器
        this.timer = setInterval(() => {
          this.seconds--
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/user/user',
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  from: '/page/cart/cart'
                })
              }
            })
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      },
      // 结算
      settlement() {
        // console.log('用户点击结算')
        // console.log('是否登录？', this.isLogin)
        // console.log('是否选择商品？', this.haveSelected)
        // console.log('是否选择收货地址？', this.haveAddress)
        // 是否登录？
        if (!this.isLogin) return this.delayNavigate()
        // 是否选择了商品
        if (!this.haveSelected) {
          return uni.$showMsg('请选择要结算的商品！', 1500)
        }
        // 是否选择了收货地址
        if (!this.haveAddress) {
          return uni.$showMsg('请选择收货地址！', 1500)
        }
        // 实现微信支付
        console.log('发起支付请求')
        this.orderPay()
      },
      // 提供方法实现微信支付
      async orderPay() {
        // 清空购物车中选中的商品
        console.log('选择的商品列表ids：', this.getSelectedIds)
        this.removeGoodsByIds(this.getSelectedIds)
        // 移除后重新设置徽标
        this.setBadge()
        uni.$showMsg('支付成功！', 1500)
        // // 创建订单
        // const orderInfo = {
        //   // 开发阶段，注释掉真实的订单价格
        //   // order_price: this.checkedGoodsAmount
        //   // 将订单价格写死为1分
        //   order_price: 0.01,
        //   consignee_addr: this.addstr,
        //   goods: this.cart.filter(el => el.goods_state).map(el => ({
        //     goods_id: el.goods_id,
        //     goods_number: el.goods_count,
        //     goods_price: el.goods_pirce
        //   }))
        // }
        // // 发起请求创建订单
        // const res = await uni.$http.post('/api/public/v1/my/order/create', orderInfo)
        // console.log('订单请求结果res：', res)
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }
    .amount {
      color: #c00000;
    }
    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>

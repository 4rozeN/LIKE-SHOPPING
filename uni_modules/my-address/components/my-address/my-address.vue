<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址</button>
    </view>
    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" @click="chooseAddress" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>{{address.userName}}</text>
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>{{address.telNumber}}</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>
    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>
<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        // address: {}
      }
    },
    computed: {
      ...mapState('User', ['address']),
      ...mapGetters('User', ['addstr']),
      addstr() {
        if (!this.address.provinceName) return ''

        // 拼接省市区的详细地址字符串返回给用户
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      }
    },
    methods: {
      ...mapMutations('User', ['updateAddress']),
      // 调用小程序提供的chooseAddress方法
      // 返回值是一个数组：第1项为错误对象，第2项为成功之后的收货地址对象
      async chooseAddress() {
        // console.log('用户申请地址授权')
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        // console.log('err:', err)
        console.log('succ:', succ)

        // 用户成功选择了地址
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          // 为data里面的收货地址对象赋值
          // this.address = succ
          console.log('用户选择了地址')
          this.updateAddress(succ) // 更新vuex中的收货地址
        }
        // 用户没有授权
        if (err && (err.errMsg === 'chooseAddress: fail auth deny' || err.errMsg
=== 'chooseAddress:fail authorize no response')) {
          console.log('用户没有授权')
          this.reAuth() // 调用this.reAuth()方法，向用户重新发起授权申请
        }
      },
      // 提供方法重新发起收货地址的授权
      async reAuth() {
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您没有打开地址权限，是否设置打开？',
          confirmText: '确认',
          cancelText: '取消'
        })
        // 如果弹框异常，直接退出
        if (err2) return
        // 如果点击取消，则提示用户
        if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！', 1500)
        // 如果点击确认，则调用uni.openSetting()进入授权页面，让用户重新获取
        if (confirmResult.confirm) return uni.openSetting({
          // 授权结束，对授权结果做进一步判断
          success: (settingResult) => {
            // 为true，提示成功
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址', 1500)
            // 为false，提示用户
            if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！', 1500)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 底部边框线的样式
  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }

  // 选择收货地址的盒子
  .address-choose-box {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 渲染收货信息的盒子
  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    // 第一行
    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        align-items: center;

        .phone {
          margin-right: 5px;
        }
      }
    }

    // 第二行
    .row2 {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }
    }
  }
</style>
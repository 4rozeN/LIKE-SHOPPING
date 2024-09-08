export default {
  // 开启命名空间
  namespaced: true,
  // state 数据
  state: () => ({
    // 重定向Obj { openType, from }
    redirectInfo: null,
    // 用户权证
    token: uni.getStorageSync('token') || '',
    // 用户基本信息
    userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
  }),
  // 方法
  mutations: {
    // 更新重定向的信息对象
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    },
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      this.commit('User/saveAddressToStorage')
    },
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 保存userInfo到本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userInfo))
    },
    // 更新用户的基本信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      this.commit('User/saveUserInfoToStorage')
    },
    // 存储token
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    // 更新token字符串
    updateToken(state, token) {
      state.token = token
      this.commit('User/saveTokenToStorage')
    }
  },
  // 数据包装器
  getters: {
    // 提供方法返回地址字符串
    addstr(state) {
      // 更严格地判断 address 是否有效
      const HaveAddress = state.address && Object.keys(state.address).length !== 0

      console.log('当前地址信息：', state.address)
      console.log('当前地址信息：', HaveAddress)

      if (!HaveAddress) return ''

      // 拼接省市区的详细地址字符串返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    },
    // 提供方法返回接口参数encryptedData,iv,rawData,signature
    halfTokenData(state) {
      console.log('state.userInfo:', state.userInfo)
      const requiredData = {
        encryptedData: state.userInfo.encryptedData,
        iv: state.userInfo.iv,
        rawData: state.userInfo.rawData,
        signature: state.userInfo.signature
      }
      return requiredData
    }
  },
}
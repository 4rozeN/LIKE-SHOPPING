export default {
  // 开启命名空间
  namespaced: true,
  // state 数据
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
  }),
  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
    },
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
  },
  // 数据包装器
  getters: {
    addstr() {
      if (!this.address.provinceName) return ''
    
      // 拼接省市区的详细地址字符串返回给用户
      return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
    }
  },
}
export default {
  namespaced: true,
  state () {
    return {
      // 存放购物车每个商品信息的对象：goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state
      cart: JSON.parse(uni.getStorageSync('cartData') || '[]')
    }
  },
  mutations: {
    // 提供方法增加购物车数据
    addToCart (state, goodsObj) {
      // 判断是否已存在，若是则数量加1
      const findResult = state.cart.find((el) => el.goods_id === goodsObj.goods_id)
      if (!findResult) {
        // 没有则加入
        state.cart.push(goodsObj)
      } else {
        console.log('findResult:', findResult)
        findResult.goods_count++
      }
      this.commit('Cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cartData', JSON.stringify(state.cart))
    }
  },
  getters: {
    // 提供方法得到cart中商品的总数
    getTotal (state) {
      let count = 0
      state.cart.forEach(goods => count += goods.goods_count)
      return count
    }
  }
}

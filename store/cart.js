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
    },
    // 更新购物车中商品的选中状态
    updateGoodsState(state, goods){
      // 查找id进行修改
      const findRes = state.cart.find(el => el.goods_id === goods.goods_id)
      if (findRes) {
        // 如果有说明需要进行更新
        findRes.goods_state = goods.goods_state
        // 存入LocalStorage
        this.commit('Cart/saveToStorage')
      }
    },
    updateGoodsCount(state, goods) {
      console.log('增加一次商品,goods:', goods)
      // 查找id进行修改
      const findRes = state.cart.find(el => el.goods_id === goods.goods_id)
      if (findRes) {
        findRes.goods_count = goods.goods_count
        this.commit('Cart/saveToStorage')
      } else {
        console.log('未找到有效count值')
      }
    },
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('Cart/saveToStorage')
    }
  },
  getters: {
    // 提供方法得到cart中商品的总数
    getTotal (state) {
      let count = 0
      state.cart.forEach(goods => count += goods.goods_count)
      console.log('count:', count)
      return count
    }
  }
}

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
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('Cart/saveToStorage')
    },
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('Cart/saveToStorage')
    },
    removeGoodsByIds(state, goods_ids) {
      state.cart = state.cart.filter(goods => !goods_ids.includes(goods.goods_id))
      this.commit('Cart/saveToStorage')
    }
  },
  getters: {
    // 提供方法得到购物车中选中商品的id列表
    getSelectedIds(state) {
      return state.cart
        .filter(goods => goods.goods_state)
        .map(goods => goods.goods_id)
    },
    // 提供方法得到cart中商品的总数
    getTotal (state) {
      let count = 0
      state.cart.forEach(goods => count += goods.goods_count)
      console.log('count:', count)
      return count
    },
    // 提供方法获得cart中选中的商品总数
    getSelected(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    // 提供方法计算选中商品总价
    selectedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state)
      .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
      .toFixed(2)
    }
  }
}

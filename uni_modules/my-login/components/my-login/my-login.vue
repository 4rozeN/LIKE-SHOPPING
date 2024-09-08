<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserData" >一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations('User', ['updateUserInfo', 'updateToken']),
      ...mapGetters('User', ['halfTokenData']),
      // 获取用户基本信息（非登录）
      async getUserData(e) {
        const res = await uni.getUserProfile({
          desc: '获取用户基本信息'
        })
        // console.log(res)
        if (res[1].errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权！', 1500)
        
        this.updateUserInfo(res[1])

        this.getToken()
      },
      // 获得登录token
      async getToken() {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('res:', res)
        // 判断是否失败
        if(err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        // 准备参数对象
        let query = this.halfTokenData()
        query.code = res.code
        console.log('query:', query)
        // 得到token
        const tokenRes = await uni.$http.post('/api/public/v1/user/wxlogin', query)
        console.log('tokenRes:', tokenRes)
        // 由于小程序权限问题，最多只有90个开发者，所以这里模拟登录成功，使用定死的token
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o'
        uni.$showMsg('登录成功', 1500)
        
        // 更新token
        this.updateToken(token)
      }
    }
  }
</script>
<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style><template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserData" >一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations('User', ['updateUserInfo', 'updateToken']),
      ...mapGetters('User', ['halfTokenData']),
      // 获取用户基本信息（非登录）
      async getUserData(e) {
        const res = await uni.getUserProfile({
          desc: '获取用户基本信息'
        })
        // console.log(res)
        if (res[1].errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权！', 1500)
        
        this.updateUserInfo(res[1])

        this.getToken()
      },
      // 获得登录token
      async getToken() {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('res:', res)
        // 判断是否失败
        if(err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        // 准备参数对象
        let query = this.halfTokenData()
        query.code = res.code
        console.log('query:', query)
        // 得到token
        const tokenRes = await uni.$http.post('/api/public/v1/user/wxlogin', query)
        console.log('tokenRes:', tokenRes)
        // 由于小程序权限问题，最多只有90个开发者，所以这里模拟登录成功，使用定死的token
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        uni.$showMsg('登录成功', 1500)
        
        // 更新token
        this.updateToken(token)
      }
    }
  }
</script>
<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style><template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserData" >一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations('User', ['updateUserInfo', 'updateToken']),
      ...mapGetters('User', ['halfTokenData']),
      // 获取用户基本信息（非登录）
      async getUserData(e) {
        const res = await uni.getUserProfile({
          desc: '获取用户基本信息'
        })
        // console.log(res)
        if (res[1].errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权！', 1500)
        
        this.updateUserInfo(res[1])

        this.getToken()
      },
      // 获得登录token
      async getToken() {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('res:', res)
        // 判断是否失败
        if(err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        // 准备参数对象
        let query = this.halfTokenData()
        query.code = res.code
        console.log('query:', query)
        // 得到token
        const tokenRes = await uni.$http.post('/api/public/v1/user/wxlogin', query)
        console.log('tokenRes:', tokenRes)
        // 由于小程序权限问题，最多只有90个开发者，所以这里模拟登录成功，使用定死的token
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        uni.$showMsg('登录成功', 1500)
        
        // 更新token
        this.updateToken(token)
      }
    }
  }
</script>
<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style><template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserData" >一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations('User', ['updateUserInfo', 'updateToken']),
      ...mapGetters('User', ['halfTokenData']),
      // 获取用户基本信息（非登录）
      async getUserData(e) {
        const res = await uni.getUserProfile({
          desc: '获取用户基本信息'
        })
        // console.log(res)
        if (res[1].errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权！', 1500)
        
        this.updateUserInfo(res[1])

        this.getToken()
      },
      // 获得登录token
      async getToken() {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('res:', res)
        // 判断是否失败
        if(err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        // 准备参数对象
        let query = this.halfTokenData()
        query.code = res.code
        console.log('query:', query)
        // 得到token
        const tokenRes = await uni.$http.post('/api/public/v1/user/wxlogin', query)
        console.log('tokenRes:', tokenRes)
        // 由于小程序权限问题，最多只有90个开发者，所以这里模拟登录成功，使用定死的token
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        uni.$showMsg('登录成功', 1500)
        
        // 更新token
        this.updateToken(token)
      }
    }
  }
</script>
<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style><template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserData" >一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations('User', ['updateUserInfo', 'updateToken']),
      ...mapGetters('User', ['halfTokenData']),
      // 获取用户基本信息（非登录）
      async getUserData(e) {
        const res = await uni.getUserProfile({
          desc: '获取用户基本信息'
        })
        // console.log(res)
        if (res[1].errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权！', 1500)
        
        this.updateUserInfo(res[1])

        this.getToken()
      },
      // 获得登录token
      async getToken() {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('res:', res)
        // 判断是否失败
        if(err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        // 准备参数对象
        let query = this.halfTokenData()
        query.code = res.code
        console.log('query:', query)
        // 得到token
        const tokenRes = await uni.$http.post('/api/public/v1/user/wxlogin', query)
        console.log('tokenRes:', tokenRes)
        // 由于小程序权限问题，最多只有90个开发者，所以这里模拟登录成功，使用定死的token
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        uni.$showMsg('登录成功', 1500)
        
        // 更新token
        this.updateToken(token)
      }
    }
  }
</script>
<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style><template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserData" >一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations('User', ['updateUserInfo', 'updateToken']),
      ...mapGetters('User', ['halfTokenData']),
      // 获取用户基本信息（非登录）
      async getUserData(e) {
        const res = await uni.getUserProfile({
          desc: '获取用户基本信息'
        })
        // console.log(res)
        if (res[1].errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权！', 1500)
        
        this.updateUserInfo(res[1])

        this.getToken()
      },
      // 获得登录token
      async getToken() {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('res:', res)
        // 判断是否失败
        if(err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        // 准备参数对象
        let query = this.halfTokenData()
        query.code = res.code
        console.log('query:', query)
        // 得到token
        const tokenRes = await uni.$http.post('/api/public/v1/user/wxlogin', query)
        console.log('tokenRes:', tokenRes)
        // 由于小程序权限问题，最多只有90个开发者，所以这里模拟登录成功，使用定死的token
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        uni.$showMsg('登录成功', 1500)
        
        // 更新token
        this.updateToken(token)
      }
    }
  }
</script>
<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style><template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserData" >一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations('User', ['updateUserInfo', 'updateToken']),
      ...mapGetters('User', ['halfTokenData']),
      // 获取用户基本信息（非登录）
      async getUserData(e) {
        const res = await uni.getUserProfile({
          desc: '获取用户基本信息'
        })
        // console.log(res)
        if (res[1].errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权！', 1500)
        
        this.updateUserInfo(res[1])

        this.getToken()
      },
      // 获得登录token
      async getToken() {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('res:', res)
        // 判断是否失败
        if(err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        // 准备参数对象
        let query = this.halfTokenData()
        query.code = res.code
        console.log('query:', query)
        // 得到token
        const tokenRes = await uni.$http.post('/api/public/v1/user/wxlogin', query)
        console.log('tokenRes:', tokenRes)
        // 由于小程序权限问题，最多只有90个开发者，所以这里模拟登录成功，使用定死的token
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        uni.$showMsg('登录成功', 1500)
        
        // 更新token
        this.updateToken(token)
      }
    }
  }
</script>
<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style><template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserData" >一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations('User', ['updateUserInfo', 'updateToken']),
      ...mapGetters('User', ['halfTokenData']),
      // 获取用户基本信息（非登录）
      async getUserData(e) {
        const res = await uni.getUserProfile({
          desc: '获取用户基本信息'
        })
        // console.log(res)
        if (res[1].errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权！', 1500)
        
        this.updateUserInfo(res[1])

        this.getToken()
      },
      // 获得登录token
      async getToken() {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('res:', res)
        // 判断是否失败
        if(err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        // 准备参数对象
        let query = this.halfTokenData()
        query.code = res.code
        console.log('query:', query)
        // 得到token
        const tokenRes = await uni.$http.post('/api/public/v1/user/wxlogin', query)
        console.log('tokenRes:', tokenRes)
        // 由于小程序权限问题，最多只有90个开发者，所以这里模拟登录成功，使用定死的token
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        uni.$showMsg('登录成功', 1500)
        
        // 更新token
        this.updateToken(token)
      }
    }
  }
</script>
<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style><template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserData" >一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations, mapGetters, mapState } from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState('User', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('User', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      ...mapGetters('User', ['halfTokenData']),
      // 获取用户基本信息（非登录）
      async getUserData(e) {
        const res = await uni.getUserProfile({
          desc: '获取用户基本信息'
        })
        // console.log(res)
        if (res[1].errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权！', 1500)
        
        this.updateUserInfo(res[1])

        this.getToken()
      },
      // 获得登录token
      async getToken() {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('res:', res)
        // 判断是否失败
        if(err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        
        // 准备参数对象
        let query = this.halfTokenData()
        query.code = res.code
        console.log('query:', query)
        // 得到token
        const tokenRes = await uni.$http.post('/api/public/v1/user/wxlogin', query)
        console.log('tokenRes:', tokenRes)
        // 由于小程序权限问题，最多只有90个开发者，所以这里模拟登录成功，使用定死的token
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        uni.$showMsg('登录成功', 1500)
        
        // 更新token
        this.updateToken(token)
        
        // 若有原页面，回到原页面
        this.navigateBack()
      },
      // 返回登录之前的页面
      navigateBack() {
        // 如果重定向信息不为null，并且导航方式switchTab
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            // 成功后将重定向信息清除
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>

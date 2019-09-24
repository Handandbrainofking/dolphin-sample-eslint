import nativeService from 'src/service/nativeService'

export default {
  computed: {
    pageHeight() {
      return (750 / weex.config.env.deviceWidth) * weex.config.env.deviceHeight
    },
    isImmersion: function() {
      let result = true
      if (weex.config.env.isImmersion == 'false') {
        result = false
      }
      return result
    },

    isipx() {
      return (
        weex &&
        (weex.config.env.deviceModel === 'iPhone10,3' ||
        weex.config.env.deviceModel === 'iPhone10,6' || //iphoneX
        weex.config.env.deviceModel === 'iPhone11,8' || //iPhone XR
        weex.config.env.deviceModel === 'iPhone11,2' || //iPhone XS
          weex.config.env.deviceModel === 'iPhone11,4' ||
          weex.config.env.deviceModel === 'iPhone11,6') //iPhone XS Max
      )
    }
  },
  methods: {
    goTo(pageName, options = {}, params) {
      if (!this.isNavigating) {
        this.isNavigating = true
        // 离开时同步全局应用数据
        nativeService.setItem(this.appDataKey, this.appData, () => {
          //跳转页面
          var path = pageName + '.js'
          if (params) {
            path +=
              '?' +
              Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')
          }
          options.viewTag = pageName
          nativeService.goTo(path, options)
          setTimeout(() => {
            this.isNavigating = false
          }, 500)
        })
      }
    },
    back() {
      //返回上一页
      nativeService.goBack()
    },
    exit() {
      nativeService.backToNative()
    }
  }
}

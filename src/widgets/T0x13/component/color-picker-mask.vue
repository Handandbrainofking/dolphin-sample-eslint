<template>
  <div class="container">
    <div
      ref="dof-mask"
      @click.stop.prevent="defaultClick"
      class="dof-mask"
      v-if="show"
      :hack="shouldShow"
      :style="maskStyle"
    >
      <div class="top-nav">
        <div class="color-container">
          <div class="img-box" :style="{ backgroundColor: iconColor }">
            <image class="icon-img" src="./assets/image/light_ic_color@2x.png"></image>
          </div>
          <div class="text-box">
            <text class="title">颜色</text>
          </div>
        </div>
        <div class="arrow" @click.stop="foldTrigger">
          <image class="arrow-img" :src="showRightIcon"></image>
        </div>
      </div>
      <div class="color-picker-container">
        <pick-pallet
          titleName="原生组件"
          @changeColor="colorPickerChange"
          :style="{ height: '480px', width: '480px' }"
        ></pick-pallet>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  width: 750px;
  bottom: 0px;
  /*兼容H5异常*/
  z-index: 99999;
}

.dof-mask {
  position: fixed;
  z-index: 999999;
  left: 60px;
  width: 702px;
  height: 1000px;
  background-color: #ffffff;
  border-radius: 16px;
}
.top-nav {
  flex-direction: row;
  justify-content: space-between;
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
}
.color-container {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
.img-box {
  width: 48px;
  height: 48px;
  border-radius: 24px;
}
.icon-img {
  width: 48px;
  height: 48px;
}
.text-box {
  padding-left: 16px;
}
.title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  line-height: 32px;
}
.arrow {
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
}
.arrow-img {
  width: 40px;
  height: 40px;
}
.color-picker-container {
  justify-content: center;
  align-items: center;
}
</style>

<script>
const animation = weex.requireModule('animation')
export default {
  components: {},
  props: {
    iconColor: {
      type: String,
      default: '#ff8225'
    },
    height: {
      type: [String, Number],
      default: 800
    },
    width: {
      type: [String, Number],
      default: 702
    },
    top: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      default: 300
    },
    hasOverlay: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    timingFunction: {
      type: Array,
      default: () => ['ease-in', 'ease-out']
    },
    overlayCfg: {
      type: Object,
      default: () => ({
        hasAnimation: true,
        timingFunction: ['ease-in', 'ease-out'],
        canAutoClose: true,
        duration: 300,
        opacity: 0.6
      })
    },
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    overlayCanClose: {
      type: Boolean,
      default: true
    },
    maskBgColor: {
      type: String,
      default: '#ffffff'
    },
    opacity: {
      type: [Number, String],
      default: 0.6
    }
  },
  data: () => ({
    closeIcon: 'https://gw.alicdn.com/tfs/TB1qDJUpwMPMeJjy1XdXXasrXXa-64-64.png',
    maskTop: 264,
    opened: false
  }),
  created() {
    // this.$MID.alert(this.borderRadius)
  },
  computed: {
    showRightIcon() {
      return './assets/image/service_ic_show@3x.png'
    },

    mergeOverlayCfg() {
      return {
        ...this.overlayCfg,
        hasAnimation: this.hasAnimation
      }
    },
    maskStyle() {
      const { width, height, showClose, hasAnimation, opened, top } = this
      const newHeight = showClose ? height - 0 + 100 : height
      const { deviceHeight, deviceWidth, platform } = weex.config.env
      const _deviceHeight = deviceHeight || 1334
      const isWeb = typeof window === 'object' && platform.toLowerCase() === 'web'
      const navHeight = isWeb ? 0 : 130
      const pageHeight = (_deviceHeight / deviceWidth) * 750 - navHeight
      return {
        width: '686px',
        height: '684px',
        left: (750 - width) / 2 + 'px',
        bottom: '276px',
        opacity: hasAnimation && !opened ? 0 : 1
      }
    },
    contentStyle() {
      return {
        width: this.width + 'px',
        backgroundColor: this.maskBgColor,
        height: this.height + 'px',
        borderRadius: '16px'
      }
    },
    shouldShow() {
      const { show, hasAnimation } = this
      hasAnimation &&
        setTimeout(() => {
          this.appearMask(show)
        }, 50)
      return show
    }
  },
  methods: {
    foldTrigger() {
      this.$emit('dofMaskSetHidden', {})
    },
    colorPickerChange(event) {
      // this.$MID.alert(event)
      this.$emit('colorPickerSelected', {
        r: event.red,
        g: event.green,
        b: event.blue
      })
    },
    needEmit(bool = false) {
      this.opened = bool
      !bool && this.$emit('dofMaskSetHidden', {})
    },
    appearMask(bool, duration = this.duration) {
      const { hasAnimation, timingFunction } = this
      const maskEl = this.$refs['dof-mask']
      if (hasAnimation && maskEl) {
        animation.transition(
          maskEl,
          {
            styles: {
              opacity: bool ? 1 : 0
            },
            duration,
            timingFunction: timingFunction[bool ? 0 : 1],
            delay: 0
          },
          () => {
            this.needEmit(bool)
          }
        )
      } else {
        this.needEmit(bool)
      }
    },
    defaultClick() {}
  }
}
</script>

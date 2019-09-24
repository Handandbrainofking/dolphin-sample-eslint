<template>
  <div class="minibar-wrapper" :style="{ 'background-color': backgroundColor }">
    <div class="dof-minibar" :style="newBarStyle" v-if="show">
      <div class="left" @click="leftButtonClicked" aria-label="返回" :accessible="true">
        <slot name="left">
          <image :src="leftButton" v-if="leftButton && !leftText" class="left-button"></image>
          <text v-if="leftText" class="icon-text" :style="{ color: textColor }">{{ leftText }}</text>
        </slot>
      </div>
      <slot name="middle">
        <text class="middle-title" :style="{ color: textColor }">{{ title }}</text>
      </slot>
      <div class="right" @click="rightButtonClicked">
        <slot name="right">
          <image v-if="rightButton && !rightText" class="right-button" :src="rightButton" :aria-hidden="true"></image>
          <text v-if="rightText" class="icon-text" :style="{ color: textColor }">{{ rightText }}</text>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dof-minibar {
  width: 750px;
  height: 90px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.left {
  width: 180px;
  padding-left: 32px;
}

.middle-title {
  font-family: PingFangSC-Regular;
  font-size: 30px;
  color: #ffffff;
  height: 36px;
  line-height: 34px;
}

.right {
  width: 180px;
  padding-right: 32px;
  align-items: flex-end;
}

.left-button {
  width: 21px;
  height: 36px;
}

.right-button {
  width: 32px;
  height: 32px;
}

.icon-text {
  font-size: 28px;
  color: #ffffff;
}
</style>

<script>
import { Utils } from '@midea/dolphin-weex-ui'
const Navigator = weex.requireModule('navigator')
const platform = weex.config.env.platform.toLowerCase()
const modal = weex.requireModule('modal')
export default {
  props: {
    isImmersion: {
      type: Boolean,
      default: null
    },
    backgroundColor: {
      type: String,
      default: '#FFC900'
    },
    leftButton: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'
    },
    textColor: {
      type: String,
      default: '#3D3D3D'
    },
    rightButton: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标题'
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    useDefaultReturn: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    barStyle: {
      type: Object
    }
  },
  created() {
    this.isIPhoneX = Utils.env.isIPhoneX()
  },
  computed: {
    statusBarHeight: function() {
      let result = '20'
      if (weex.config.env.statusBarHeight) {
        if (weex.config.env.platform == 'iOS') {
          // iOS使用pt为单位
          result = weex.config.env.statusBarHeight
        } else {
          // 安卓使用px为单位
          result = weex.config.env.statusBarHeight / weex.config.env.scale
        }
      }
      const message = JSON.stringify(result)
      return result
    },
    newBarStyle() {
      let result, isImmersion
      const { backgroundColor, barStyle } = this
      if (this.isImmersion !== null) {
        isImmersion = this.isImmersion
      } else {
        isImmersion = this.isImmersion
      }
      if (isImmersion) {
        // 全屏显示，weex自行处理状态栏高度
        result = {
          backgroundColor,
          paddingTop: this.statusBarHeight + 'wx',
          height: +this.statusBarHeight + 44 + 'wx',
          ...barStyle
        }
      } else {
        // 非全屏显示，app已处理状态栏高度
        result = {
          backgroundColor,
          paddingTop: this.statusBarHeight + 'wx',
          height: +this.statusBarHeight + 44 + 'wx',
          ...barStyle
        }
      }
      return result
    }
  },
  methods: {
    leftButtonClicked() {
      if (this.useDefaultReturn) {
        Navigator.pop({}, e => {})
      }
      this.$emit('dofMinibarLeftButtonClicked', {})
    },
    rightButtonClicked() {
      const hasRightContent = this.rightText || this.rightButton || (this.$slots && this.$slots.right)
      hasRightContent && this.$emit('dofMinibarRightButtonClicked', {})
    }
  }
}
</script>

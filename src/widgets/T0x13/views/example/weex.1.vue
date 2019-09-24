<template>
  <div :class="['app-wrapper']" :style="{ backgroundImage: responsiveBackgroundComp }">
    <div class="brightness-bg" v-if="brightnessBgShowComp" :style="{ opacity: brightnessBgComp }"></div>
    <div class="container">
      <dof-minibar
        :title="deviceName"
        :left-button="leftButton"
        backgroundColor="transparent"
        textColor="#ffffff"
        @dofMinibarLeftButtonClicked="minibarLeftButtonClick"
        @dofMinibarRightButtonClicked="minibarRightButtonClick"
      >
        <div slot="right" class="right-img-wrapper">
          <image :src="rightButton" style="height: 48px;width: 48px;"></image>
        </div>
      </dof-minibar>
      <scroller class="main">
        <div :class="['lamp-wrapper', isLampOpen ? '' : 'lamp-closed']" v-for="(item, index) in lampArr" :key="index">
          <div class="lamp-box">
            <div class="lamp">
              <image class="lamp-img" :src="lampImg"></image>
              <div class="timing-tip" v-if="isLampOpen" :style="{ backgroundColor: 'rgba(0,0,0,0.6)' }">
                <image class="timing-img" src="./assets/image/light_ic_time@2x.png"></image>
                <text class="timing-text">14:00-15:00开灯</text>
              </div>
            </div>
          </div>
        </div>
        <div class="device-skill-sets" v-if="isLampOpen">
          <div class="skill-box" v-if="lampColorSet">
            <color-panel
              :isFold="!isColorPickerShow"
              :iconColor="colorIconBackgroundComp"
              @colorPickerFold="colorPanelFoldTrigger"
            ></color-panel>
          </div>
          <div class="skill-box" v-if="lampBrightnessSet">
            <skill-panel
              :iconColor="brightnessIconBackgroundComp"
              :iconUrl="brightnessIconUrl"
              v-for="(item, index) in lampBrightnessSet"
              :key="index"
              :type="item.code"
              :title="item.name"
              :code="item.code"
              :min="item.min"
              :max="item.max"
              :step="item.step"
              :value="item.defaultValue"
              :unit="item.unit"
              @slideEnd="slideBarHandler"
            ></skill-panel>
          </div>
          <div class="skill-box" v-if="lampColorTemperatureSet">
            <skill-panel
              :iconColor="temperatureIconBackgroundComp"
              :iconUrl="temperatureIconUrl"
              v-for="(item, index) in lampColorTemperatureSet"
              :key="index"
              :type="item.code"
              :title="item.name"
              :code="item.code"
              :min="item.min"
              :max="item.max"
              :step="item.step"
              :value="item.defaultValue"
              :unit="item.unit"
              @slideEnd="slideBarHandler"
            ></skill-panel>
          </div>
        </div>
      </scroller>
      <tab-bar
        :data="TabBarItems"
        :status="isLampOpen"
        :iconColor="timingBgColorComp"
        @buttonClickHandler="switchTrigger"
      ></tab-bar>
    </div>
    <color-picker-mask
      v-if="isLampOpen"
      height="686"
      width="684"
      border-radius="16"
      duration="500"
      mask-bg-color="#FFFFFF"
      :iconColor="colorIconBackgroundComp"
      :show="isColorPickerShow"
      :has-animation="hasAnimation"
      @dofMaskSetHidden="dofMaskSetHidden"
      @colorPickerSelected="colorSelectedTrigger"
    >
    </color-picker-mask>
  </div>
</template>
<style scoped>
.app-wrapper {
  width: 750px;
  /* background-color: #fff1cb; */
  flex-direction: row;
  padding-bottom: 238px;
}
.brightness-bg {
  background-color: #000000;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
.lamp-closed {
  padding-top: 168px;
}
.right-img-wrapper {
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
}
.main {
  /* background-color: #f5f5f5; */
  background-color: transparent;
}
.lamp-wrapper {
  width: 750px;
  /* height: 400px; */
  /* background-color: #eff0dc; */
  background-color: transparent;
}
.lamp-box {
  width: 750px;
  /* height: 300px; */
  background-color: transparent;
}
.lamp {
  padding-top: 30px;
  /* background-color: rgba(244, 164, 96, 0.5); */
  background-color: transparent;
  justify-content: center;
  align-items: center;
}
.lamp-img {
  width: 388px;
  height: 352px;
}
.lamp-text {
  font-size: 22px;
}
.timing-tip {
  height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* opacity: 0.8; */
  background-color: #ff8225;
  border-radius: 32px;
  padding-left: 32px;
  padding-right: 32px;
}
.timing-img {
  width: 24px;
  height: 24px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 14px;
}
.timing-text {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 28px;
  margin-left: 12px;
}
.device-skill-sets {
  width: 750px;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 24px;
  padding-bottom: 24px;
}
.skill-box {
  margin-bottom: 20px;
}
.adjust-container {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 750px;
  margin-bottom: 20px;
}
</style>
<script>
import DofMinibar from '../../component/dof-minibar'
import TabBar from '../../component/tab-bar'
import ColorPanel from '../../component/color-panel'
import SkillPanel from '../../component/skill-panel'
import ColorPickerMask from '../../component/color-picker-mask'
import BoxPanel from '../../component/box-panel'
import { DofCell } from '@midea/dolphin-weex-ui'
// import nativeService from 'src/service/nativeService'
import nativeService from '../../api/lamp-device-control'
import base from 'src/mixins/base'
let platformSetting = require('./setting.json')
const globalEvent = weex.requireModule('globalEvent')
const modal = weex.requireModule('modal')
import { debounce } from 'src/util/util'
import { queryLampDeviceInfo } from '../../api/lamp-device-control'
import { brightnessScaleArr } from '../../api/config'
const stream = weex.requireModule('stream')
module.exports = {
  components: {
    DofMinibar,
    TabBar,
    ColorPanel,
    SkillPanel,
    ColorPickerMask,
    BoxPanel
  },
  mixins: [base],
  props: {
    isLampOpen: {
      type: Boolean,
      default: false
    },
    switchMode: {
      type: Boolean,
      default: true
    },

    timingMode: {
      type: Boolean,
      default: true
    },
    colorMode: {
      type: Boolean,
      default: true
    },
    brightnessMode: {
      type: Boolean,
      default: true
    },
    colorTemperatureMode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //图片定义
      leftButton: './assets/image/header/public_back_white.png',
      rightButton: './assets/image/header/ic_more@2x.png',
      temperatureIconUrl: './assets/image/light_ic_tem@2x.png',
      brightnessIconUrl: './assets/image/light_ic_brightness@2x.png',
      //定时模式
      timingMode: 'countdown',
      //当前是否开灯：boolean
      isLampPowerOn: true,
      //底部选项bar
      TabBarItems: [
        {
          code: 'power',
          stat: 'off',
          type: 'switch',
          srcImg: './assets/image/light_ic_on@2x.png',
          text: '开机'
        }
      ],
      lampArr: [1],
      //lamp功能数据
      lampSkillSet: [],
      //取色器显示/隐藏
      isColorPickerShow: false,
      //取色器显示/隐藏动画过渡
      hasAnimation: true,
      //当前颜色取值组合ß
      colorRgbSet: {
        r: 125,
        g: 136,
        b: 155
      },
      //缺省开灯状态色值组合
      lampOpenedColorRgbSet: {
        r: 255,
        g: 130,
        b: 36
      },
      //缺省关机状态色值组合
      lampClosedcolorRgbSet: {
        r: 125,
        g: 136,
        b: 155
      },
      colorTemperatureRGBGroup: [
        {
          r: 255,
          g: 130,
          b: 36
        },
        {
          r: 254,
          g: 138,
          b: 52
        },
        {
          r: 253,
          g: 150,
          b: 73
        },
        {
          r: 252,
          g: 164,
          b: 99
        },
        {
          r: 251,
          g: 180,
          b: 127
        },
        {
          r: 249,
          g: 196,
          b: 156
        },
        {
          r: 248,
          g: 211,
          b: 184
        },
        {
          r: 247,
          g: 225,
          b: 209
        },
        {
          r: 246,
          g: 237,
          b: 230
        },
        {
          r: 245,
          g: 245,
          b: 245
        }
      ],
      //可配置设备参数
      deviceName: '华为智能灯',
      deviceId: ''
    }
  },
  async created() {
    // let requestParams = {
    //   url: '/setting.json',
    //   type: 'json',
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' }
    // }
    // stream.fetch(requestParams, resData => {
    //   this.$MID.alert(resData)
    // })
    //加载插件自定义配置
    await this.getSetting()
    // this.$MID.alert(`weex.config.env:${weex.config.env.statusBarHeight}, scale:${weex.config.env.scale}`)
  },
  mounted() {
    //加载智能已保存的数据状态，初始灯的展示效果
    this.appLampProgramInit()
    // this.$MID.toast(`pageHeight:${this.pageHeight}`)
  },
  computed: {
    //开关机状态的图片切换
    lampImg() {
      return this.isLampOpen ? './assets/image/light_ic_lighton@2x.png' : './assets/image/light_ic_lightoff@2x.png'
    },
    //颜色配置
    lampColorSet() {
      return this.lampSkillSet.filter(_ => _.code === 'color').length > 0
    },
    //亮度配置
    lampBrightnessSet() {
      return this.lampSkillSet.filter(_ => _.code === 'brightness')
    },
    //色温配置
    lampColorTemperatureSet() {
      return this.lampSkillSet.filter(_ => _.code === 'color_temperature')
    },

    responsiveBackgroundComp() {
      let currentColor = this.isLampOpen
        ? this.generateColorVal(this.colorRgbSet)
        : this.generateColorVal(this.lampClosedcolorRgbSet)
      return `linear-gradient(to bottom, ${currentColor}, #ffffff)`
    },
    //亮度渐变计算
    brightnessBgComp() {
      //如果配了亮度的功能
      let [{ min, max, defaultValue }] = this.lampSkillSet.filter(_ => _.code === 'brightness')
      let opacityMin = 0,
        opacityMax = 1
      let currentOpacity = this.arithmeticScaleCalc([
        { dMin: opacityMin, dMax: opacityMax },
        { referValue: defaultValue, referMin: min, referMax: max }
      ])
      return parseFloat(currentOpacity).toFixed(1)
    },
    brightnessBgShowComp() {
      return this.lampBrightnessSet.length > 0
    },
    //定时按钮的背景色
    timingBgColorComp() {
      return this.isLampOpen
        ? this.generateColorVal(this.colorRgbSet)
        : this.generateColorVal(this.lampClosedcolorRgbSet)
    },
    //颜色按钮的背景色
    colorIconBackgroundComp() {
      return this.generateColorVal(this.colorRgbSet)
    },
    //亮度按钮的背景色
    brightnessIconBackgroundComp() {
      return this.generateColorVal(this.colorRgbSet)
    },
    //色温按钮的背景色
    temperatureIconBackgroundComp() {
      return this.generateColorVal(this.colorRgbSet)
    }
  },
  methods: {
    minibarLeftButtonClick() {},
    minibarRightButtonClick() {
      nativeService.goTo('more.js')
    },
    //created加载setting.json
    async getSetting() {
      nativeService.getPath(weexPath => {
        let params = {
          url: `${weexPath}setting.json`,
          type: 'json',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
        // this.$MID.alert(params)
        nativeService
          .sendHttpRequest(params)
          .then(res => {
            //美居插件内部加载自定义配置
            this.$MID.toast('成功读取插件配置')
            this.beforeDeviceSettingInit(res)
          })
          .catch(err => {
            nativeService.alert('获取自定义插件配置失败')
            nativeService.alert(err)
            //调试模式：扫码支持获取静态插件配置
            this.beforeDeviceSettingInit(platformSetting)
          })
      })
    },
    beforeDeviceSettingInit(settingJson) {
      if (settingJson.length > 0) {
        this.lampSkillSet.splice()
        this.lampSkillSet = settingJson
        let timingArr = settingJson.filter(_ => _.code === 'timingMode')
        let isTimingSupport = timingArr.length > 0
        this.timingMode = timingArr[0].defaultValue
        if (isTimingSupport) {
          this.TabBarItems.push({
            code: 'timing',
            type: 'trigger',
            srcImg: '',
            text: '定时',
            isTiming: true,
            order: { start: '10:00', end: '12:00' }
          })
        }
      }
    },
    //查询设备详细信息
    queryDeviceInfo() {
      return new Promise((resolve, reject) => {
        nativeService.getDeviceInfo().then(device => {
          resolve(device.result)
        })
      })
    },
    //初始化加载智能灯的默认操作
    async appLampProgramInit() {
      let device = await this.queryDeviceInfo()
      // this.$MID.alert(device)
      let { deviceId } = device
      //扫码测试使用
      if (!deviceId) {
        deviceId = '49187'
        this.deviceId = deviceId
      } else {
        this.deviceId = deviceId
      }
      if (deviceId) {
        nativeService
          .getLampDeviceInfo({
            namespace: 'ApplianceState',
            payload: {
              applianceCode: deviceId
            }
          })
          .then(resp => {
            let { code, msg, data } = resp
            let lampStat = data.applianceList[0]
            // this.$MID.alert(resp)
            let { power, color_red, color_gre, color_blue, brightness, color_temperature } = lampStat.status
            this.isLampOpen = power === 'on' ? true : false
            if (color_red >= 0 && color_gre >= 0 && color_blue >= 0) {
              this.colorRgbSet = Object.assign({}, this.colorRgbSet, {
                r: color_red,
                g: color_gre,
                b: color_blue
              })
            } else {
              this.colorRgbSet = Object.assign({}, this.colorRgbSet, this.lampOpenedColorRgbSet)
            }
            this.setLampSkillParamHandler({
              brightness: brightness || this.lampSkillSet.filter(_ => _.code === 'brightness')[0].defaultValue,
              color_temperature:
                color_temperature || this.lampSkillSet.filter(_ => _.code === 'color_temperature')[0].defaultValue
            })
          })
          .catch(error => {
            this.$MID.alert(error)
          })
      } else {
        this.$MID.toast('没找到设备deviceId，请稍后重试')
      }
    },
    //获取到亮度和色温设置数据
    setLampSkillParamHandler(params) {
      Object.keys(params).map(key => {
        this.lampSkillSet.forEach(set => {
          if (set.code === key && params.hasOwnProperty(key)) {
            if (key === 'brightness') {
              this.$set(set, 'defaultValue', params[key])
            } else if (key === 'color_temperature') {
              this.$set(set, 'defaultValue', params[key])
            }
          }
        })
      })
    },
    //初始化转化成页面显示亮度值
    colorTemperatureCalc(num) {
      return num
    },
    //名称+单位
    titleWithUnit(title, unit) {
      return `${title} ${unit}`
    },
    //隐藏取色器卡片
    dofMaskSetHidden() {
      this.isColorPickerShow = false
    },
    //底部选项卡按钮方法
    switchTrigger(event) {
      if (event.item.code === 'power') {
        this.powerSwitchHandler()
      } else if (event.item.code === 'timing') {
        if (this.timingMode === 'accurate') {
          nativeService.goTo('timing-list.js')
        } else if (this.timingMode === 'countdown') {
          nativeService.goTo('timing-countdown.js')
        }
      }
    },
    //开关机按钮
    powerSwitchHandler() {
      if (this.isLampOpen === false) {
        //关灯后取色器选项卡折叠
        this.isColorPickerShow = false
      }
      this.deviceControlRequst({
        payload: {
          applianceCode: this.deviceId,
          control: {
            power: this.isLampOpen === true ? 'off' : 'on'
          }
        }
      })
    },
    //设备控制请求方法封装
    deviceControlRequst(param = {}) {
      param = Object.assign(
        {},
        {
          namespace: 'ApplianceControl',
          payload: {
            applianceCode: this.deviceId,
            control: {
              power: 'on'
            }
          }
        },
        param
      )
      nativeService.getLampDeviceInfo(param).then(resp => {
        // this.$MID.alert(resp)
        let { code, msg, data } = resp
        if (code === 0 && msg === 'success') {
          try {
            let lampStat = data
            let { power, color_red, color_gre, color_blue, brightness, color_temperature } = lampStat.status
            this.isLampOpen = true
            if (power === 'off') {
              // this.$MID.toast('关机')
              this.isLampOpen = false
            } else if (power === 'on') {
              // this.$MID.toast('开机')
              this.isLampOpen = true
            }
            //成功返回后修改页面的亮度和色温
            this.lampSkillSet.forEach(set => {
              if (set.code === 'brightness') {
                // this.$MID.alert('显示亮度：' + brightness)
                if (brightness) {
                  this.$set(set, 'defaultValue', brightness)
                }
              } else if (set.code === 'color_temperature') {
                this.$set(set, 'defaultValue', color_temperature)
              }
            })
          } catch (error) {
            this.$MID.toast('插件服务异常')
          }
        } else {
          this.$MID.toast('控制失败' + msg)
        }
      })
    },
    //颜色选项面板折叠状态
    colorPanelFoldTrigger(param) {
      this.isColorPickerShow = !param.value
    },
    //取色器选中值
    colorSelectedTrigger(event) {
      this.colorRgbSet = Object.assign({}, this.colorRgbSet, { ...event })
      // this.$MID.toast(JSON.stringify(this.colorRgbSet))
      this.deviceControlRequst({
        payload: {
          applianceCode: this.deviceId,
          control: Object.assign(
            {},
            {
              color_red: this.colorRgbSet.r,
              color_gre: this.colorRgbSet.g,
              color_blue: this.colorRgbSet.b
            }
          )
        }
      })
    },
    //rgb色值计算
    generateColorVal({ r, g, b, a }) {
      if (a) {
        return `rgb(${r},${g},${b}, ${a})`
      } else {
        return `rgb(${r},${g},${b})`
      }
    },
    //可拖拽手柄触发方法
    slideBarHandler(event) {
      this.regulateTigger(event)
    },
    regulateTigger(event) {
      if (event.type === 'brightness' || event.type === 'color_temperature') {
        this.lampSkillSet.forEach(item => {
          if (item.code === event.type) {
            if (item.code === 'brightness') {
              //发送改变亮度的请求
              this.deviceControlRequst({
                payload: {
                  applianceCode: this.deviceId,
                  control: Object.assign(
                    {},
                    {
                      brightness: event.value
                    }
                  )
                }
              })
            } else if (item.code === 'color_temperature') {
              //发送改变色温的请求

              this.deviceControlRequst({
                payload: {
                  applianceCode: this.deviceId,
                  control: Object.assign(
                    {},
                    {
                      color_temperature: event.value
                    }
                  )
                }
              })
            }
          }
        })
        if (event.type === 'color_temperature') {
          let currentSet = this.lampSkillSet.filter(item => item.code === 'color_temperature')[0]
          let { defaultValue, min, max, step } = currentSet
          let index = this.arithmeticScaleTemperatureCalc(defaultValue)
          this.colorRgbSet = Object.assign({}, this.colorRgbSet, this.colorTemperatureRGBGroup[index])
          // this.$MID.alert(this.colorRgbSet)
        }
      }
    },
    arithmeticScaleCalc([{ dMin, dMax }, { referValue, referMin, referMax }]) {
      let scale = (referValue - referMin) / (referMax - referMin)
      let dValue = (dMax - dMin) * scale + dMin
      return (1 - dValue) * 0.3
    },
    arithmeticScaleTemperatureCalc(value) {
      let min = 0,
        max = 9999
      return value > max ? 9 : value < 3 ? 0 : Math.floor(value / 1000)
    }
  },
  watch: {
    isLampOpen: {
      handler(newValue) {
        let temp_close, temp_open
        if (newValue === true) {
          //处理开灯颜色改变
          if (this.tempColorRgbSet) {
            this.colorRgbSet = Object.assign({}, this.colorRgbSet, this.tempColorRgbSet)
          } else {
            this.colorRgbSet = Object.assign({}, this.colorRgbSet)
          }

          temp_close = this.TabBarItems.shift()
          this.TabBarItems.unshift({
            code: 'power',
            stat: 'on',
            type: 'switch',
            srcImg: './assets/image/light_ic_off@2x.png',
            text: '关机'
          })
        } else if (newValue === false) {
          //临时存放颜色取值组合
          this.tempColorRgbSet = Object.assign({}, this.colorRgbSet)
          this.colorRgbSet = Object.assign({}, this.colorRgbSet, this.lampClosedcolorRgbSet)
          temp_close = this.TabBarItems.shift()
          this.TabBarItems.unshift({
            code: 'power',
            stat: 'off',
            type: 'switch',
            srcImg: './assets/image/light_ic_on@2x.png',
            text: '开机'
          })
        }
      }
    },
    colorRgbSet: {
      handler(newValue) {
        // this.$MID.alert(newValue)
      }
    },
    lampSkillSet: {
      handler(newValue, oldValue) {
        // this.$MID.alert(newValue)
      },
      deep: true
    }
  }
}
</script>

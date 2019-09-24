<template>
  <div class="plugin-wrapper">
    <dof-minibar
      :title="deviceName"
      :left-button="leftButton"
      backgroundColor="#ffffff"
      textColor="#404040"
      rightText="print"
      @dofMinibarRightButtonClicked="getCacheValue"
    >
    </dof-minibar>
    <div class="space-line" :style="{ marginBottom: '20px' }"></div>

    <div class="container">
      <scroller class="content">
        <dof-cell2
          title="开关灯"
          :rightText="powerComp"
          :hasTopBorder="false"
          :hasBottomBorder="false"
          :hasArrow="true"
          :clickActivied="true"
          @dofCellClick="powerStatSet()"
        >
        </dof-cell2>
        <dof-cell2
          title="时间"
          :rightText="timeComp"
          :hasTopBorder="false"
          :hasBottomBorder="false"
          :hasArrow="true"
          :clickActivied="true"
          @dofCellClick="timingSet()"
        >
        </dof-cell2>
        <m-time-picker
          :repeatType="repeatDefaultType"
          :selectedDays="selectedDays"
          @onRepeatSelect="repeatSelect"
          @onDayChange="onDayChange"
        ></m-time-picker>
      </scroller>
    </div>
    <timing-add-bar :settingData="bottomBar" @skipPage="skipHandler"></timing-add-bar>
  </div>
</template>

<script>
import { DofMinibar, DofCell2, DofButton } from '@midea/dolphin-weex-ui'
import TimingAddBar from '../../component/timing-add-bar'
import MTimePicker from '../../component/m-time-picker'
import nativeService from 'src/service/nativeService'
import Util from 'src/util/util'

const picker = weex.requireModule('picker')
const Timing = new BroadcastChannel('Order')

import { queryLampDeviceInfo } from '../../api/lamp-device-control'
export default {
  components: {
    DofMinibar,
    DofCell2,
    DofButton,
    TimingAddBar,
    MTimePicker
  },
  data: () => ({
    leftButton: './assets/image/header/public_back_black.png',
    rightButton: './assets/image/header/ic_more@2x.png',
    deviceName: '添加定时',
    bottomBar: [
      {
        type: 'delete',
        name: '删除'
      },
      {
        type: 'save',
        name: '保存'
      }
    ],
    currentIndex: 0,
    timingItem: {},
    repeatDefaultType: '1',
    selectedDays: '0111000',
    selectedType: '2',

    selectedDay: '1111000'.split(''),
    timeStartValue: '',
    timeEndValue: ''
  }),
  computed: {
    powerComp() {
      return this.timingItem.code === 1 ? '开灯' : '关灯'
    },
    timeComp() {
      if (this.timingItem.code === 1) {
        return this.timingItem.startTime ? this.timingItem.startTime : '未设置'
      } else if (this.timingItem.code === 2) {
        return this.timingItem.endTime ? this.timingItem.endTime : '未设置'
      } else {
        return null
      }
    }
  },
  mounted() {
    nativeService.getItem('timging-task-item', res => {
      this.currentIndex = JSON.parse(res.data).index
      this.timingItem = JSON.parse(res.data).item
      this.timeRepeat(this.timingItem.repeatMode)
    })
  },
  methods: {
    initDeviceData(repeatMode) {
      // queryLampDeviceInfo().then(res => {
      //   this.$MID.alert(res)
      // })
    },

    setStartTimeHandler() {
      picker.pick({
        // value: this.time,
        title: '选择时间', //取消和确定中间那标题
        cancelTxt: '取消', //取消按钮文字
        confirmTxt: '确定', //确定按钮文字,
        cancelTxtColor: '#020F13', //取消颜色
        confirmTxtColor: '#020F13', //标题颜色
        titleColor: '#020F13', //标题颜色
        titleBgColor: '#E7EDEF' //标题栏颜色
      })
    },
    powerStatSet() {
      const items = ['开灯', '关灯']
      var that = this
      var pickItem = [
        {
          index: that.powerIndex,
          item: items,
          label: ''
        }
      ]
      picker.pick(
        {
          items: pickItem,
          title: '选择开关状态', //取消和确定中间那标题
          cancelTxt: '取消', //取消按钮文字
          confirmTxt: '确定', //确定按钮文字,
          cancelTxtColor: '#666666', //取消颜色
          confirmTxtColor: '#000000', //标题颜色
          titleColor: '#000000', //标题颜色
          titleBgColor: '#E7EDEF' //标题栏颜色
        },
        event => {
          if (event.result == 'success') {
            let power = JSON.parse(event.data)[0]
            nativeService.alert(power)
            if (power == 0) {
              this.$set(this.timingItem, 'code', 1)
            } else if (power == 1) {
              this.$set(this.timingItem, 'code', 2)
            }
            // var dataArr = event.data
            //   .replace('[', '')
            //   .replace(']', '')
            //   .split(',')
            // that.powerIndex = dataArr[0]
            // that.powerStat = items[dataArr[0]]
          }
        }
      )
    },
    timingSet(time) {
      picker.pickTime(
        {
          value: time
        },
        event => {
          if (event.result === 'success') {
            if (this.timingItem.code === 1) {
              if (this.timingItem.hasOwnProperty('endTime')) delete this.timingItem['endTime']
              this.$set(this.timingItem, 'startTime', event.data)
            } else if (this.timingItem.code === 2) {
              if (this.timingItem.hasOwnProperty('startTime')) delete this.timingItem['startTime']
              this.$set(this.timingItem, 'endTime', event.data)
            }
          }
        }
      )
    },
    skipHandler(type) {
      if (type === 'save') {
        this.setCacheValue({ type: 'save' })
      } else if (type === 'delete') {
        this.setCacheValue({ type: 'delete' })
      }
    },
    setCacheValue(param = {}) {
      let item = Object.assign({}, this.timingItem)
      let index = this.currentIndex
      nativeService.setItem('timging-task-item', { item, ...param, index }, () => {
        try {
          this.$MID.alert(index)

          Timing.postMessage({ item: this.timingItem, index: this.currentIndex, ...param })
          // this.$MID.route.pop()
          nativeService.goBack()
        } catch (error) {
          let text = JSON.stringify(error)
          this.$MID.alert(`error:${text}`, 1)
        }
      })
    },
    getCacheValue() {
      nativeService.alert(this.timingItem)
      nativeService.getItem('timging-task-item', res => {
        // this.$MID.alert(res)
      })
      // this.print()
    },
    repeatSelect(event) {
      this.selectedType = event.value
      nativeService.toast(`selected${this.selectedType}`)
    },
    onDayChange(event) {
      this.selectedDay = event.value
      nativeService.toast(event.value)
    },
    //数据算法处理
    timeRepeat(mode) {
      let binMode = Util.deciToBin(mode)
      let binWeekArr = this.transferNumToWeek(binMode)
      this.selectedDays = this.timingItem.repeatMode
      this.repeatDefaultType = '4'
      // this.$MID.alert(binWeekArr)
      // this.$MID.alert(this.repeatDefaultType)
    },
    transferNumToWeek(binNum) {
      binNum = binNum + ''
      let wLen = 7
      let arr = binNum.split('')
      let index = arr.length
      for (let i = index; i < wLen; i++) {
        arr.unshift(0)
      }
      return arr
    },
    print() {
      this.selectedDays = '1111111'
      this.repeatDefaultType = '4'
    }
  }
}
</script>

<style scoped>
.plugin-wrapper {
  width: 750px;
  background-color: #f9f9f9;
}
.container {
  flex: 1;
}
.content {
  padding-bottom: 196px;
}
</style>

<template>
  <div class="plugin-wrapper">
    <dof-minibar
      :title="deviceName"
      :left-button="leftButton"
      backgroundColor="#ffffff"
      textColor="#404040"
      rightText="删除"
      @dofMinibarRightButtonClicked="deleteTimingHandler"
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
      </scroller>
    </div>
    <timing-add-bar :settingData="bottomBar" @skipPage="skipHandler"></timing-add-bar>
  </div>
</template>

<script>
import { DofMinibar, DofCell2, DofButton } from '@midea/dolphin-weex-ui'
import TimingAddBar from '../../component/timing-add-bar'
import nativeService from 'src/service/nativeService'
import Util from 'src/util/util'

const picker = weex.requireModule('picker')
const Timing = new BroadcastChannel('Order')

import { queryLampDeviceInfo } from '../../api/lamp-device-control'
export default {
  components: {
    DofMinibar,
    DofCell2,
    TimingAddBar
  },
  data: () => ({
    leftButton: './assets/image/header/public_back_black.png',
    rightButton: './assets/image/header/ic_more@2x.png',
    deviceName: '添加定时',
    powerIndex: 0,
    powerStat: '',
    bottomBar: [
      {
        type: 'cancel',
        name: '取消'
      },
      {
        type: 'save',
        name: '保存'
      }
    ],
    currentIndex: 0,
    timingItem: {
      code: 1,
      type: 'point',
      startTime: '08:00',
      active: true
    },

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
      } else if (this.timingItem.code === 0) {
        return this.timingItem.endTime ? this.timingItem.endTime : '未设置'
      } else {
        return null
      }
    }
  },
  created() {
    nativeService.getItem('timging-task-item', res => {
      // this.$MID.alert(res)
    })
    this.initDeviceData()
  },
  methods: {
    initDeviceData() {
      queryLampDeviceInfo().then(res => {
        // this.$MID.alert(res)
      })
    },
    powerStatSet() {
      this.$MID.toast('hello')

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
          nativeService.toast(event.result)
          if (event.result == 'success') {
            let power = JSON.parse(event.data)[0]
            // nativeService.alert(power)
            if (power == 0) {
              //关灯
              this.$set(this.timingItem, 'code', 1)
            } else if (power == 1) {
              //开灯
              this.$set(this.timingItem, 'code', 0)
            }
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
            //设置成功
            if (this.timingItem.code === 1) {
              if (this.timingItem.hasOwnProperty('endTime')) delete this.timingItem['endTime']
              this.$set(this.timingItem, 'startTime', event.data)
            } else if (this.timingItem.code === 0) {
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
      } else if (type === 'cancel') {
        this.setCacheValue({ type: 'cancel' })
      }
    },
    deleteTimingHandler() {
      // this.$MID.alert('确定删除定时吗？')
      nativeService.confirm('确定删除定时吗？')
    },
    setCacheValue(param = {}) {},
    getCacheValue() {}
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

<template>
  <div class="plugin-wrapper">
    <div class="container">
      <dof-minibar
        :title="deviceName"
        :left-button="leftButton"
        backgroundColor="#ffffff"
        textColor="#404040"
        @dofMinibarLeftButtonClicked="minibarLeftButtonClick"
      >
        <!-- <div slot="right" class="right-img-wrapper">
          <image :src="rightButton" style="height: 9px;width: 40px;"></image>
        </div> -->
      </dof-minibar>
      <div class="space-line" :style="{ marginBottom: '20px' }"></div>
      <div class="container">
        <scroller class="content" v-if="timingTaskGroup.length > 0">
          <dof-cell2
            v-for="(item, $index) in timingTaskGroup"
            :key="$index"
            :title="timeCalc(item)"
            :desc="descriptionCalc(item)"
            :hasArrow="false"
            :hasTopBorder="false"
            :hasBottomBorder="false"
            :clickActivied="true"
            @dofCellClick="itemClicked(item, $index)"
          >
            <dof-switch
              :ref="`switch${$index}`"
              :checked="item.active"
              class="value"
              slot="switch"
              @change.stop="ondofchange"
            >
            </dof-switch>
          </dof-cell2>
        </scroller>
        <scroller class="content" v-if="timingTaskGroup.length === 0">
          <div class="no-data">
            <text class="no-data-text">您还没有添加定时</text>
          </div>
        </scroller>
        <timing-list-bar @addItem="addNewTimingItem"></timing-list-bar>
      </div>
    </div>
  </div>
</template>

<script>
import DofMinibar from '../../component/dof-minibar'
import TimingListBar from '../../component/timing-list-bar'
import { DofCell2, DofSwitch } from '@midea/dolphin-weex-ui'
import nativeService from '../../api/lamp-device-control'
const storage = weex.requireModule('storage')
const Timing = new BroadcastChannel('Order')
export default {
  components: {
    DofMinibar,
    TimingListBar,
    DofCell2,
    DofSwitch
  },
  data: () => ({
    leftButton: './assets/image/header/public_back_black.png',
    rightButton: './assets/image/header/ic_more@2x.png',
    deviceName: '定时',
    timingTaskGroup: [
      {
        code: 0,
        type: 'period',
        startTime: '18:00',
        endTime: '22:00',
        active: true,
        repeatMode: 1 //周一 0000001
      },
      {
        code: 1,
        type: 'point',
        startTime: '19:00',
        active: false,
        repeatMode: 127 //周一～周日 1111111
      },
      {
        code: 2,
        type: 'point',
        endTime: '20:00',
        active: true,
        repeatMode: 96 //周末 1100000
      }
    ]
  }),
  computed: {},
  created() {
    Timing.onmessage = event => {
      let { item, index, type } = event.data
      this.$MID.alert(event.data)
      if (type === 'delete') {
        //删除该条数据
        this.timingTaskGroup.splice(index, 1)
      } else if (type === 'save') {
        //修改该条数据
        Object.keys(item).forEach(key => {
          this.$set(this.timingTaskGroup[index], key, item[key])
        })
      }
    }
    this.initTimingPage()
  },
  mounted() {
    // this.$refs['switch'].switchValue(this.dofChecked)
    // this.$refs['switchA'].switchValue(this.dofCheckedA)
    // this.$refs['switchB'].switchValue(this.dofCheckedB.isChecked)
  },
  methods: {
    initTimingPage() {
      this.appTimingInit()
      // nativeService.getItem('timging-task-item', res => {
      //   this.$MID.alert(res)
      //   this.$MID.alert(this.currentIndex)
      // })
    },
    //查询设备信息
    queryDeviceInfo() {
      return new Promise((resolve, reject) => {
        nativeService.getDeviceInfo().then(device => {
          resolve(device.result)
        })
      })
    },
    async appTimingInit() {
      let device = await this.queryDeviceInfo()
      this.$MID.alert(device)
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
            //wwwwwww_hh_mm_ss_x_r
            //每天执行08:45开灯：激活
            //每天执行18:10开灯：激活
            let {
              return_set_loop_time = [
                '1111111_08_45_1_1',
                '1111111_08_45_1_1',
                '1100000_09_10_1_0',
                '1100000_23_59_1_0'
              ]
            } = lampStat.status

            this.$MID.alert(return_set_loop_time)
          })
      }
    },
    addTimingButtonClick() {
      nativeService
        .getDeviceInfo()
        .then(data => {
          let str = JSON.stringify(data)
          // this.$MID.toast('hello')
          this.$MID.alert(str)
        })
        .catch(error => {
          nativeService.toast(error)
        })
    },
    addNewTimingItem() {
      // this.$MID.alert('添加新的定时任务')
      this.timingTaskGroup.push({
        code: 0,
        type: 'period',
        startTime: '06:00',
        endTime: '20:00',
        active: true,
        repeatMode: 127
      })
    },
    timeCalc(item) {
      return item.type === 'period'
        ? `${item.startTime}-${item.endTime}`
        : item.code === 1
        ? item.startTime
        : item.endTime
    },
    descriptionCalc(item) {
      return item.type === 'period' ? `开灯时段 | ${item.repeatMode}` : `开灯 | ${item.repeatMode}`
    },
    itemClicked(item, index) {
      nativeService.setItem('timging-task-item', { item, index }, () => {
        nativeService.goTo('timing-add.js')
      })
    }
  }
}
</script>

<style scoped>
.plugin-wrapper {
  width: 750px;
  /* border-width: 6px;
  border-color: red; */
  /* background-color: #d0e9ff;
  background-color: #fff1cb; */
  background-color: #f0f0f0;
}
.container {
  flex: 1;
}
.content {
  padding-bottom: 196px;
}
.no-data {
  justify-content: center;
  align-items: center;
  margin-top: 220px;
}
.no-data-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #c7c7cc;
  letter-spacing: 0;
  line-height: 28px;
}
</style>

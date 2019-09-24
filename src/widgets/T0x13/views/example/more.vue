<template>
  <div class="plugin-wrapper">
    <dof-minibar
      :title="deviceName"
      :left-button="leftButton"
      backgroundColor="#ffffff"
      textColor="#000000"
      @dofMinibarLeftButtonClicked="minibarLeftButtonClick"
      @dofMinibarRightButtonClicked="minibarRightButtonClick"
    >
      <!-- <div slot="right" class="right-img-wrapper">
          <image :src="rightButton" style="height: 9px;width: 40px;"></image>
        </div> -->
    </dof-minibar>
    <div class="space-line" :style="{ marginBottom: '20px' }"></div>

    <div class="container">
      <scroller class="content">
        <dof-cell2
          title="华为智能灯"
          desc="4205的家 | 卧室"
          :hasArrow="true"
          :hasBottomBorder="false"
          :hasTopBorder="false"
          :clickActivied="true"
          itemImg="/assets/image/smartHome.png"
          @dofCellClick="itemClicked"
        >
        </dof-cell2>
        <div class="space-line" :style="{ marginBottom: '20px' }"></div>
        <dof-cell2
          title="产品信息"
          :hasTopBorder="false"
          :hasBottomBorder="false"
          :hasArrow="true"
          :clickActivied="true"
          @dofCellClick="itemClicked"
        >
        </dof-cell2>
        <dof-cell2
          title="插件版本"
          rightText="v1.45"
          :hasTopBorder="false"
          :hasBottomBorder="false"
          :hasArrow="true"
          :clickActivied="true"
          @dofCellClick="itemClicked"
        >
        </dof-cell2>
        <div class="space-line" :style="{ marginBottom: '20px' }"></div>

        <dof-cell2
          title="电子说明书"
          :hasTopBorder="false"
          :hasBottomBorder="false"
          :hasArrow="true"
          :clickActivied="true"
          @dofCellClick="skipSpecficationPage"
        >
        </dof-cell2>
        <div class="delete-button">
          <dof-button
            type="white"
            text="删除设备"
            :btnStyle="{ width: '750px', backgroundColor: '#ffffff', borderRadius: '1px', borderColor: '#ffffff' }"
            :textStyle="{ color: '#fe7a61' }"
            @dofButtonClicked="deleteDeviceClicked"
          ></dof-button>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import { DofCell2, DofButton } from '@midea/dolphin-weex-ui'
import DofMinibar from '../../component/dof-minibar'
import nativeService from 'src/service/nativeService'

export default {
  components: {
    DofMinibar,
    DofCell2,
    DofButton
  },
  data: () => ({
    leftButton: './assets/image/header/public_back_black.png',
    rightButton: './assets/image/header/title_more_icon@3x.png',
    deviceName: '更多'
  }),
  computed: {},
  created() {},
  methods: {
    minibarRightButtonClick() {
      this.$MID.toast('编辑定时')
    },
    skipSpecficationPage() {
      nativeService.goTo('specification.js')
    },
    deleteDeviceClicked() {
      this.$MID.alert('要删除设备吗？')
    }
  }
}
</script>

<style scoped>
.plugin-wrapper {
  width: 750px;
  /* border-width: 6px; */
  /* border-color: red; */
  /* background-color: #d0e9ff; */
  /* background-color: #fff1cb; */
  background-color: #f0f0f0;
}
.container {
  flex: 1;
}
.delete-button {
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}
.bottom-button {
  width: 750px;
  position: absolute;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
}
</style>

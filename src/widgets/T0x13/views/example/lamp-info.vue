<template>
  <div class="plugin-wrapper">
    <dof-minibar
      :title="deviceName"
      :left-button="leftButton"
      backgroundColor="transparent"
      textColor="#404040"
      @dofMinibarLeftButtonClicked="minibarLeftButtonClick"
      @dofMinibarRightButtonClicked="minibarRightButtonClick"
    >
      <!-- <div slot="right" class="right-img-wrapper">
          <image :src="rightButton" style="height: 9px;width: 40px;"></image>
        </div> -->
    </dof-minibar>
    <div class="container">
      <dof-button text="查看详情页" type="primary" size="big" @dofButtonClicked="buttonClick"></dof-button>
      <scroller class="content">
        <text class="display-block">{{ result ? '返回类型:' + typeof result : '' }}</text>
        <text class="display-block">{{ result }}</text>
      </scroller>
    </div>
  </div>
</template>

<script>
import DofMinibar from '../../component/dof-minibar'
import { DofButton } from '@midea/dolphin-weex-ui'
const modal = weex.requireModule('modal')
import nativeService from 'src/service/nativeService'
const appPageDataChannel = new BroadcastChannel('appPageData')

export default {
  components: {
    DofMinibar,
    DofButton
  },
  data: () => ({
    leftButton: '/assets/image/header/public_back_black.png',
    rightButton: '/assets/image/header/title_more_icon@3x.png',
    deviceName: '产品信息',
    message: '123456789',
    result: ''
  }),
  computed: {},
  created() {
    appPageDataChannel.onmessage = event => {
      nativeService.toast(event.data)
      this.result = event.data
    }
  },
  methods: {
    minibarRightButtonClick() {
      // this.$MID.alert('确定提交设置吗？')
    },
    buttonClick() {
      nativeService.goTo('lamp-detail.js')
    }
  }
}
</script>

<style scoped>
.plugin-wrapper {
  width: 750px;
  background-color: #fff1cb;
}
.container {
  flex: 1;
}
.content {
  padding-bottom: 196px;
  align-items: center;
  justify-content: center;
}
</style>

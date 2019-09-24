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
      <scroller class="content">
        <dof-button text="发送数据" type="primary" size="big" @dofButtonClicked="buttonClick"></dof-button>
        <textarea type="text" placeholder="Input Text" class="textarea" v-model="message" rows="3" />
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
    deviceName: '华为智能灯',
    message: 'hello',
    result: ''
  }),
  computed: {},
  created() {},
  methods: {
    minibarRightButtonClick() {
      // this.$MID.alert('确定提交设置吗？')
    },
    buttonClick() {
      console.log(appPageDataChannel.__proto__)
      this.$MID.alert(appPageDataChannel.__proto__)
      appPageDataChannel.postMessage({ data: this.message })
      nativeService.goBack()
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

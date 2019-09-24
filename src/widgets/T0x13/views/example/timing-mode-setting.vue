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
        重复
      </scroller>
      <div class="bottom-button">
        确定
      </div>
    </div>
  </div>
</template>

<script>
import DofMinibar from '../../component/dof-minibar'
const modal = weex.requireModule('modal')

export default {
  components: {
    DofMinibar
  },
  data: () => ({
    leftButton: './assets/image/header/public_back_white.png',
    rightButton: './assets/image/header/ic_more@2x.png',
    deviceName: '重复模式'
  }),
  computed: {},
  created() {},
  methods: {
    minibarRightButtonClick() {
      // this.$MID.alert('确定提交设置吗？')
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
}
</style>

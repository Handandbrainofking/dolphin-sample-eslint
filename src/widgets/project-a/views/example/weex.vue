<template>
  <div class="wrapper">
    <div class="bg-container">
      <image class="bg-img" resize="stretch" :src="bgUrl"></image>
    </div>
    <dof-minibar
      :title="title"
      backgroundColor="transparent"
      textColor="#000000"
      @dofMinibarLeftButtonClicked="minibarLeftButtonClick"
      @dofMinibarRightButtonClicked="minibarRightButtonClick"
    >
    </dof-minibar>
    <div class="remark">
      <text class="title">{{ name }}</text>
    </div>
    <div class="footer">
      <text class="copyright">@Midea IOT software</text>
    </div>
  </div>
</template>

<script>
import { DofMinibar, DofCell2, DofButton } from '@midea/dolphin-weex-ui'

export default {
  components: {
    DofMinibar
  },
  data: () => ({
    title: 'Demo',
    name: 'dolphin weex ui 示例项目 + 基础架构',
    bgUrl: './assets/image/computer.jpg'
  })
}
</script>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
.bg-container {
  width: 750px;
  height: 1000px;
  position: absolute;
}
.bg-img {
  width: 750px;
  height: 1300px;
}
.remark {
  position: absolute;
  top: 300px;
  width: 750px;
  align-items: center;
}
.title {
  color: #0092d7;
  font-size: 36px;
  font-weight: 900;
}
.footer {
  position: absolute;
  bottom: 0px;
  width: 750px;
  height: 100px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
}
.copyright {
  font-size: 20px;
  color: #464c5b;
}
.margin-top-40 {
  margin-top: 40px;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
</style>

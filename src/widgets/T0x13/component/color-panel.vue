<template>
  <div class="wrapper">
    <div class="color-container">
      <div class="img-box" :style="{ backgroundColor: iconColor }">
        <image class="icon-img" src="./assets/image/light_ic_color@2x.png"></image>
      </div>
      <div class="text-box">
        <text class="title">颜色</text>
      </div>
    </div>
    <div class="arrow" @click.stop="foldTrigger">
      <image class="arrow-img" :src="showRightIcon"></image>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: '#ff8225'
    },
    isFold: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    title: 'name'
  }),
  computed: {
    showRightIcon() {
      return this.isFold ? './assets/image/service_ic_hide@3x.png' : './assets/image/service_ic_show@3x.png'
    }
  },
  methods: {
    foldTrigger() {
      this.isFold = !this.isFold
      //折叠取色盘
      this.$emit('colorPickerFold', {
        value: this.isFold
      })
    }
  },
  watch: {
    isFold(value) {
      // this.$MID.alert(value)
    }
  }
}
</script>
<style scoped>
.wrapper {
  width: 686px;
  height: 112px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  padding-left: 32px;
  padding-right: 32px;
}
.color-container {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.img-box {
  width: 48px;
  height: 48px;
  border-radius: 24px;
}
.icon-img {
  width: 48px;
  height: 48px;
}
.text-box {
  padding-left: 16px;
}
.title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  line-height: 32px;
}
.arrow {
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
}
.arrow-img {
  width: 40px;
  height: 40px;
}
</style>

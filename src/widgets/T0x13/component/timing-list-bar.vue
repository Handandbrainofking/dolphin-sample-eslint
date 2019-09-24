<template>
  <div :class="['wrapper', hasTopBorder && 'top-border']">
    <div class="top">
      <div class="item">
        <text class="item-text" @click="buttonClickHandler()">{{ '添加定时' }}</text>
      </div>
    </div>
    <div class="line-wrapper">
      <div class="line"></div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  width: 750px;
  height: 196px;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  bottom: -2px;
  left: 0;
  right: 0;
}
.top-border {
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: #e5e5e8;
}
.top {
  flex-direction: row;
  justify-content: space-between;
}
.item {
  flex: 1;
  height: 128px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item-text {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #267aff;
  letter-spacing: 0;
  line-height: 32px;
}
.line-wrapper {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.line {
  width: 268px;
  height: 10px;
  background-color: #000000;
  opacity: 0.1;
  border-radius: 5px;
  margin-top: 42px;
}
</style>
<script>
export default {
  props: {
    hasTopBorder: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    buttonClickHandler() {
      this.$emit('addItem', {
        hello: 'hello'
      })
    }
  }
}
</script>

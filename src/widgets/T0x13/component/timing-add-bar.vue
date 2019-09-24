<template>
  <div :class="['wrapper', hasTopBorder && 'top-border']">
    <div class="top">
      <div class="item" v-for="(item, $index) in settingData" :key="$index">
        <div class="text-box" @click="clickHandler(item.type)">
          <text class="item-text delete-text">{{ item.name }}</text>
        </div>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.text-box {
  padding: 20px;
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
.delete-text {
  color: #eb6560;
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
    settingData: {
      type: Array,
      default: () => []
    },
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
    },
    clickHandler(type) {
      this.$emit('skipPage', type)
    }
  }
}
</script>

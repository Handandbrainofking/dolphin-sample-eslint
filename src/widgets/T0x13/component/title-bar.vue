<template>
  <div>
    <div
      :style="{ backgroundColor: bgColor }"
      class="title-bar"
      :class="[hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border']"
    >
      <text :style="{ fontSize: fontSize + 'px' }" class="title-text">{{ title }}</text>
    </div>
  </div>
</template>
<style scoped>
.title-bar {
  padding-top: 40px;
  padding-bottom: 24px;
  padding-left: 24px;
  background-color: #f9f9f9;
}
.title-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #8a8a8f;
  letter-spacing: 0;
  line-height: 28px;
}
.cell-top-border {
  border-top-color: #e2e2e2;
  border-top-width: 1px;
}
.cell-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
</style>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#F7F7F7'
    },
    fontSize: {
      type: String,
      default: '24'
    },
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

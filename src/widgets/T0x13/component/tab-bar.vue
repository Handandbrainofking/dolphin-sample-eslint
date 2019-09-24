<template>
  <div :class="['wrapper', hasTopBorder && 'top-border']">
    <div class="top">
      <div class="item" v-for="(item, index) in data" :key="index" @click="buttonClickHandler(item, index)">
        <div
          class="top-img"
          :class="[item.stat === 'on' ? 'power-on' : item.code === 'power' ? 'power-off' : 'timing-default']"
        >
          <image class="item-image" :src="item.srcImg" v-if="item.srcImg && !item.order" />
        </div>
        <div
          class="order-timing"
          :style="{ backgroundColor: item.isTiming ? iconColor : '#f2f2f2' }"
          v-if="status === true && item.order"
        >
          <text class="order-text end-time" v-if="item.isTiming">已设置</text>
          <image class="item-image" :src="alarmImg" v-if="!item.isTiming"></image>
        </div>
        <div
          class="order-timing"
          :style="{ backgroundColor: item.isTiming ? '#7c879b' : '#f2f2f2' }"
          v-if="status === false && item.order"
        >
          <text class="order-text end-time" v-if="item.isTiming">已设置</text>
          <image class="item-image" :src="alarmImg" v-if="!item.isTiming"></image>
        </div>
        <text class="item-text">{{ item.text }}</text>
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
  height: 236px;
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
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item-image {
  width: 96px;
  height: 96px;
}
.item-text {
  font-size: 24px;
  color: #232323;
  margin-top: 16px;
}
.top-img {
  border-radius: 50%;
}
.power-on {
  background-color: #f2f2f2;
}
.power-off {
  background-color: #7c879b;
}
.timing-default {
  border: 1px;
}
.order-timing {
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: #ff8225;
  justify-content: center;
  align-items: center;
}
.order-text {
  font-family: PingFangSC-Medium;
  font-size: 22px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 20px;
}
.active {
  color: ;
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
  margin-top: 30px;
}
</style>
<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: '#ff8225'
    },
    status: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => [{ imgSrc: '', text: '' }]
    },
    hasTopBorder: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    alarmImg: './assets/image/light_ic_book@2x.png'
  }),
  created() {
    // this.$MID.alert(this.data)
  },
  computed: {},
  methods: {
    buttonClickHandler(item, index) {
      this.$emit('buttonClickHandler', {
        item,
        index
      })
    }
  },
  watch: {
    status(newVal) {
      // this.$MID.alert(newVal)
    }
  }
}
</script>

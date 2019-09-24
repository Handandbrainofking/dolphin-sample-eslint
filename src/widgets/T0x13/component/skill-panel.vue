<template>
  <div class="wrapper">
    <div class="container">
      <div class="top">
        <div class="img-box" :style="{ backgroundColor: iconColor }">
          <image class="icon-img" :src="iconUrl" v-if="iconUrl"></image>
        </div>
        <div class="text-box">
          <text class="title">{{ title }}</text>
        </div>
        <div class="number-tip" :style="{ borderColor: iconColor }">
          <text class="number-text" :style="{ color: iconColor }">{{ numberTextComp }}</text>
        </div>
      </div>
      <div class="main">
        <div class="plugin slider-sample-fix">
          <midea-seek-bar
            class="slider-fix-area"
            @slideEnd="slideEnd"
            @slideChange="slideChange"
            :max="max"
            :min="min"
            :value="value"
            :step="step"
            :axisH="axisH"
            :pointH="pointH"
            :axisColor="axisColor"
            :axisBgColor="axisBgColor"
            :pointColor="pointColor"
            showTip="false"
            :sliderImage="sliderImageBase64"
          ></midea-seek-bar>
        </div>
        <div class="scale-text-box">
          <text class="scale-text">{{ minCalcComp }}</text>
          <text class="scale-text">{{ maxCalcComp }}</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nativeService from 'src/service/nativeService'

export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      defautl: '技能'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    unit: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    iconColor: {
      type: String,
      default: '#ff8225'
    },
    iconUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      axisH: 3, //轴高度(px)
      pointH: 26, //圆球高度（px）
      axisColor: '#DFE5E7', //滑条颜色
      axisBgColor: '#267aff', //滑条背景颜色
      pointColor: '#267aff', //圆球颜色
      sliderImageBase64:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM1RjM3MjhFQzc3RDExRThCMjcwOTQyNjcxNTJERDEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM1RjM3MjhGQzc3RDExRThCMjcwOTQyNjcxNTJERDEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzVGMzcyOENDNzdEMTFFOEIyNzA5NDI2NzE1MkREMTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzVGMzcyOERDNzdEMTFFOEIyNzA5NDI2NzE1MkREMTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4uKMdnAAAMaUlEQVR42pRbX6il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'
    }
  },
  computed: {
    minCalcComp() {
      return `${this.min} ${this.unit}`
    },
    maxCalcComp() {
      return `${this.max} ${this.unit}`
    },
    numberTextComp() {
      return `${this.value} ${this.unit}`
    }
  },
  methods: {
    slideEnd(event) {
      // this.$MID.toast('slideEnd:' + event.value)
      this.$emit('slideEnd', {
        type: this.type,
        value: event.value
      })
      return false
    },
    slideChange(event) {
      // this.$MID.alert(JSON.stringify(event))
      this.$emit('slideChange', {
        type: this.type,
        value: event.value
      })
    }
  }
}
</script>
<style scoped>
.wrapper {
  width: 686px;
  height: 190px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  padding-left: 32px;
  padding-right: 32px;
}
.container {
  flex: 1;
}
.top {
  flex-direction: row;
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
.slider-sample-fix {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* width: 750px; */
  margin-bottom: 20px;
}
.slider-fix-area {
  flex: 1;
  height: 64px;
}
.number-tip {
  height: 40px;
  border-radius: 20px;
  border-width: 1px;
  padding-left: 22px;
  padding-right: 22px;
  margin-left: 16px;
  justify-content: center;
  align-items: center;
  /* opacity: 0.4; */
}
.number-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  line-height: 28px;
}
.scale-text-box {
  flex-direction: row;
  justify-content: space-between;
}
.scale-text {
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #8a8a8f;
  letter-spacing: 0;
  text-align: right;
  line-height: 20px;
}
</style>

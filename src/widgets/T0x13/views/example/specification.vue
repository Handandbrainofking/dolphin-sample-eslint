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
        <div class="picker-box">
          <pick-pallet
            titleName="原生组件"
            @changeColor="colorPickerChange"
            :style="{ height: '375px', width: '375px' }"
          ></pick-pallet>
        </div>
        <div class="color-test">
          <div
            class="color-box"
            v-for="(item, $index) in colorGroup"
            :key="$index"
            :style="{ backgroundColor: item }"
          ></div>
        </div>
      </scroller>
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
    leftButton: './assets/image/header/public_back_black.png',
    rightButton: './assets/image/header/ic_more@2x.png',
    deviceName: '说明书',
    colorGroup: [
      '#ff8225',
      '#fe8a34',
      '#fd9649',
      '#fca463',
      '#fbb47f',
      '#f9c49c',
      '#f8d3b8',
      '#f7e1d1',
      '#f6ede6',
      '#f5f5f5'
    ],
    colorTemperatureRGBGroup: [
      {
        r: 255,
        g: 130,
        b: 37
      },
      {
        r: 254,
        g: 138,
        b: 52
      },
      {
        r: 253,
        g: 150,
        b: 73
      },
      {
        r: 252,
        g: 164,
        b: 99
      },
      {
        r: 251,
        g: 180,
        b: 127
      },
      {
        r: 249,
        g: 196,
        b: 156
      },
      {
        r: 248,
        g: 211,
        b: 184
      },
      {
        r: 247,
        g: 225,
        b: 209
      },
      {
        r: 246,
        g: 237,
        b: 230
      },
      {
        r: 245,
        g: 245,
        b: 245
      }
    ]
  }),
  computed: {},
  created() {},
  methods: {
    minibarRightButtonClick() {
      // this.$MID.alert('确定提交设置吗？')
    },
    colorPickerChange(event) {
      this.$MID.alert(event)
    }
  }
}
</script>

<style scoped>
.plugin-wrapper {
  width: 750px;
  /* flex-direction: row; */
  /* border-width: 6px; */
  /* border-color: red; */
  /* background-color: #d0e9ff; */
  /* background-color: #fff1cb; */
}
.container {
  flex: 1;
}
.content {
  /* height: 1000px; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 6px;
  border-color: aqua;
}
.picker-box {
  border-width: 1px;
  width: 375px;
  height: 375px;
  justify-content: center;
}
.color-test {
  width: 700px;
  flex-direction: row;
  margin-top: 10px;
}
.color-box {
  width: 70px;
  height: 70px;
  border-width: 1px;
}
</style>

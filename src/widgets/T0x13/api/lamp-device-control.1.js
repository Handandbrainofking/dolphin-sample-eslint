import appConfig from './config'
import nativeService from 'src/service/nativeService.js'
import debugUtil from 'src/util/debugUtil'

const requestSendWithApp = true
const withoutAPPWithMAS = true
const HOST = requestSendWithApp
  ? ''
  : withoutAPPWithMAS
  ? 'http://mp-sit.smartmidea.net/mas/v5/app/proxy?alias='
  : 'https://iot-sit.smartmidea.net:443'

let customizeNativeService = Object.assign(nativeService, {
  isDummy: appConfig.isMock,
  serviceList: {
    delegate: HOST + '/v1/iot/open/skill/delegate' //美居统一接入接口
  },
  testRequest() {
    return new Promise((resolve, reject) => {
      resolve('hahhahah')
    })
  },
  sendRequestWrapper(url, params, options) {
    return new Promise((resolve, reject) => {
      this.getRequestCommonParam()
        .then(commonParam => {
          let requestBody = Object.assign({}, commonParam, params)
          if (requestSendWithApp) {
            let requestOption = Object.assign({ method: 'POST', isShowLoading: true }, options)
            let requestParam = {
              method: requestOption.method,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              data: requestBody
            }
            this.sendCentralCloundRequest(url, requestParam, requestOption)
              .then(resp => {
                if (resp.status || resp.code == 0) {
                  resolve(resp)
                } else {
                  reject(resp)
                }
              })
              .catch(error => {
                reject(error)
              })
          } else {
            let requestOption = Object.assign({ method: 'POST', isShowLoading: true }, options)
            let requestParam = {
              url: url,
              type: 'json',
              method: requestOption.method,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(requestBody)
            }
            this.sendHttpRequest(requestParam, requestOption)
              .then(resp => {
                if (resp.status || resp.code == 0) {
                  resolve(resp)
                } else {
                  reject(resp)
                }
              })
              .catch(error => {
                reject(error)
              })
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getRequestCommonParam() {
    return new Promise((resolve, reject) => {
      this.$MID.alert('hehehehhhehehehhehehh')
      let param = {
        plugin_version: appConfig.plugin_version || '0.0.1',
        stamp: Math.round(new Date().getTime() / 1000), //时间戳
        reqId: this.generateUUID()
      }

      resolve(param)
    })
  },
  getLampDeviceInfo(param = {}, options = {}) {
    // 获取用户设备列表
    let paramWrap = Object.assign(
      {
        namespace: 'ApplianceState'
      },
      param
    )
    return this.sendRequestWrapper(this.serviceList.delegate, paramWrap, options)
  }
})

export function queryLampDeviceInfo(params = { operation: 'luaQuery', name: 'deviceinfo', params: {} }) {
  params = Object.assign({ operation: 'luaQuery', name: 'deviceinfo', params: {} }, params)
  // let paramsStr = JSON.stringify(params)
  // nativeService.alert(paramsStr)
  let result = {
    path: 'luaQuery',
    data: {
      errorCode: 0,
      params: {
        power: 'on',
        mode: 'life',
        // 紫色
        // color_red: 196,
        // color_gre: 0,
        // color_blue: 255,
        //蓝色
        color_red: 39,
        color_gre: 149,
        color_blue: 250,
        //黄色
        // color_red: 255,
        // color_gre: 130,
        // color_blue: 36,
        brightness: '90',
        color_temperature: '3000',
        scene_light: 'life',
        delay_light_off: '30', //0-60分钟
        timerSettingGroup: [
          {
            //定时任务是否激活
            active: true,
            //开机和关机时间
            timer_light_on_off: 0, //开灯时间 0代表00:00:00  86399代表 23:59:59
            //重复模式
            timer_ymdhms_on_off: 1 //  0b01100001表示 星期7 星期6 星期1执行
          },
          {
            active: false,
            timer_light_on_off: 43200, //开灯时间 0代表00:00:00  86399代表 23:59:59
            timer_ymdhms_on_off: 96 //  0b01100001表示 星期7 星期6 星期1执行
          },
          {
            active: true,
            timer_light_on_off: 86399, //开灯时间 0代表00:00:00  86399代表 23:59:59
            timer_ymdhms_on_off: 127 //  0b01100001表示 星期7 星期6 星期1执行
          }
        ]
      }
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(result)
    }, 50)
  })
}

export default customizeNativeService

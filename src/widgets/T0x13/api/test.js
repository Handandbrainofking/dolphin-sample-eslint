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
  testRequest(param) {
    return new Promise((resolve, reject) => {
      resolve('hahhahah')
    })
  },
  common() {
    return new Promise((resolve, reject) => {
      let param = {
        name: 'zoiew',
        address: '广州南沙'
      }
      resolve(param)
    })
  },
  wrapper() {
    return new Promise((resolve, reject) => {
      this.common().then(common => {
        this.testRequest(common).then(res => {
          let flag = Math.random > 0.5 ? true : false
          setTimeout(() => {
            if (flag) {
              resolve({ code: 0, msg: 'success', data: 'goog' })
            } else {
              reject('error')
            }
          }, 2000)
        })
      })
    })
  },
  queryDeviceStat() {
    return new Promise((resolve, reject) => {})
  },
  task3() {
    return new Promise((resolve, reject) => {
      let flag = Math.random() > 0.5
      if (flag) {
        resolve({ code: 0, msg: 'success' })
      } else {
        reject({ code: 1000, msg: 'error' })
      }
    })
  },
  wrappers() {
    return new Promise((resolve, reject) => {
      task3()
        .then(res => {
          if (res.code === 0) {
            resolve('task3 ' + res.msg)
          } else {
            reject('task3 ' + res.msg)
          }
        })
        .catch(error => {
          console.log('task-then-catch 捕捉')
          reject(error)
        })
    })
  }
})

export default customizeNativeService

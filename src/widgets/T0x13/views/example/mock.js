// 参数设置规则说明和示例
/**
 * @type:0:可配置功能；1:必选功能
 */
export const settings = {
  power: [
    {
      stat: true,
      type: 1,
      code: 'switch',
      name: '开关',
      defaultValue: 'off',
      options: [
        {
          code: 'on',
          name: '开机'
        },
        {
          code: 'off',
          name: '关机'
        }
      ]
    }
  ],
  timing: [
    {
      stat: false,
      type: 0,
      code: 'timing',
      name: '定时',
      defaultValue: 0,
      order: {
        start: '15:00',
        end: '18:00'
      }
    }
  ],
  brightness: [
    {
      stat: false,
      type: 0,
      code: 'brightness',
      name: '亮度',
      currentValue: 50,
      defaultValue: 50,
      min: 0,
      max: 100,
      unit: '%',
      scale: {
        start: 0,
        end: 255
      }
    }
  ],
  temperature: [
    {
      stat: false,
      type: 0,
      code: 'temperature',
      name: '色温',
      currentValue: 2500,
      defaultValue: 2000,
      min: 2000,
      max: 6500,
      step: 45,
      unit: 'k',
      scale: {
        start: 0,
        end: 255
      }
    }
  ],
  color: [
    {
      stat: false,
      type: 0,
      code: 'color',
      name: '颜色',
      default: 200,
      scale: {
        start: 0,
        end: 255
      }
    }
  ]
}

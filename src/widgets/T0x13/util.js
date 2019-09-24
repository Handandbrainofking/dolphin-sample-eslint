//初始化转化成页面显示亮度值
function transferBrightnessCalc(num) {
  if (!num) {
    return '缺少参数'
  }
  let min = 1,
    max = 256,
    sum = 0,
    i = 1
  while (sum < num) {
    if (i % 2 === 1) {
      sum = sum + 3
    } else {
      sum = sum + 2
    }
    i++
  }
  return i - 1 > 100 ? 100 : i - 1
}

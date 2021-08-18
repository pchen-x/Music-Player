const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const num2time = n => {
  var t = ""
  var temp = 0
  n = parseInt(n)
  if (n >= 60) {
    temp = parseInt(n / 60)
    n = parseInt(n - temp * 60)
  }

  t = temp + " : " + n  //"{} :{} s".format(temp,n)

  return t
}

module.exports = {
  formatTime: formatTime,
   num2time:num2time
}

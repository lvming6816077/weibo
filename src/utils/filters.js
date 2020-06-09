const numFormat = (value) =>{
  let num;
  if (value > 9999) { // 当数组大余9999时，将显示为x.xx万
    num = Math.floor(value / 1000) / 10 + '万'
  } else {
    num = value
  }

  return num
}

const formatTime = (value) => {
  let date = new Date(value)
  return (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
}

export {
  numFormat,
  formatTime
}
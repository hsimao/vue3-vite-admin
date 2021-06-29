export const hasProperty = (obj, key) => Object.hasOwnProperty.call(obj, key)

export const formatDate = (date, rule) => {
  const newDate = isDate(date) ? date : new Date(date)

  let formatRule = rule || 'YYYY-MM-DD hh:mm:ss'

  const regMap = {
    'Y+': newDate.getFullYear(),
    'M+': newDate.getMonth() + 1,
    'D+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds()
  }

  for (const key in regMap) {
    if (new RegExp(`(${key})`).test(formatRule)) {
      const value = regMap[key] + ''

      // 補零 6 => 06, 排除 年份 YYYY, 與長度只有一 (YYYY-M-D)
      const formatValue =
        RegExp.$1.length === 4 || RegExp.$1.length === 1
          ? value
          : zeroPadding(value)
      formatRule = formatRule.replace(RegExp.$1, formatValue)
    }
  }

  return formatRule
}

export const isDate = (date) => date instanceof Date && date.getTime()

export const zeroPadding = (value, padding = '00') => {
  return (padding + value).substr(value.length)
}

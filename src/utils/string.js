const date = new Date()

const padLeft = (text = '', length = 1, pad = ' ') => {
  while (text.toString().length < length) text = pad.toString() + text.toString()
  return text
}

const today = () => `${date.getFullYear()}-${padLeft(date.getMonth() + 1, 2, '0')}-${padLeft(date.getDate(), 2, '0')}`
const now = () => `${today()}-${padLeft(date.getHours(), 2, '0')}:${padLeft(date.getMinutes(), 2, '0')}:${padLeft(date.getSeconds(), 2, '0')}`

module.exports ={
  today,
  now,
  padLeft,
}

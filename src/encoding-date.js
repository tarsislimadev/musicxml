const { Stringable } = require('./stringable.js')
const { today } = require('./utils/string.js')

class EncodingDate extends Stringable {
  tag = 'encoding-date'

  text = today()
}

module.exports = {
  EncodingDate,
}

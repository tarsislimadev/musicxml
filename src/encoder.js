const { Stringable } = require('./stringable.js')

class Encoder extends Stringable {
  tag = 'encoder'

  text = ''

  constructor(text = '') {
    super()

    this.text = text
  }
}

module.exports = {
  Encoder,
}

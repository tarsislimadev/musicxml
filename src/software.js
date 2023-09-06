const { Stringable } = require('./stringable.js')

class Software extends Stringable {
  tag = 'software'

  text = ''

  constructor(text = '') {
    super()

    this.text = text
  }
}

module.exports = {
  Software,
}

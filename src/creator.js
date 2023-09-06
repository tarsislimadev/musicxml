const { Stringable } = require('./stringable.js')

class Creator extends Stringable {
  tag = 'creator'

  text = ''

  constructor(text = '') {
    super()

    this.text = text
  }
}

module.exports = {
  Creator,
}

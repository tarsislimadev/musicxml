const { Stringable } = require('./stringable.js')

class Rights extends Stringable {
  tag = 'rights'

  text = ''

  constructor(text = '') {
    super()

    this.text = text
  }
}

module.exports = {
  Rights,
}

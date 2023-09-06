const { Stringable } = require('./stringable.js')

class Supports extends Stringable {
  tag = 'supports'

  attrs = {
    element: '',
    type: 'yes',
  }
}

module.exports = {
  Supports,
}

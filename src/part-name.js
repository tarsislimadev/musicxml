const { Stringable } = require('./stringable.js')

class PartName extends Stringable {
  tag = 'part-name'

  text = ''
}

module.exports = {
  PartName,
}

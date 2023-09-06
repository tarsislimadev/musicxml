const { Stringable } = require('./stringable.js')

class Source extends Stringable {
  tag = 'source'

  text = ''
}

module.exports = {
  Source,
}

const { Stringable } = require('./stringable.js')

class Duration extends Stringable {
  tag = 'duration'

  positive_divisions = 1
}

module.exports = {
  Duration,
}

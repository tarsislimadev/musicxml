const { Stringable } = require('./stringable.js')

class Octave extends Stringable {
  tag = 'octave'

  octave = 4
}

module.exports = {
  Octave,
}

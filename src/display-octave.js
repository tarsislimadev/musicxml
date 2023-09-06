const { Stringable } = require('./stringable.js')
const { Step } = require('./step.js')

class DisplayOctave extends Stringable {
  tag = 'display-octave'

  text = Step.A
}

module.exports = {
  DisplayOctave,
}

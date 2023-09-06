const { Stringable } = require('./stringable.js')
const { DisplayStep } = require('./display-step.js')
const { DisplayOctave } = require('./display-octave.js')

class Rest extends Stringable {
  tag = 'rest'

  children = {
    display_step: new DisplayStep(),
    display_octave: new DisplayOctave(),
  }

}

module.exports = {
  Rest,
}

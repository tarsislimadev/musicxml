const { Stringable } = require('./stringable.js')
const { Step } = require('./step.js')
const { Octave } = require('./octave.js')

class Pitch extends Stringable {
  tag = 'pitch'

  children = {
    step: new Step(),
    alter: null,
    octave: new Octave(),
  }
}

module.exports = {
  Pitch,
}

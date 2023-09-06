const { Stringable } = require('./stringable.js')
const { Step } = require('./step.js')

class DisplayStep extends Stringable {
  tag = 'display-step'

  text = Step.A
}

module.exports = {
  DisplayStep,
}

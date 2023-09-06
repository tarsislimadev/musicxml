const { Stringable } = require('./stringable.js')

class Step extends Stringable {
  tag = 'step'

  static A = 'A'
  static B = 'B'
  static C = 'C'
  static D = 'D'
  static E = 'E'
  static F = 'F'
  static G = 'G'

  step = Step.A
}

module.exports = {
  Step,
}

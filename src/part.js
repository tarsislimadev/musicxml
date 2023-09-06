const { Stringable } = require('./stringable.js')
const { Measure } = require('./measure.js')

class Part extends Stringable {
  tag = 'part'

  attrs = {
    id: 'P1'
  }

  children = {
    measure: [],
  }

  constructor() {
    super()

    this.addMeasure()
  }

  addMeasure(measure = new Measure()) {
    this.children.measure.push(measure)
    return this
  }
}

module.exports = {
  Part,
}

const { Stringable } = require('./stringable.js')
const { Duration } = require('./duration.js')
const { Pitch } = require('./pitch.js')
const { Rest } = require('./rest.js')

class Note extends Stringable {
  tag = 'note'

  children = {
    pitch: null,
    rest: null,
    duration: new Duration()
  }

  setPitch(pitch = new Pitch()) {
    this.children.pitch = pitch
    this.children.rest = null
    return this
  }

  setRest(rest = new Rest()) {
    this.children.pitch = null
    this.children.rest = rest
    return this
  }
}

module.exports = {
  Note,
}

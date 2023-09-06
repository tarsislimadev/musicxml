const { Stringable } = require('./stringable.js')
const { Note } = require('./note.js')

class Measure extends Stringable {
  tag = 'measure'

  children = {
    note: [],
  }

  addNote(note = new Note()) {
    this.children.note.push(note)
    return this
  }
}

module.exports = {
  Measure,
}

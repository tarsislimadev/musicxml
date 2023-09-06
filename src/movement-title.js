const { Stringable } = require('./stringable.js')

class MovementTitle extends Stringable {
  tag = 'movement-title'

  constructor(text = 'MusicXML') {
    super()

    this.text = text
  }
}

module.exports = {
  MovementTitle,
}

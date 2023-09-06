const { Stringable } = require('./stringable.js')
const { ScorePart } = require('./score-part.js')

class PartList extends Stringable {
  tag = 'part-list'

  children = {
    // part_group: [],
    score_part: [],
  }

  constructor() {
    super()

    this.addScorePart()
  }

  addScorePart(score_part = new ScorePart()) {
    this.children.score_part.push(score_part)
    return this
  }
}

module.exports = {
  PartList,
}

const { Stringable } = require('./stringable.js')
const { PartName } = require('./part-name.js')

class ScorePart extends Stringable {
  tag = 'score-part'

  attrs = {
    id: 'P1',
  }

  children = {
    identification: null,
    part_link: [],
    part_name: new PartName(),
    part_name_display: null,
    part_abbreviation: null,
    part_abbreviation_display: null,
    group: [],
    score_instrument: [],
    player: [],
  }
}

module.exports = {
  ScorePart,
}

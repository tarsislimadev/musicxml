const { Stringable } = require('./stringable.js')
const { MovementTitle } = require('./movement-title.js')
const { Identification } = require('./identification.js')
const { PartList } = require('./part-list.js')
const { Part } = require('./part.js')

class ScorePartwise extends Stringable {
  tag = 'score-partwise'

  attrs = {
    version: '3.1'
  }

  children = {
    work: null,
    movement_number: null,
    movement_title: new MovementTitle(),
    identification: new Identification(),
    defaults: null,
    credit: null,
    part_list: new PartList(),
    part: new Part(),
  }
}

module.exports = {
  ScorePartwise,
}

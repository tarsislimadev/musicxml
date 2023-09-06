const fs = require('fs')
const path = require('path')

const padLeft = (text = '', length = 1, pad = ' ') => {
  while (text.toString().length < length) text = pad.toString() + text.toString()
  return text
}

const date = new Date()
const today = () => `${date.getFullYear()}-${padLeft(date.getMonth() + 1, 2, '0')}-${padLeft(date.getDate(), 2, '0')}`
const now = () => `${today()}-${padLeft(date.getHours(), 2, '0')}:${padLeft(date.getMinutes(), 2, '0')}:${padLeft(date.getSeconds(), 2, '0')}`

//

class Stringable {
  tag = 'stringable'

  attrs = {}

  children = {}

  text = null

  getAttributesString() {
    const { attrs } = this

    const attributes = Object.keys(attrs)

    if (attributes.length > 0) {
      return ' ' + attributes.map((key) => `${key}="${attrs[key]}"`).join(' ')
    }

    return ''
  }

  getChildrenString() {
    const { children, text } = this

    if (!(text === null)) return text

    return Object.keys(children).map((key) => {
      const child = children[key]

      if (child === null) {
        return ''
      }

      if (Array.isArray(child)) {
        return child.map((ch) => ch.toString()).join('\n')
      }

      console.log(child, child === null, typeof child)

      return child.toString()
    }).join('\n')
  }

  toString() {
    const { tag } = this

    const attributes = this.getAttributesString()

    const children = this.getChildrenString()

    return `<${tag}${attributes}>${children}</${tag}>`
  }
}

class PartName extends Stringable {
  tag = 'part-name'

  text = ''
}

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

class PartList extends Stringable {
  tag = 'part-list'

  children = {
    part_group: [],
    score_part: [],
  }

  constructor() {
    super()

    this.addScorePart()
  }

  addScorePart(score_part = new ScorePart()) {
    this.children.score_part = score_part
    return this
  }
}

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

class Octave extends Stringable {
  tag = 'octave'

  octave = 4
}

class Pitch extends Stringable {
  tag = 'pitch'

  children = {
    step: new Step(),
    alter: null,
    octave: new Octave(),
  }
}

class Duration extends Stringable {
  tag = 'duration'

  positive_divisions = 1
}

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

class MovementTitle extends Stringable {
  tag = 'movement-title'

  constructor(text = 'MusicXML') {
    super()

    this.text = text
  }
}

class Creator extends Stringable {
  tag = 'creator'

  text = ''

  constructor(text = '') {
    super()

    this.text = text
  }
}

class Rights extends Stringable {
  tag = 'rights'

  text = ''

  constructor(text = '') {
    super()

    this.text = text
  }
}

class EncodingDate extends Stringable {
  tag = 'encoding-date'

  text = today()
}

class Encoder extends Stringable {
  tag = 'encoder'

  text = ''

  constructor(text = '') {
    super()

    this.text = text
  }
}

class Software extends Stringable {
  tag = 'software'

  text = ''

  constructor(text = '') {
    super()

    this.text = text
  }
}

class Supports extends Stringable {
  tag = 'supports'

  attrs = {
    element: '',
    type: 'yes',
  }
}

class Encoding extends Stringable {
  tag = 'encoding'

  children = {
    encoding_date: [new EncodingDate()],
    encoder: [],
    software: [],
    supports: [],
  }

  setEncodingDate(encoding_date = new EncodingDate()) {
    this.children.encoding_date.push(encoding_date)
    return this
  }

  setEncoder(encoder = new Encoder()) {
    this.children.encoder.push(encoder)
    return this
  }

  setSoftware(software = new Software()) {
    this.children.software.push(software)
    return this
  }

  setSupports(supports = new Supports()) {
    this.children.supports.push(supports)
    return this
  }
}

class Source extends Stringable {
  tag = 'source'

  text = ''
}

class Identification extends Stringable {
  tag = 'identification'

  children = {
    creator: new Creator(),
    rights: new Rights(),
    encoding: new Encoding(),
    source: new Source(),
  }

  setCreator(creator = '') {
    this.children.creator = new Creator(creator)
    return this
  }

  setRights(rights = '') {
    return this
  }

  setEncoding(encoding = '') {
    return this
  }

  setSource(source = '') {
    return this
  }
}

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

class MusicXML extends Stringable {
  score_partwise = new ScorePartwise()

  hasIdentification() {
    if (this.score_partwise.children.identification === null) {
      this.score_partwise.children.identification = new Identification()
    }
  }

  setRights(rights = '') {
    this.hasIdentification()
    this.score_partwise.children.identification.setRights(rights)
    return this
  }

  setCreator(creator = '') {
    this.hasIdentification()
    this.score_partwise.children.identification.setCreator(creator)
    return this
  }

  setSoftware(software = '') {
    this.hasIdentification()
    this.score_partwise.children.identification.children.encoding.setSoftware(new Software(software))
    return this
  }

  setEncodingDate(encoding_date = '') {
    this.hasIdentification()
    // this.score_partwise.children.identification.
    return this
  }

  saveToFile(filename = '') {
    const pathname = path.resolve(filename)

    fs.writeFileSync(pathname, this.toString())

    console.log(`Saved in: ${pathname}`)
  }

  toString() {
    const lines = []

    lines.push('<?xml version="1.0" encoding="UTF-8" standalone="no"?>')
    lines.push('<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">')
    lines.push(this.score_partwise.toString())

    return lines.join('\n')
  }
}

module.exports = {
  Stringable,
  PartName,
  ScorePart,
  PartList,
  Step,
  Octave,
  Pitch,
  Duration,
  Note,
  Measure,
  Part,
  MovementTitle,
  Creator,
  Rights,
  EncodingDate,
  Encoder,
  Software,
  Supports,
  Encoding,
  Source,
  Identification,
  ScorePartwise,
  MusicXML,
}

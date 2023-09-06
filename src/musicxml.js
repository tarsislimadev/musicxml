const fs = require('fs')
const path = require('path')
const { Stringable } = require('./stringable.js')
const { Identification } = require('./identification.js')
const { ScorePartwise } = require('./score-partwise.js')
const { Software } = require('./software.js')

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
  MusicXML,
}

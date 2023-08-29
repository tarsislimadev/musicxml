const fs = require('fs')

class NoteType {
  type = 1

  constructor(type = 1) {
    this.type = type
  }

  getTypeText() {
    switch (this.type) {
      case 1: return 'whole'
      case 2: return 'half'
      case 4: return 'quarter'
      case 8: return 'eighth'
    }
  }
}

class NoteStem {
  text = 'down'

  constructor(stem = 0) {
    const stems = ['down', 'up',]
    this.text = stems[stem]
  }
}

class NotePitch {
  step = 'A'
  octave = '5'

  constructor(step, octave) {
    this.step = step
    this.octave = octave
  }
}

class Note {
  divisions = 3840
  duration = 3840
  voice = 1
  pitch = new NotePitch('A', '5')
  type = new NoteType(1)
  stem = new NoteStem()

  setDivisions(divisions = 3840) {
    this.divisions = divisions
    return this
  }

  setDuration(duration = 1) {
    this.duration = duration
    return this
  }

  setType(type = new NoteType(1)) {
    this.type = type
    return this
  }

  setStem(stem = new NoteStem(1)) {
    this.stem = stem
    return this
  }

  setPitch(pitch = new NotePitch('A', '4')) {
    this.pitch = pitch
    return this
  }

  toXML() {
    const lines = []

    lines.push(`<note>`)
    lines.push(`  <pitch>`)
    lines.push(`    <step>${this.pitch.step}</step>`)
    lines.push(`    <octave>${this.pitch.octave}</octave>`)
    lines.push(`  </pitch>`)
    lines.push(`  <duration>${this.duration}</duration>`)
    lines.push(`</note>`)

    return lines.join('\n')
  }
}

class Measure {
  divisions = 3840
  tempo = 120
  notes = []

  setTempo(tempo = 120) {
    this.tempo = tempo
    return this
  }

  setDivisions(divisions = 3840) {
    this.divisions = divisions
    return this
  }

  addNote(note = new Note()) {
    note.setDivisions(this.divisions)
    this.notes.push(note)
    return this
  }

  toXML() {
    const lines = []
    lines.push(`<measure>`)
    this.notes.map((note) => lines.push(note.toXML()))
    lines.push(`</measure>`)
    return lines.join('\n')
  }
}

class MusicXML {
  measures = []
  tempo = 120
  divisions = 3840
  key = {
    fifths: 0,
    mode: 'none',
  }
  time = {
    beats: 4,
    beat_type: 4,
  }
  clef = {
    sign: 'G',
    line: 2,
  }

  constructor() {
    this.addMeasure()
  }

  addMeasure(measure = new Measure()) {
    measure.setTempo(this.tempo)
    measure.setDivisions(this.divisions)
    this.measures.push(measure)
    return this
  }

  toXML() {
    const lines = []

    lines.push('<?xml version="1.0" encoding="UTF-8" standalone="no"?>')
    lines.push('<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">')
    lines.push('<score-partwise version="3.1">')
    lines.push('  <movement-title>makemusic</movement-title>')

    this.getDefaults().map((line) => lines.push(line))

    this.getPartList().map((line) => lines.push(line))

    lines.push('<part id="P1">')
    this.getAttributes().map((line) => lines.push(line))
    this.measures.map((m) => lines.push(m.toXML()))
    lines.push('</part>')

    lines.push('</score-partwise>')

    return lines.join('\n')
  }

  getDefaults() {
    const lines = []

    lines.push('  <defaults>')
    lines.push('    <scaling>')
    lines.push('      <millimeters>6.5000</millimeters>')
    lines.push('      <tenths>40</tenths>')
    lines.push('    </scaling>')
    lines.push('    <page-layout>')
    lines.push('      <page-height>1827.6</page-height>')
    lines.push('      <page-width>1292.3</page-width>')
    lines.push('      <page-margins type="both">')
    lines.push('        <left-margin>61.5</left-margin>')
    lines.push('        <right-margin>61.5</right-margin>')
    lines.push('        <top-margin>307.6</top-margin>')
    lines.push('        <bottom-margin>61.5</bottom-margin>')
    lines.push('      </page-margins>')
    lines.push('    </page-layout>')
    lines.push('    <appearance>')
    lines.push('      <line-width type="staff">1.0000</line-width>')
    lines.push('      <line-width type="stem">1.0000</line-width>')
    lines.push('      <line-width type="beam">5.0000</line-width>')
    lines.push('      <line-width type="leger">1.0000</line-width>')
    lines.push('      <line-width type="light barline">1.0000</line-width>')
    lines.push('      <line-width type="heavy barline">3.4199</line-width>')
    lines.push('      <line-width type="wedge">1.0000</line-width>')
    lines.push('      <note-size type="cue">60</note-size>')
    lines.push('      <note-size type="grace">50</note-size>')
    lines.push('    </appearance>')
    lines.push('  </defaults>')

    return lines
  }

  getPartList() {
    const lines = []

    lines.push('  <part-list>')
    lines.push('    <score-part id="P1">')
    lines.push('      <part-name print-object="no">Music</part-name>')
    lines.push('      <score-instrument id="P1-I1">')
    lines.push('        <instrument-name>Music</instrument-name>')
    lines.push('        <instrument-sound>wind.flutes.flute</instrument-sound>')
    lines.push('        <virtual-instrument>')
    lines.push('          <virtual-library>Finale Default Bank</virtual-library>')
    lines.push('          <virtual-name>Flute Solo</virtual-name>')
    lines.push('        </virtual-instrument>')
    lines.push('      </score-instrument>')
    lines.push('      <?SmartMusic instrument-id="2" staff="1"?>')
    lines.push('    </score-part>')
    lines.push('  </part-list>')

    return lines
  }

  getAttributes() {
    const lines = []

    lines.push(`<measure>`)
    lines.push(`  <attributes>`)
    lines.push(`    <divisions>${this.divisions}</divisions>`)
    lines.push(`    <key>`)
    lines.push(`      <fifths>${this.key.fifths}</fifths>`)
    lines.push(`      <mode>${this.key.mode}</mode>`)
    lines.push(`    </key>`)
    lines.push(`    <time>`)
    lines.push(`      <beats>${this.time.beats}</beats>`)
    lines.push(`      <beat-type>${this.time.beat_type}</beat-type>`)
    lines.push(`    </time>`)
    lines.push(`    <clef>`)
    lines.push(`      <sign>${this.clef.sign}</sign>`)
    lines.push(`      <line>${this.clef.line}</line>`)
    lines.push(`    </clef>`)
    lines.push(`  </attributes>`)
    lines.push(`  <sound tempo="${this.tempo}"/>`)
    lines.push(`</measure>`)

    return lines
  }

  writeFile(filename) {
    fs.writeFileSync(filename, this.toXML())
    return this
  }
}

module.exports = {
  NoteType,
  NoteStem,
  NotePitch,
  Note,
  Measure,
  MusicXML,
}

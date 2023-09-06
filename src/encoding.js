const { Stringable } = require('./stringable.js')
const { EncodingDate } = require('./encoding-date.js')
const { Encoder } = require('./encoder.js')
const { Software } = require('./software.js')
const { Supports } = require('./supports.js')

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

module.exports = {
  Encoding,
}

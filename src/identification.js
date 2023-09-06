const { Stringable } = require('./stringable.js')
const { Creator } = require('./creator.js')
const { Rights } = require('./rights.js')
const { Encoding } = require('./encoding.js')
const { Source } = require('./source.js')

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

module.exports = {
  Identification,
}


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

module.exports = {
  Stringable,
}

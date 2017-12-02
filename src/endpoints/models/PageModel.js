class PageModel {
  constructor ({id, numericId, title = '', parentNumericId = null, content = '', thumbnail = null, order = 0, availableLanguages = {}, url = null}) {
    this._id = id
    this._numericId = numericId
    this._title = title
    this._content = content
    this._parentNumericId = parentNumericId
    this._thumbnail = thumbnail
    this._order = order
    this._availableLanguages = availableLanguages
    this._children = []
    this._parent = null
    this._url = url
  }

  get thumbnail () {
    return this._thumbnail
  }

  addChild (page) {
    this._children.push(page)
    this._children.sort((page1, page2) => page1.order - page2.order)
  }

  setParent (parent) {
    this._parent = parent
  }

  get parent () {
    return this._parent
  }

  get id () {
    return this._id
  }

  get numericId () {
    return this._numericId
  }

  get title () {
    return this._title
  }

  get content () {
    return this._content
  }

  get parentNumericId () {
    return this._parentNumericId
  }

  get children () {
    return this._children
  }

  get order () {
    return this._order
  }

  get availableLanguages () {
    return this._availableLanguages
  }

  get url () {
    if (this._url) {
      return this._url
    }
    return `${this.parent.url}/${this.id}`
  }
}

export const EMPTY_PAGE = new PageModel({})
export default PageModel

import React from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/fp/compose'

import ContentList from 'components/Content/CategoriesContent/ContentList'
import SearchInput from 'components/UIComponents/SearchInput'

import style from './style.css'

import withAvailableLanguageUpdater from 'hocs/withAvailableLanguageUpdater'
import withFetcher from 'endpoints/withFetcher'
import PAGE_ENDPOINT from 'endpoints/page'
import PageModel from 'endpoints/models/PageModel'

class SearchPage extends React.Component {
  static propTypes = {
    pages: PropTypes.instanceOf(PageModel).isRequired
  }

  constructor () {
    super()
    this.state = {filterText: ''}
  }

  acceptPage (page) {
    const title = page.title.toLowerCase()
    const content = page.content
    const filterText = this.state.filterText.toLowerCase()
    // todo:  comparing the content like this is quite in-efficient and can cause lags
    // todo:  1) Do this work in an other thread 2) create an index
    return title.includes(filterText) || content.toLowerCase().includes(filterText)
  }

  /**
   * @param pages The result, can already contain some pages
   * @param page The page
   */
  findPages (pages, page) {
    if (this.acceptPage(page)) {
      pages.push(page)
    }
    page.children.forEach(page => this.findPages(pages, page))
  }

  render () {
    const pages = []
    this.props.pages.children.forEach(page => this.findPages(pages, page))

    return (
      <div>
        <SearchInput className={style.searchSpacing}
                     filterText={this.state.filterText}
                     onFilterTextChange={(filterText) => this.setState({filterText: (filterText)})} />
        <ContentList pages={pages}/>
      </div>
    )
  }
}

export default compose(
  withFetcher(PAGE_ENDPOINT),
  withAvailableLanguageUpdater((location, language) => `/${location}/${language}/search`)
)(SearchPage)

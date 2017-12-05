import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import style from './ContentList.css'
import PageModel from 'endpoints/models/PageModel'

import IconPlaceholder from './assets/IconPlaceholder.svg'

class CategoryListItem extends React.Component {
  static propTypes = {
    page: PropTypes.instanceOf(PageModel).isRequired
  }

  render () {
    return (
      <Link href={this.props.page.url}>
        <div className={style.row}>
          <img className={style.categoryThumbnail} src={this.props.page.thumbnail || IconPlaceholder}/>
          <div className={style.categoryCaption}>{this.props.page.title}</div>
        </div>
      </Link>
    )
  }
}

class ContentList extends React.Component {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.instanceOf(PageModel)).isRequired
  }

  render () {
    return (
      <div className={style.list}>
        { this.props.pages.map((page) => <CategoryListItem key={page.numericId} page={page} />) }
      </div>
    )
  }
}

export default ContentList

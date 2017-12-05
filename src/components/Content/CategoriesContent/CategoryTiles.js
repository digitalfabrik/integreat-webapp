import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-flexbox-grid'
import { Link } from 'redux-little-router'

import PageModel from 'endpoints/models/PageModel'
import LOCATIONS_ENDPOINT from 'endpoints/location'
import withFetcher from 'endpoints/withFetcher'
import Caption from 'components/UIComponents/Caption'

import style from './CategoryTiles.css'

class CategoryTile extends React.Component {
  static propTypes = {
    page: PropTypes.instanceOf(PageModel).isRequired
  }

  render () {
    return (
      <Col xs={6} sm={4} className={style.category}>
        <Link href={this.props.page.url}>
          <img className={style.categoryThumbnail} src={this.props.page.thumbnail}/>
          <div className={style.categoryTitle}>{this.props.page.title}</div>
        </Link>
      </Col>
    )
  }
}

class CategoryTiles extends React.Component {
  static propTypes = {
    page: PropTypes.instanceOf(PageModel).isRequired
  }

  getTitle () {
    return this.props.locations.find((location) => location.code === this.props.page.title).name
  }

  render () {
    return (
      <div>
        <Caption title={this.getTitle()}/>
        <Row>
          {this.props.page.children.map((page) => <CategoryTile key={page.id} page={page}/>)}
        </Row>
      </div>
    )
  }
}

export default withFetcher(LOCATIONS_ENDPOINT, true, true)(CategoryTiles)

import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { Row } from 'react-flexbox-grid'
import { isEmpty } from 'lodash/lang'
import normalizeUrl from 'normalize-url'
import compose from 'lodash/fp/compose'

import EventModel from 'endpoints/models/EventModel'
import Hierarchy from 'routes/LocationPage/Hierarchy'

import EVENTS_ENDPOINT from 'endpoints/events'
import withFetcher from 'endpoints/withFetcher'

import Page from '../Page'
import TitledCategoriesTable from './TitledCategoriesTable'
import style from './index.css'
import TitledContentList from './TitledContentList'
import EventSnippet from '../EventsContent/EventSnippet'
import Navigation from 'Navigation'

class Content extends React.Component {
  static propTypes = {
    /**
     * from withFetcher HOC which provides data from EVENTS_ENDPOINT
     */
    events: PropTypes.arrayOf(PropTypes.instanceOf(EventModel)),
    hierarchy: PropTypes.instanceOf(Hierarchy),
    url: PropTypes.string.isRequired
  }

  hasEvents () {
    return !isEmpty(this.props.events)
  }

  render () {
    const {t} = this.props
    const hierarchy = this.props.hierarchy
    const navigation = new Navigation(this.props.location, this.props.language)
    const page = hierarchy.top()

    if (isEmpty(page.children)) {
      return <Page page={page}/>
    }

    const url = normalizeUrl(this.props.url, {removeTrailingSlash: true})
    const base = url + hierarchy.path()

    const pages = page.children.map((page) => ({page, url: `${base}/${page.id}`}))

    if (hierarchy.root()) {
      return <div>
        {this.hasEvents() && <EventSnippet events={this.props.events} navigation={navigation}/>}
        <TitledCategoriesTable pages={pages} parentPage={page}/>
        {!this.hasEvents() && <Row className={style.noEvents}>{t('common:currentlyNoEvents')}</Row>}
      </div>
    } else {
      return <TitledContentList parentPage={page} pages={pages}/>
    }
  }
}

const mapStateToProps = (state) => ({
  language: state.router.params.language,
  location: state.router.params.location
})

export default compose(
  connect(mapStateToProps),
  translate('common'),
  withFetcher(EVENTS_ENDPOINT)
)(Content)

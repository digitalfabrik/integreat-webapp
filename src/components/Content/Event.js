import React from 'react'
import PropTypes from 'prop-types'

import EventModel from '../../endpoints/models/EventModel'
import RemoteContent from './RemoteContent'

import style from './Event.css'
import EventPlaceholder1 from '../../components/Content/assets/EventPlaceholder1.jpg'
import EventPlaceholder2 from '../../components/Content/assets/EventPlaceholder2.jpg'
import EventPlaceholder3 from '../../components/Content/assets/EventPlaceholder3.jpg'
import Caption from './Caption'
import { translate } from 'react-i18next'

/**
 *
 */
class Event extends React.Component {
  static propTypes = {
    event: PropTypes.shape({
      event: PropTypes.instanceOf(EventModel).isRequired,
      thumbnailPlaceholder: PropTypes.number.isRequired
    }).isRequired,
    language: PropTypes.string.isRequired
  }

  getEventPlaceholder () {
    return (
      this.props.event.thumbnailPlaceholder % 3 === 0 ? EventPlaceholder1
        : this.props.event.thumbnailPlaceholder % 3 === 1 ? EventPlaceholder2
        : EventPlaceholder3
    )
  }

  render () {
    const {t} = this.props
    return (
      <div>
        <img className={style.thumbnail} src={this.props.event.event.thumbnail || this.getEventPlaceholder()}/>
        <Caption title={this.props.event.event.title}/>
        <div>
          <span className={style.identifier}>{t('common:date')}: </span>
          <span className={style.date}>{this.props.event.event.getDate(this.props.language)}</span>
        </div>
        <div>
          <span className={style.identifier}>{t('common:location')}: </span>
          <span className={style.date}>{this.props.event.event.address}</span>
        </div>
        <RemoteContent dangerouslySetInnerHTML={{__html: this.props.event.event.content}}/>
      </div>
    )
  }
}

export default translate('common')(Event)

import React from 'react'
import PropTypes from 'prop-types'

import style from './SecondLevelCategoryList.css'
import PageModel from 'endpoints/models/PageModel'
import ContentList from './ContentList'
import RemoteContent from 'components/UIComponents/RemoteContent'

class SecondLevelCategoryList extends React.Component {
  static propTypes = {
    page: PropTypes.instanceOf(PageModel).isRequired
  }

  render () {
    return (
      <div>
        <div className={style.horizontalLine}>
          <div className={style.heading}>
            <img className={style.headingImage} src={this.props.page.thumbnail}/>
            <div className={style.headingText}>{this.props.page.title}</div>
            <RemoteContent className={style.shortText} dangerouslySetInnerHTML={{__html: this.props.page.content}}/>
          </div>
        </div>
        <ContentList pages={this.props.page.children}/>
      </div>
    )
  }
}

export default SecondLevelCategoryList

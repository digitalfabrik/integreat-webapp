import React from 'react'
import PropTypes from 'prop-types'

import Caption from 'components/UIComponents/Caption'
import RemoteContent from 'components/UIComponents/RemoteContent'

class Page extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        <Caption title={this.props.page.title}/>
        <RemoteContent dangerouslySetInnerHTML={{__html: this.props.page.content}}/>
      </div>
    )
  }
}

export default Page

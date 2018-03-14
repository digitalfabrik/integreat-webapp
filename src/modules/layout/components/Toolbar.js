// @flow

import React from 'react'
import cx from 'classnames'
import style from './Toolbar.css'

type Props = {
  className?: string,
  children: Array<Node>
}

class Toolbar extends React.Component<Props> {
  render () {
    return <div className={cx(style.toolbar, this.props.className)}>
      {this.props.children}
    </div>
  }
}

export default Toolbar

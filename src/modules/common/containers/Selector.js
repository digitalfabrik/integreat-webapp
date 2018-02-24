import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'
import cx from 'classnames'

import style from './Selector.css'
import { SelectorItem } from '../SelectorItem'

/**
 * Displays a Selector showing different items
 */
export default class Selector extends React.Component {
  static propTypes = {
    closeDropDownCallback: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.instanceOf(SelectorItem)).isRequired,
    active: PropTypes.string.isRequired
  }

  getItems () {
    return this.props.items.map(item => {
      if (item.code === this.props.active) {
        return (
          <span key={item.code}
                className={cx(style.element, style.elementActive)}
                onClick={this.props.closeDropDownCallback}>
            {item.name}
            </span>
        )
      } else {
        return (
          <Link key={item.code}
                className={style.element}
                onClick={this.props.closeDropDownCallback}
                href={item.path}>
            {item.name}
          </Link>
        )
      }
    })
  }

  render () {
    return (
      <div className={style.selector}>
        {this.getItems()}
      </div>
    )
  }
}

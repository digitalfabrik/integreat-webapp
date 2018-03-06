import React from 'react'
import { Link } from 'redux-little-router'
import { branch, mapProps, renderComponent } from 'recompose'
import { omit } from 'lodash/object'

export class DisabledLink extends React.Component {
  render () {
    return <span {...this.props} />
  }
}

/**
 * mapProps() without 'active' in props
 */
const omitActive = mapProps(props => omit(props, 'active'))

export default branch(
  props => props.active,
  renderComponent(omitActive(Link)),
  renderComponent(omitActive(DisabledLink))
)()

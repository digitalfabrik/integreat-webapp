import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import { isEqual } from 'lodash/lang'

import Error from 'components/Error'
import style from './Fetcher.css'

function createStateToPropsMapper (endpoint) {
  return (state) => ({
    [endpoint.payloadName]: state[endpoint.stateName],
    options: endpoint.mapStateToOptions(state)
  })
}

function withFetcher (endpoint, hideError = false, hideSpinner = false) {
  return (WrappedComponent) => {
    let Fetcher = class extends React.Component {
      static displayName = endpoint.name + 'Fetcher'

      fetch (options) {
        if (!options) {
          throw new Error('options are not valid! This could mean your mapStateToOptions() returns ' +
            'a undefined value!')
        }

        this.props.dispatch(endpoint.requestAction(options, options)).then((result) => {
          if (!result[1] || !result[1].payload) {
            return
          }
          return this.setState({fetchedData: result[1].payload.data})
        })
      }

      componentWillMount () {
        this.setState({})
        this.fetch(this.props.options)
      }

      componentWillUpdate (nextProps, nextState) {
        if (!isEqual(this.state, nextState)) {
          return
        }

        if (endpoint.shouldRefetch(this.props.options, nextProps.options)) {
          this.fetch(nextProps.options)
        }
      }

      errorVisible () {
        return !hideError && this.props[endpoint.payloadName].error
      }

      render () {
        const payload = this.props[endpoint.payloadName]

        if (this.errorVisible()) {
          return <Error className={cx(style.loading, this.props.className)} error={payload.error}/>
        }

        if (!this.state.fetchedData) {
          if (!hideSpinner) {
            return <Spinner className={cx(style.loading, this.props.className)} name='line-scale-party'/>
          } else {
            return <div/>
          }
        }

        return <WrappedComponent {...Object.assign({}, this.props, {
          [endpoint.stateName]: this.state.fetchedData
        })}/>
      }
    }

    return connect(createStateToPropsMapper(endpoint))(Fetcher)
  }
}

export default withFetcher

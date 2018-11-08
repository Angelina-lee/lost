import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props

    return (
      <React.Fragment>
        <span><a href="https://l3p-cv.com">LOST</a> &copy 2018 L3P UG (haftungsbeschränkt).</span>
        <span className="ml-auto">Powered by <a href="https://l3p-cv.com">L3P</a></span>
      </React.Fragment>
    )
  }
}

DefaultFooter.propTypes = propTypes
DefaultFooter.defaultProps = defaultProps

export default DefaultFooter

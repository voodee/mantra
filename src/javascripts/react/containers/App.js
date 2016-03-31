import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'
import { fetchDataIfNeeded, changeCursor } from '../actions'
import { getCountVisitsUser } from '../actions/storage'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import PreLoader from '../components/PreLoader'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class App extends Component {

  
  
  constructor(props) {
    super(props)

    const { dispatch, params: { id } } = this.props
    dispatch( fetchDataIfNeeded() )
    //id && dispatch(changeCursor(id))

    // Получаем кол-во посещений пользователя
    dispatch( getCountVisitsUser() )



  }


  static propTypes = {
    children: PropTypes.node
  }

  render() {
    // const { pathname } = this.props.location
    // const key = pathname.split('/')[1] || 'root'
    const loading = this.props.mantras.get('isFetching') || this.props.mantras.get('didInvalidate') || this.props.mantras.get('items').size == 0

    return (
      <div>
        {loading && <PreLoader />}
        {!loading &&  this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  mantras: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { mantras } = state

  return {
    mantras
  }
}

export default connect(mapStateToProps)(App)

      // <ReactCSSTransitionGroup
      //   component="div" transitionName='amimation-flip' className="amimation-flip--box"
      //   transitionEnterTimeout={1000} transitionLeaveTimeout={1000}
      // >
      //   {React.cloneElement(this.props.children || <div />, { key: key })}
      // </ReactCSSTransitionGroup>
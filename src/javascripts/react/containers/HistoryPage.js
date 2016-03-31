import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchDataIfNeeded } from '../actions'
import Qoutes from '../components/Qoutes'
import Immutable, { Map } from 'immutable'
import { pushState } from 'redux-router'
import { bindActionCreators } from 'redux'

class HistoryPage extends Component {

  componentDidMount() {
    this.props.dispatch( fetchDataIfNeeded() )
  }

  openMantra = (key) => {
    this.props.dispatch(pushState(null, `/mantra/${key}`))
  }

  render() {
    const { dispatch, mantras, authors, mantrasItems, isFetching, cursor } = this.props

    return (
      <div className="mdl-layout main-layout">

        <header className="header mdl-layout__header mdl-layout__header--waterfall">
          <div className="mdl-layout__header-row">

            <div className="mdl-layout-spacer" />

            <div className="header-caption">
              <Link to={cursor ? `/mantra/${cursor}` : `/`} className="mdl-button mdl-js-button mdl-js-ripple-effect">Назад</Link>
            </div>

            <div className="mdl-layout-spacer" />

          </div>
        </header>  



        <main className="history mdl-layout__content">       

          {isFetching && mantrasItems.size === 0 &&
            <h2>Loading...</h2>
          }
          {!isFetching && mantrasItems.size === 0 &&
            <h2>Empty.</h2>
          }
          {mantrasItems.size > 0 &&
            <Qoutes mantrasItems={mantrasItems} authors={authors} openMantra={this.openMantra} style={{ opacity: isFetching ? 0.5 : 1 }} />
          }

        </main>



      </div>          
    )

  }
}


HistoryPage.propTypes = {
  mantras: PropTypes.object.isRequired,
  authors: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,

  mantrasItems: React.PropTypes.instanceOf(Immutable.List),
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { mantras, authors } = state
  const isFetching = mantras.get('isFetching') || true
  const mantrasItems = mantras.get('items')
  const cursor = mantras.get('cursor')

  return {
    mantras,
    authors,
    mantrasItems,
    isFetching,
    cursor
  }
}

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
      pushState: bindActionCreators(pushState, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage)
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Immutable from 'immutable'
import moment from 'moment'

import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'

export default class Header extends Component {

  componentDidMount() {}

  render() {
    const { mantra, creator, cursorPrev, cursorNext, cursor } = this.props


    return (
      <header className="header mdl-layout__header mdl-layout__header--waterfall">
        <div className="mdl-layout__header-row header__row">

          <div className="mdl-layout-spacer" />

          <div className="header-caption"> 
            <h1>
              <span>добавил</span>
              <a href='#' className="header-caption--link" onTouchTap={this.props.handleToogleCreatorsInfo}>{creator.name}</a> 
            </h1>

            <p className="header-caption--navigation">
            
              <span>{moment(mantra.get('published_at')).locale('ru').format('D MMMM').toLowerCase() } &nbsp; </span> 

              <Link to={`/mantra/${cursorPrev}`} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" disabled={cursorPrev == cursor}>
                <i className="material-icons">keyboard_arrow_left</i>
              </Link>

              <Link to={`/history`} className="mdl-button mdl-js-button mdl-js-ripple-effect">
                <i className="material-icons">view_module</i> Архив
              </Link> 

              <Link to={`/mantra/${cursorNext}`} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" disabled={cursorNext == cursor}>
                <i className="material-icons">keyboard_arrow_right</i>
              </Link>
            </p>
             

          </div>
          <div className="mdl-layout-spacer" />

        </div>
      </header>
    )
  }

}

Header.propTypes = {
  mantra: React.PropTypes.instanceOf(Immutable.Map),
  creator: PropTypes.object.isRequired,
  cursorPrev: PropTypes.string.isRequired,
  cursorNext: PropTypes.string.isRequired,
  cursor: PropTypes.string.isRequired,

  handleToogleCreatorsInfo: PropTypes.func.isRequired
}
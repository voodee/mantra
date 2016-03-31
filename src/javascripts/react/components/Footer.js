import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Immutable from 'immutable'

import { setStatusWelcomDialog } from '../actions/storage'

import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'


import Share from './Share'




export default class Footer extends Component {

  handleOpenWelcomDialog = () => {
    this.props.dispatch(setStatusWelcomDialog(true))
  }

  render() {
    const colorButton = '#fafafa'

    return (
      <footer className="footer mdl-mini-footer">

        <div className="mdl-grid footer-grid">
          <div className="mdl-cell mdl-cell--4-col footer-left">
            <ul className="mdl-mini-footer--link-list footer-left--link-list">
              <li>
                <FlatButton label="О проекте" onTouchTap={this.handleOpenWelcomDialog} style={ { color: colorButton } } />
              </li>
              <li>
                <FlatButton label="Добавить Мантру" onTouchTap={this.props.handleOpenAddMantraDialog} style={ { color: colorButton } } />
              </li>
            </ul>
          </div>

          <div className="mdl-cell mdl-cell--4-col">
            <Share />
          </div>

          <div className="mdl-cell mdl-cell--4-col footer-right">
            <ul className="mdl-mini-footer--link-list footer-right--link-list">
              <li>
                <button className="mdl-button mdl-js-button mdl-js-ripple-effect" onTouchTap={this.props.handleOpenSubscribeDialog}>Подписаться</button>
              </li>
              <li>
                <a href='http://vk.com/mantra.online' className="footer-right-icon mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" target='_blank'>
                  <i className="fa fa-vk" />
                </a>
              </li>
              <li>
                <a href='https://twitter.com/MantraOnlive' className="footer-right-icon mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" target='_blank'>
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href='https://www.facebook.com/mantra.onlive' className="footer-right-icon mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" target='_blank'>
                  <i className="fa fa-facebook" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,

  mantra: React.PropTypes.instanceOf(Immutable.Map),
  handleOpenSubscribeDialog: PropTypes.func.isRequired,
  handleOpenAddMantraDialog: PropTypes.func.isRequired
}


function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Footer)
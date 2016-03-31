import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'

import { getAuthorFromMantra } from '../helpers/MantraHelpers'

import injectTapEventPlugin from 'react-tap-event-plugin'

export default class Qoutes extends Component {

  componentDidMount() {
    injectTapEventPlugin()
  }
  

  render() {

    return (
      <div className="mdl-grid main-grid">
        {this.props.mantrasItems.map( (mantra, key) =>
          
          <div className="card mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp"  onTouchTap={() => this.props.openMantra(key)} key={key} style={ { backgroundColor: mantra.get('color') } }>
            <div className="mdl-card__title">
              <h1 className="mdl-card__title-text card--title-text mdl-color-text--grey-50">{mantra.get('qoute')}</h1>
            </div>

            <div className="mdl-card__actions mdl-card--border">
              <div className="mdl-card__supporting-text card--supporting-text mdl-color-text--grey-50">
                {getAuthorFromMantra(this.props.authors, mantra) && getAuthorFromMantra(this.props.authors, mantra).name}
              </div>
            </div>



          </div>
        )}
      </div>
    )
  }
}

Qoutes.propTypes = {
  mantrasItems: React.PropTypes.instanceOf(Immutable.List),
  authors: React.PropTypes.instanceOf(Immutable.Map),

  openMantra: PropTypes.func.isRequired
}
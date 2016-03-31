import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta' 

import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'


import { fetchDataIfNeeded, changeCursor } from '../actions'
import { toogleCreatorsInfo } from '../actions/storage'


import Header from '../components/Header'
import Footer from '../components/Footer'
import Qoute from '../components/Qoute'
import Modal from '../components/Modal'

import { getMantraFromCursor, getCreatorFromMantra, getAuthorFromMantra } from '../helpers/MantraHelpers'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class Mantra extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showSubscribeDialog: false,
      showAddMantraDialog: false
    }
  }  

  checkCursor = (props) => {
    const { dispatch, mantras, params: { id } } = props
    if ( (typeof id != 'undefined') && id != mantras.get('cursor')) {
      dispatch(changeCursor(id))
    }  
  }

  componentDidMount() {
    this.checkCursor(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkCursor(nextProps)
  }


  render() {
    const { dispatch, mantras, creators, authors, user, storage, params: { id } } = this.props

    const cursor = `${ mantras.get('cursor') }`
    const cursorPrev = `${ Math.max(cursor*1 - 1, 0) }`
    const cursorNext = `${ Math.min(cursor*1 + 1, mantras.get('items').size*1 - 1) }` 

    const mantra = getMantraFromCursor(mantras, cursor)

    const author = getAuthorFromMantra(authors, mantra)
    const creator = getCreatorFromMantra(creators, mantra)

    const meta = {
      title: 'Мантра Онлайн',
      description: mantra && mantra.get('qoute'),
      meta: {
        property: {
          'og:description': mantra && mantra.get('qoute')
        }
      }
    }  

    return (
      <div className="mdl-layout main-layout">

        <DocumentMeta {...meta} />

        {mantra && creator &&
          <Header 
            mantra={mantra} 
            creator={creator} 
            cursorPrev={cursorPrev} 
            cursorNext={cursorNext} 
            cursor={cursor} 
            handleToogleCreatorsInfo={ () => dispatch(toogleCreatorsInfo()) } />
        }

        {mantra && author && creator &&
          <ReactCSSTransitionGroup
            component="div" transitionName='swap' className={ mantras.get('cursorOld') > cursor ? 'swap--left' : 'swap--right' } style={ { background: mantra.get('color') } }
            transitionEnterTimeout={999} transitionLeaveTimeout={749}
          >
        
            { React.cloneElement(<Qoute mantra={mantra} author={author} storage={ storage } creator={creator} /> || <div />, { key: mantra.get('id') }) }
            
          </ReactCSSTransitionGroup>
        }  
        

        {mantra &&
          <Footer 
            mantra={ mantra }
            handleOpenWelcomDialog={ this.handleOpenWelcomDialog }
            handleOpenSubscribeDialog={ this.handleOpenSubscribeDialog }
            handleOpenAddMantraDialog={ this.handleOpenAddMantraDialog } />
        }  
       
        {mantra && 
          <Modal 
            mantra={ mantra }
            showSubscribeDialog={this.state.showSubscribeDialog}
            handleOpenSubscribeDialog={this.handleOpenSubscribeDialog}
            handleCloseSubscribeDialog={this.handleCloseSubscribeDialog}


            showAddMantraDialog={this.state.showAddMantraDialog}
            handleOpenAddMantraDialog={this.handleOpenAddMantraDialog}
            handleCloseAddMantraDialog={this.handleCloseAddMantraDialog} />  
        }
          
      </div>
    )  
  }



  handleOpenSubscribeDialog = () => {
    this.setState({showSubscribeDialog: true})
  }

  handleCloseSubscribeDialog = () => {
    this.setState({showSubscribeDialog: false})
  }


  handleOpenAddMantraDialog = () => {
    this.setState({showAddMantraDialog: true})
  }

  handleCloseAddMantraDialog = () => {
    this.setState({showAddMantraDialog: false})
  }
 
}


Mantra.propTypes = {
  mantras: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { mantras, creators, authors, user, storage } = state


  return {
    mantras,
    creators,
    authors,
    user,
    storage
  }
}

export default connect(mapStateToProps)(Mantra)
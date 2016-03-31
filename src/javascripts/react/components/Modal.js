import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import { setStatusWelcomDialog } from '../actions/storage'

import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'

import FormSubscribe from './Modal/FormSubscribe'
import FormAddMantra from './Modal/FormAddMantra'

import { 
  changeEmail, sendEmail ,
  changeUserMantra, sendUserMantra
} from '../actions/User'



export default class Modal extends Component {

  handleCloseWelcomDialog = () => {
    this.props.dispatch(setStatusWelcomDialog(false))
  }


  handleChangeEmail = (email) => {
    this.props.dispatch(changeEmail(email))
  }

  handleSendEmail = () => {
    this.props.dispatch(sendEmail(this.props.user.get('email').get('value')))
  }

  handleChangeUserMantra = (data) => {
    this.props.dispatch(changeUserMantra(data))
  }

  handleSendUserMantra = (data) => {
    this.props.dispatch(sendUserMantra(data)) 
  }


  render() {
    const { mantra, user, storage, showSubscribeDialog, handleOpenSubscribeDialog, handleCloseSubscribeDialog, showAddMantraDialog } = this.props


    return (
      <div>
        {storage.get('showWelcomModal') &&
          <Dialog
            title={
              <h3 style={ { padding: '3rem 6vw 0 6vw', margin: '0', color: '#fafafa', backgroundColor: mantra.get('color'), fontWeight: '600', lineHeight: 'normal', fontSize: '3rem', fontFamily: '"Roboto","Helvetica","Arial",sans-serif' } } >
                Ежедневные мантры, цитаты и просто слова
                <br />
                от мотивированных людей
              </h3>
            }
            actions={
              [
                <FlatButton label="Читать" keyboardFocused={true} onTouchTap={this.handleCloseWelcomDialog} style={ { color: '#fafafa' } } />
              ]
            }
            modal={false}
            open={storage.get('showWelcomModal')}
            onRequestClose={this.handleCloseWelcomDialog}
            contentStyle={ { width: '100%', maxWidth: 'none', textAlign: 'center' } }
            bodyStyle={ { padding: '0' } }
            titleStyle={ { padding: '3rem 6vw 0 6vw', color: '#fafafa', backgroundColor: mantra.get('color'), fontWeight: '600', lineHeight: 'normal', fontSize: '3rem', fontFamily: '"Roboto","Helvetica","Arial",sans-serif' } }
            actionsContainerStyle= { { padding: '3rem 6vw 2rem 6vw', backgroundColor: mantra.get('color'), textAlign: 'center' } } />
        }

        {showSubscribeDialog &&
          <Dialog
            title={ user.get('email').get('isComplete') ? 'Вы успешно подписались на рассылку!' : 'Получай мантры каждый день на почту!' }
            actions={
              user.get('email').get('isComplete') ?
                [
                  <FlatButton
                    label="Закрыть"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={this.props.handleCloseSubscribeDialog} />,
                ] :
                [
                  <FlatButton
                    label="Отмена"
                    secondary={true}
                    onTouchTap={this.props.handleCloseSubscribeDialog} />,
                  <FlatButton
                    label="Подписаться"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={this.handleSendEmail} />,
                ]
            }
            modal={false}
            open={this.props.showSubscribeDialog}
            onRequestClose={this.props.handleCloseSubscribeDialog}>
              
              {!user.get('email').get('isComplete') &&
                <FormSubscribe 
                  emailSubscribe={ user.get('email') }
                  handleChangeEmail={ this.handleChangeEmail } 
                  handleSendEmail={ this.handleSendEmail } />
              }  

          </Dialog>
        }

        {showAddMantraDialog &&
          <Dialog
            title={ user.get('mantra').get('isComplete') ? 'Ваша мантра отправлена на модерцию!' : 'Добавить Мантру' }
            actions={ user.get('mantra').get('isComplete') ?
              [
                <FlatButton
                  label="Закрыть"
                  primary={true}
                  keyboardFocused={true}
                  onTouchTap={this.props.handleCloseAddMantraDialog} />,
              ] :
              [
                <FlatButton
                  label="Отмена"
                  secondary={true}
                  onTouchTap={this.props.handleCloseAddMantraDialog} />,
                <FlatButton
                  label="Добавить Мантру"
                  primary={true}
                  keyboardFocused={true}
                  onTouchTap={() => this.handleSendUserMantra( user.get('mantra') )} />,
              ]
            }
            modal={false}
            open={showAddMantraDialog}
            onRequestClose={this.props.handleCloseAddMantraDialog}>
              
              {!user.get('mantra').get('isComplete') &&
                <FormAddMantra 
                  userMantra={user.get('mantra')}
                  handleChangeUserMantra={this.handleChangeUserMantra} 
                  handleSendUserMantra={this.handleSendUserMantra} />
              
              }
          </Dialog>
        }
        
      </div>
    )
  }
}

Modal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  storage: PropTypes.instanceOf(Immutable.Map).isRequired,
  user: PropTypes.instanceOf(Immutable.Map).isRequired,

  mantra: PropTypes.instanceOf(Immutable.Map).isRequired,
  showSubscribeDialog: PropTypes.bool.isRequired,
  handleOpenSubscribeDialog: PropTypes.func.isRequired,
  handleCloseSubscribeDialog: PropTypes.func.isRequired,

  showAddMantraDialog: PropTypes.bool.isRequired,
  handleOpenAddMantraDialog: PropTypes.func.isRequired,
  handleCloseAddMantraDialog: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { storage, user } = state


  return {
    storage,
    user
  }
}

export default connect(mapStateToProps)(Modal)
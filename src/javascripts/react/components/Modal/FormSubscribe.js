import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import TextField from 'material-ui/lib/text-field'


export default class FormSubscribe extends Component {


  emailValueLink = (value) => {
    return {
      value: this.props.emailSubscribe.get('value'),
      requestChange: this.handleEmailChange
    }
  }

  handleEmailChange = (newEmail) => {
    this.props.handleChangeEmail(newEmail)
  } 

  render() {

    return (
      <form onSubmit={this.props.handleSendEmail}>
        <TextField 
          hintText="vasia.pupkin@gmail.com" 
          floatingLabelText="Ваша почта"
          valueLink={this.emailValueLink()}
          errorText={this.props.emailSubscribe.get('error') ? this.props.emailSubscribe.get('errorMsg') : ''}
          style={ { width: '100%' } } />
      </form>  
    )
  }
}


FormSubscribe.propTypes = {
  emailSubscribe: PropTypes.instanceOf(Immutable.Map).isRequired,
  handleChangeEmail: PropTypes.func.isRequired,
  handleSendEmail: PropTypes.func.isRequired
}
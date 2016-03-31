import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import TextField from 'material-ui/lib/text-field'


export default class FormAddMantra extends Component {


  emailValueLink = (value) => {
    return {
      value: this.props.userMantra.get('email'),
      requestChange: this.handleEmailChange
    }
  }
  handleEmailChange = (newEmail) => {
    this.props.handleChangeUserMantra(this.props.userMantra.set('email', newEmail))
  } 


  nameValueLink = (value) => {
    return {
      value: this.props.userMantra.get('name'),
      requestChange: (newName) => this.props.handleChangeUserMantra(this.props.userMantra.set('name', newName))
    }
  }

  companyValueLink = (value) => {
    return {
      value: this.props.userMantra.get('company'),
      requestChange: (newCompany) => this.props.handleChangeUserMantra(this.props.userMantra.set('company', newCompany))
    }
  }

  industryValueLink = (value) => {
    return {
      value: this.props.userMantra.get('industry'),
      requestChange: (newData) => this.props.handleChangeUserMantra(this.props.userMantra.set('industry', newData))
    }
  }
  
  siteValueLink = (value) => {
    return {
      value: this.props.userMantra.get('site'),
      requestChange: (newData) => this.props.handleChangeUserMantra(this.props.userMantra.set('site', newData))
    }
  }
  
  explanationValueLink = (value) => {
    return {
      value: this.props.userMantra.get('explanation'),
      requestChange: (newData) => this.props.handleChangeUserMantra(this.props.userMantra.set('explanation', newData))
    }
  }



  render() {

    return (
      <form onSubmit={() => this.props.handleSendUserMantra(this.props.userMantra)}>
        <TextField 
          floatingLabelText="Ваше имя"
          valueLink={this.nameValueLink()}
          style={ { width: '100%' } } />

        <TextField 
          floatingLabelText="Ваша Компания"
          valueLink={this.companyValueLink()}
          style={ { width: '100%' } } />

        <TextField 
          floatingLabelText="Сфера деятельности"
          valueLink={this.industryValueLink()}
          style={ { width: '100%' } } />

        <TextField 
          floatingLabelText="Сайт"
          valueLink={this.siteValueLink()}
          style={ { width: '100%' } } />

        <TextField 
          floatingLabelText="Пару слов о вашей цитате"
          valueLink={this.explanationValueLink()}
          multiLine={true}
          style={ { width: '100%' } } />

        <TextField 
          hintText="vasia.pupkin@gmail.com" 
          floatingLabelText="Ваша почта"
          valueLink={this.emailValueLink()}
          style={ { width: '100%' } } />
      </form>  
    )
  }
}


FormAddMantra.propTypes = {
  userMantra: PropTypes.instanceOf(Immutable.Map).isRequired,
  handleChangeUserMantra: PropTypes.func.isRequired,
  handleSendUserMantra: PropTypes.func.isRequired
}
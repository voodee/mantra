require("./lib/TweenMax.min")


import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './react/store/configureStore'
import { ReduxRouter } from 'redux-router'

const store = configureStore()


render(
  <Provider store={store}>
    <ReduxRouter />
  </Provider>,
  document.getElementById('root')
)
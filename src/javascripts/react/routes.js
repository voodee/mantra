import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App'
import Mantra from './containers/Mantra'
import HistoryPage from './containers/HistoryPage'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Mantra} />
    <Route path="/" component={Mantra}>
      <Route path="/mantra/:id" component={Mantra} />
    </Route>
    <Route path="/history" component={HistoryPage} />  
  </Route>
)
import React, { PropTypes } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import App from './App'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object,
}

export default Root

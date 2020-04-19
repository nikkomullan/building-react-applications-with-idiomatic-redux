import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

const persistedState = {
  todos: [
    {
      id: '111618a0-5d65-4c5b-9837-074e8661e3cf',
      text: 'Welcome back',
      completed: false,
    },
  ],
}

const store = createStore(todoApp, persistedState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

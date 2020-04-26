import { createStore } from 'redux'
import promise from 'redux-promise'
import logger from 'redux-logger'
import todoApp from './reducers'

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares
    .slice()
    .reverse()
    .forEach(middleware => {
      store.dispatch = middleware(store)(store.dispatch)
    })
}

const configureStore = () => {
  const store = createStore(todoApp)
  const middlewares = [promise]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }

  wrapDispatchWithMiddlewares(store, middlewares)

  return store
}

export default configureStore

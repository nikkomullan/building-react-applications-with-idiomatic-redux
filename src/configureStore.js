import { createStore } from 'redux'
import promise from 'redux-promise'
import todoApp from './reducers'

const logger = store => next => {
  if (!console.group) {
    return next
  }

  return action => {
    console.group(action.type)
    console.log('%c prev state', 'color: gray', store.getState())
    console.log('%c action', 'color: blue', action.type)
    const returnValue = next(action)
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

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

import { createStore, applyMiddleware, compose } from 'redux'
import getRootReducer from './rootReducer'
import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

function configureStore (state = {}) {
  return createStore(
    getRootReducer(history), // root reducer with router state
    state,
    compose(
      applyMiddleware(
        routerMiddleware(history) // for dispatching history actions
        // ... other middlewares ...
      )
    )
  )
}

export default configureStore

import data from './card-data/'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import debounceMiddleware from 'redux-debounced'
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

// middlewares
const middlewares = [debounceMiddleware(), thunkMiddleware]
if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware)
}
// Use this state unless hydrated
const defaultData = {
  protodecks: data,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const buildStore = reducers => {
  const store = createStore(
    combineReducers(reducers),
    defaultData,
    // composeEnhancers(applyMiddleware(...middlewares), autoRehydrate())
    composeEnhancers(applyMiddleware(...middlewares))
  )
  // persistStore(store)
  return store
}

export default buildStore

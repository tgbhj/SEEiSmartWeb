import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import Routers from './router/index'
import todoApp from './reducers/index'
import * as serviceWorker from './serviceWorker'

const store = createStore(todoApp, applyMiddleware(thunkMiddleware))

render(
    <Provider store={store}>
        <Routers />
    </Provider>,
    document.getElementById('root')
)

// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
serviceWorker.register()
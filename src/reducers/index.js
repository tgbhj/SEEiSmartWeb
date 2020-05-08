import { combineReducers } from 'redux'
import { userTodo } from '../reducers/user'
import { uiTodo } from '../reducers/ui'
import { aiTodo } from '../reducers/ai'

const todoApp = combineReducers({ userTodo, uiTodo, aiTodo })

export default todoApp
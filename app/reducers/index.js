import { combineReducers } from 'redux'
import {LoginReducer} from './LoginReducer'
import {EventReducer} from './EventReducer'

const rootReducer = combineReducers({
    LoginReducer,
    EventReducer
})

export default rootReducer;
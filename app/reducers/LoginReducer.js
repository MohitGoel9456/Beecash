import * as actionConstants from '../constants/actionConstants'

const INITIAL_STATE = {
    isLoggedIn: false,
    username: '',
}

export const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionConstants.USER_LOGGED_IN:
            return { ...state, isLoggedIn: action.payload.isLoggedIn, username: action.payload.username }
        default:
            return state
    }
}
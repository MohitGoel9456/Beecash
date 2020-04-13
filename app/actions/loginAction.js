import * as actionConstants from '../constants/actionConstants'

export const isUserLoggedIn = (isLoggedIn, username) => {
    return (dispatch) => {
        dispatch({
            type: actionConstants.USER_LOGGED_IN,
            payload: { isLoggedIn: isLoggedIn, username: username }
        })
    }
}
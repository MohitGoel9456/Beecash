import * as actionConstants from '../constants/actionConstants'

export const eventAdded = (isNewEventAdded) => {
    return (dispatch) => {
        dispatch({
            type: actionConstants.EVENT_ADDED,
            payload: isNewEventAdded
        })
    }
}
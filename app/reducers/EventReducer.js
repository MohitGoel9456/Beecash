import * as actionConstants from '../constants/actionConstants'

const INITIAL_STATE = {
    isNewEventAdded: false
}

export const EventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionConstants.EVENT_ADDED:
            return { ...state, isNewEventAdded: action.payload }
        default:
            return state
    }
}
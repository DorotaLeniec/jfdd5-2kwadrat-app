import {LOGGED_IN, LOGIN_TRIES, LOG_OUT} from './actionTypes'

const initialState = {
  loggedInStatus: false,
  loggedInUserId: null,
  loggingTests: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        loggedInStatus: true,
        loggingTests: false,
        loggedInUserId: action.userData.id,
      }
    case LOGIN_TRIES:
      return {
        ...state,
        loggingTests: true
      }
    case LOG_OUT:
      return {
        ...state,
        loggedInStatus: false
      }
    default:
      return state
  }
}

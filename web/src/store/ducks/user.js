/**
 * Types
 */

export const Types = {
  SET_STATE_REQUEST: 'user/SET_STATE_REQUEST',
  ADD_REQUEST: 'user/ADD_REQUEST',
  GET_REQUEST: 'user/GET_REQUEST',
  SUCCESS: 'user/SUCCESS',
  STATE_SUCCESS: 'user/STATE_SUCCESS',
  FAILURE: 'user/FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: {},
  error: '',
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
    case Types.GET_REQUEST:
    case Types.SET_STATE_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.data,
      }
    case Types.STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: { ...state.data, ...action.payload.data },
      }
    case Types.FAILURE:
      return { ...state, loading: false, error: action.payload.error }
    default:
      return state
  }
}

/**
 * Actions
 */
export const Creators = {
  addUserRequest: ({ name, email, password, passwordConfirmation }) => ({
    type: Types.ADD_REQUEST,
    payload: {
      name,
      email,
      password,
      passwordConfirmation,
    },
  }),

  setStateUserRequest: data => ({
    type: Types.SET_STATE_REQUEST,
    payload: data,
  }),

  getUserRequest: data => ({
    type: Types.GET_REQUEST,
    payload: data,
  }),

  userSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  userStateSuccess: data => ({
    type: Types.STATE_SUCCESS,
    payload: { data },
  }),

  userFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
}

/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'user/ADD_REQUEST',
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
      return { ...state, loading: true, error: '' }
    case Types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.data,
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

  userSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  userFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
}

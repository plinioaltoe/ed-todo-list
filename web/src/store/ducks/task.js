/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'taks/ADD_REQUEST',
  GET_REQUEST: 'taks/GET_REQUEST',
  DEL_REQUEST: 'taks/DEL_REQUEST',
  FINISH_REQUEST: 'taks/FINISH_REQUEST',
  SUCCESS: 'taks/SUCCESS',
  FAILURE: 'taks/FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: {},
  error: '',
}

export default function tasks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
    case Types.GET_REQUEST:
    case Types.FINISH_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      }
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
  addTaksRequest: payload => ({
    type: Types.ADD_REQUEST,
    payload,
  }),

  getTaksRequest: projectId => ({
    type: Types.GET_REQUEST,
    payload: {
      projectId,
    },
  }),

  finishTaksRequest: id => ({
    type: Types.FINISH_REQUEST,
    payload: {
      id,
    },
  }),

  delTaksRequest: id => ({
    type: Types.DEL_REQUEST,
    payload: {
      id,
    },
  }),

  taskSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  taksFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
}

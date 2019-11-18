/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'taks/ADD_REQUEST',
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
    case Types.DEL_REQUEST:
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
  addTaskRequest: payload => ({
    type: Types.ADD_REQUEST,
    payload,
  }),

  finishTaskRequest: id => ({
    type: Types.FINISH_REQUEST,
    payload: {
      id,
    },
  }),

  deleteTaskRequest: id => ({
    type: Types.DEL_REQUEST,
    payload: {
      id,
    },
  }),

  taskSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  taskFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
}

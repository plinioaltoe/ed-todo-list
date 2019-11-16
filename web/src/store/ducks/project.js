/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'project/ADD_REQUEST',
  GET_REQUEST: 'project/GET_REQUEST',
  DEL_REQUEST: 'project/DEL_REQUEST',
  SUCCESS: 'project/SUCCESS',
  FAILURE: 'project/FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: {},
  error: '',
}

export default function project(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
    case Types.GET_REQUEST:
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
  addProjectRequest: payload => ({
    type: Types.ADD_REQUEST,
    payload,
  }),

  getProjectRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  delProjectRequest: id => ({
    type: Types.DEL_REQUEST,
    payload: {
      id,
    },
  }),

  projectSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  projectFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
}

/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'project/ADD_REQUEST',
  UPDATE_REQUEST: 'project/UPDATE_REQUEST',
  GET_REQUEST: 'project/GET_REQUEST',
  DEL_REQUEST: 'project/DEL_REQUEST',
  SUCCESS: 'project/SUCCESS',
  ADD_SUCCESS: 'project/ADD_SUCCESS',
  UPDATE_SUCCESS: 'project/UPDATE_SUCCESS',
  DEL_SUCCESS: 'project/DEL_SUCCESS',
  FAILURE: 'project/FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: '',
}

export default function project(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.UPDATE_REQUEST:
    case Types.ADD_REQUEST:
    case Types.DEL_REQUEST:
    case Types.GET_REQUEST:
      return { ...state, loading: true, error: '' }
    case Types.SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.data,
      }
    }
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: [...state.data, action.payload.data],
      }
    case Types.UPDATE_SUCCESS: {
      const currentProject = state.data.findIndex(
        proj => proj.id === Number(action.payload.data.id),
      )
      state.data[currentProject] = {
        ...state.data[currentProject],
        description: action.payload.data.description,
      }
      return {
        ...state,
        loading: false,
        error: '',
      }
    }
    case Types.DEL_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        data: state.data.filter(proj => proj.id !== Number(action.payload.id)),
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
  addProjectRequest: payload => ({
    type: Types.ADD_REQUEST,
    payload,
  }),

  updateProjectRequest: payload => ({
    type: Types.UPDATE_REQUEST,
    payload,
  }),

  getProjectRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  deleteProjectRequest: id => ({
    type: Types.DEL_REQUEST,
    payload: {
      id,
    },
  }),

  projectSuccess: data => ({
    type: Types.SUCCESS,
    payload: { data },
  }),

  projectAddSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),

  projectUpdateSuccess: data => ({
    type: Types.UPDATE_SUCCESS,
    payload: { data },
  }),

  projectDelSuccess: id => ({
    type: Types.DEL_SUCCESS,
    payload: { id },
  }),

  projectFailure: error => ({
    type: Types.FAILURE,
    payload: { error },
  }),
}

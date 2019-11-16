import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../../routes/history'

import auth from './auth'
import user from './user'
import project from './project'
import task from './task'

export default combineReducers({
  router: connectRouter(history),
  auth,
  user,
  project,
  task,
})

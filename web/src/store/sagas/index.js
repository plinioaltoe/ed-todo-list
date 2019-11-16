import { all, takeLatest } from 'redux-saga/effects'
import { Types as AuthTypes } from '../ducks/auth'
import { Types as UserTypes } from '../ducks/user'
// import { Types as PreferenceTypes } from '../ducks/preference'
import { Types as ProjectTypes } from '../ducks/project'
import { Types as TaskTypes } from '../ducks/task'

import { signin } from './auth'
import { addUser, getUser } from './user'
// import { getPreferences } from './preference'
import { addProject, getProject } from './project'
import { addTask, getTask, finishTask } from './task'

export default function* rootSaga() {
  // User
  const userSignIn = takeLatest(AuthTypes.REQUEST, signin)
  const userAdd = takeLatest(UserTypes.ADD_REQUEST, addUser)
  const userGet = takeLatest(UserTypes.GET_REQUEST, getUser)

  // Projects
  const projectAdd = takeLatest(ProjectTypes.ADD_REQUEST, addProject)
  const projectGet = takeLatest(ProjectTypes.GET_REQUEST, getProject)

  // Tasks
  const taskAdd = takeLatest(TaskTypes.ADD_REQUEST, addTask)
  const taskGet = takeLatest(TaskTypes.GET_REQUEST, getTask)
  const taskFinish = takeLatest(TaskTypes.FINISH_REQUEST, finishTask)

  yield all([
    userSignIn,
    userAdd,
    userGet,
    projectAdd,
    projectGet,
    taskAdd,
    taskGet,
    taskFinish,
  ])
}
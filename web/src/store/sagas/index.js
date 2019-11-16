import { all, takeLatest } from 'redux-saga/effects'
import { Types as AuthTypes } from '../ducks/auth'
import { Types as UserTypes } from '../ducks/user'
import { Types as ProjectTypes } from '../ducks/project'
import { Types as TaskTypes } from '../ducks/task'

import { signin } from './auth'
import { addUser } from './user'
import { addProject, getProject, updateProject, deleteProject } from './project'
import { addTask, finishTask, deleteTask } from './task'

export default function* rootSaga() {
  // User
  const userSignIn = takeLatest(AuthTypes.REQUEST, signin)
  const userAdd = takeLatest(UserTypes.ADD_REQUEST, addUser)

  // Projects
  const projectAdd = takeLatest(ProjectTypes.ADD_REQUEST, addProject)
  const projectGet = takeLatest(ProjectTypes.GET_REQUEST, getProject)
  const projectDel = takeLatest(ProjectTypes.DEL_REQUEST, deleteProject)
  const projectUpdate = takeLatest(ProjectTypes.UPDATE_REQUEST, updateProject)

  // Tasks
  const taskAdd = takeLatest(TaskTypes.ADD_REQUEST, addTask)
  const taskFinish = takeLatest(TaskTypes.FINISH_REQUEST, finishTask)
  const taskDelete = takeLatest(TaskTypes.DEL_REQUEST, deleteTask)

  yield all([
    userSignIn,
    userAdd,
    projectAdd,
    projectGet,
    projectUpdate,
    projectDel,
    taskAdd,
    taskFinish,
    taskDelete,
  ])
}

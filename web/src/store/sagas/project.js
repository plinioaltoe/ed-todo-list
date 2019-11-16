import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { Creators as ProjectActions } from '../ducks/project'

export function* addProject(action) {
  try {
    const { payload: project } = action
    const { data } = yield call(api.post, `/projects/`, project)
    yield put(ProjectActions.projectAddSuccess(data))
    toast('Project succed add!')
    yield put(push('/main'))
  } catch (error) {
    const erroMsg = 'Erro ao adicionar projeto!'
    yield put(ProjectActions.projectFailure(erroMsg + error))
  }
}

export function* getProject() {
  try {
    const { data } = yield call(api.get, `/projects/`)
    console.tron.log(data)
    yield put(ProjectActions.projectSuccess(data))
  } catch (error) {
    const erroMsg = 'Erro ao buscar projeto!'
    yield put(ProjectActions.projectFailure(erroMsg + error))
  }
}

export function* updateProject(action) {
  try {
    const { payload: project } = action
    yield call(api.put, `/projects/${project.id}`, project)
    toast('Project succed updated!')
    yield put(ProjectActions.projectUpdateSuccess(project))
  } catch (error) {
    const erroMsg = 'Erro ao buscar tarefa!'
    yield put(ProjectActions.taskFailure(erroMsg + error))
  }
}

export function* deleteProject(action) {
  try {
    const { payload: project } = action
    const resp = yield call(api.delete, `/projects/${project.id}`)
    console.tron.log(resp, project)
    toast('Project succed deleted, so does its tasks!')
    yield put(ProjectActions.projectDelSuccess(project.id))
  } catch (error) {
    const erroMsg = 'Erro ao buscar tarefa!'
    yield put(ProjectActions.taskFailure(erroMsg + error))
  }
}

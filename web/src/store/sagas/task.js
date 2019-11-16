import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { Creators as TaskActions } from '../ducks/task'
import { Creators as ProjectActions } from '../ducks/project'

export function* addTask(action) {
  try {
    const { payload: task } = action
    const { data } = yield call(api.post, `/tasks`, task)
    console.tron.log('TAREFA', data)
    yield put(ProjectActions.getProjectRequest())
    toast('Tarefa adicionada com sucesso!')
    yield put(push('/main'))
  } catch (error) {
    const erroMsg = 'Erro ao adicionar tarefa!'
    yield put(TaskActions.taskFailure(erroMsg + error))
  }
}

export function* getTask(action) {
  try {
    const { payload } = action
    const { data } = yield call(api.get, `/tasks/project/${payload.projectId}`)
    yield put(TaskActions.taskSuccess({ tasks: data, projectId: payload.projectId }))
  } catch (error) {
    const erroMsg = 'Erro ao buscar tarefa!'
    yield put(TaskActions.taskFailure(erroMsg + error))
  }
}

export function* finishTask(action) {
  try {
    const { payload: task } = action
    const { data } = yield call(api.get, `/tasks/finish/${task.id}`)
    yield put(TaskActions.taskSuccess(data))
  } catch (error) {
    const erroMsg = 'Erro ao buscar tarefa!'
    yield put(TaskActions.taskFailure(erroMsg + error))
  }
}

import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { Creators as TaskActions } from '../ducks/task'
import { Creators as ProjectActions } from '../ducks/project'

export function* addTask(action) {
  try {
    const { payload: task } = action
    yield call(api.post, `/tasks`, task)
    yield put(ProjectActions.getProjectRequest())
    toast('Tarefa adicionada com sucesso!')
    yield put(push('/main'))
  } catch (error) {
    const erroMsg = 'Erro ao adicionar tarefa!'
    yield put(TaskActions.taskFailure(erroMsg + error))
  }
}

export function* finishTask(action) {
  try {
    const { payload: task } = action
    yield call(api.get, `/tasks/finish/${task.id}`)
    yield put(ProjectActions.getProjectRequest())
    toast('Task succed done!')
  } catch (error) {
    const erroMsg = 'Erro ao buscar tarefa!'
    yield put(TaskActions.taskFailure(erroMsg + error))
  }
}

export function* deleteTask(action) {
  try {
    const { payload: task } = action
    yield call(api.delete, `/tasks/${task.id}`)
    toast('Task succed deleted!')
    yield put(ProjectActions.getProjectRequest())
  } catch (error) {
    const erroMsg = 'Erro ao buscar tarefa!'
    yield put(TaskActions.taskFailure(erroMsg + error))
  }
}

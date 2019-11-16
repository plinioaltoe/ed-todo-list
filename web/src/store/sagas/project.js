import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { Creators as ProjectActions } from '../ducks/project'

export function* addProject(action) {
  try {
    const { payload: project } = action
    const { data } = yield call(api.post, `/projects/`, project)
    yield put(ProjectActions.projectSuccess(data))
    toast('Projeto adicionado com sucesso!')
    yield put(push('/main'))
  } catch (error) {
    const erroMsg = 'Erro ao adicionar projeto!'
    yield put(ProjectActions.projectFailure(erroMsg + error))
  }
}

export function* getProject() {
  try {
    const { data } = yield call(api.get, `/projects/`)
    yield put(ProjectActions.projectSuccess(data))
  } catch (error) {
    const erroMsg = 'Erro ao buscar projeto!'
    yield put(ProjectActions.projectFailure(erroMsg + error))
  }
}

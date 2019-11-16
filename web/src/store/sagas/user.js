import { call, put } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { Creators as UserActions } from '../ducks/user'
import { Creators as AuthActions } from '../ducks/auth'

export function* addUser(action) {
  try {
    const { payload: user } = action
    const { data } = yield call(api.post, `/users/`, user)
    yield put(UserActions.userSuccess(data))
    toast('Usuário adicionado com sucesso!')
    yield put(AuthActions.authRequest(user))
  } catch (error) {
    const erroMsg = 'Erro ao adicionar usuário! '
    yield put(UserActions.userFailure(erroMsg + error))
  }
}

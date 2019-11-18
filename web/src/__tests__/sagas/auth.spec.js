import { runSaga } from 'redux-saga'
import MockAdapter from 'axios-mock-adapter'
import { push } from 'connected-react-router'
import api from '../../services/api'
import * as m from '../../services/auth'
import { signin } from '../../store/sagas/auth'
import { Creators as AuthActions } from '../../store/ducks/auth'

const apiMock = new MockAdapter(api)
m.login = jest.fn()

describe('Auth Saga', () => {
  test('should be able to signin', async () => {
    const dispatched = []

    const initialAction = {
      payload: { email: 'teste@teste.com', password: '1234567' },
    }
    const response = { user: { name: 'teste' } }
    const responseSuccess = { name: 'teste' }

    apiMock.onPost('/sessions').reply(200, response)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      signin,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(AuthActions.authSuccess(responseSuccess))
    expect(dispatched).toContainEqual(push('/main'))
    expect(m.login).toHaveBeenCalled()
  })
})

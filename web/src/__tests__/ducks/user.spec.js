import userReducer, { Creators as UserActions } from '../../store/ducks/user'

describe('User Reducer', () => {
  test('should be able to call add request', () => {
    const any = {
      data: 'some data',
    }
    const state = userReducer({ data: {} }, UserActions.addUserRequest(any))
    expect(state.data).toEqual({})
    expect(state.loading).toBeTruthy()
    expect(state.error).toBe('')
  })

  test('should be able to get failure', () => {
    const error = 'deu erro'
    const state = userReducer({ data: {} }, UserActions.userFailure(error))
    expect(state.data).toEqual({})
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe(error)
  })

  test('should be able to add user on saga database', () => {
    const data = {
      email: 'plinioaltoe@yahoo.com.br',
      password: '123456',
    }
    const state = userReducer({ data: {} }, UserActions.userSuccess(data))
    expect(state.data).toEqual(data)
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe('')
  })
})

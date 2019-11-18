import taskReducer, { Creators as TaskActions } from '../../store/ducks/task'

describe('Task Reducer', () => {
  test('should be able to call add request', () => {
    const newData = { id: 1 }
    const state3 = taskReducer({ data: {} }, TaskActions.addTaskRequest({ newData }))
    expect(state3.data).toEqual({})
    expect(state3.loading).toBeTruthy()
    expect(state3.error).toBe('')
  })

  test('should be able to call update request', () => {
    const newData = { id: 1 }
    const state3 = taskReducer({ data: {} }, TaskActions.finishTaskRequest({ newData }))
    expect(state3.data).toEqual({})
    expect(state3.loading).toBeTruthy()
    expect(state3.error).toBe('')
  })

  test('should be able to call delete request', () => {
    const newData = { id: 1 }
    const state3 = taskReducer({ data: {} }, TaskActions.deleteTaskRequest({ newData }))
    expect(state3.data).toEqual({})
    expect(state3.loading).toBeTruthy()
    expect(state3.error).toBe('')
  })

  test('should be able to get failure', () => {
    const error = 'deu erro'
    const state = taskReducer({ data: {} }, TaskActions.taskFailure(error))
    expect(state.data).toEqual({})
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe(error)
  })

  test('should be able to call task success', () => {
    const data = {}
    const state = taskReducer({ data: {} }, TaskActions.taskSuccess(data))
    expect(state.data).toEqual(data)
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe('')
  })
})

import projectReducer, { Creators as ProjectActions } from '../../store/ducks/project'

describe('Project Reducer', () => {
  test('should be able to call get request', () => {
    const id = 0
    const state = projectReducer({ data: {} }, ProjectActions.getProjectRequest(id))
    expect(state.data).toEqual({})
    expect(state.loading).toBeTruthy()
    expect(state.error).toBe('')
  })

  test('should be able to call add request', () => {
    const eventDate = [0, 1]
    const state3 = projectReducer(
      { data: {} },
      ProjectActions.addProjectRequest({ eventDate }),
    )
    expect(state3.data).toEqual({})
    expect(state3.loading).toBeTruthy()
    expect(state3.error).toBe('')
  })

  test('should be able to call update request', () => {
    const eventDate = [0, 1]
    const state3 = projectReducer(
      { data: {} },
      ProjectActions.updateProjectRequest({ eventDate }),
    )
    expect(state3.data).toEqual({})
    expect(state3.loading).toBeTruthy()
    expect(state3.error).toBe('')
  })

  test('should be able to call delete request', () => {
    const eventDate = [0, 1]
    const state3 = projectReducer(
      { data: {} },
      ProjectActions.deleteProjectRequest({ eventDate }),
    )
    expect(state3.data).toEqual({})
    expect(state3.loading).toBeTruthy()
    expect(state3.error).toBe('')
  })

  test('should be able to get failure', () => {
    const error = 'deu erro'
    const state = projectReducer({ data: {} }, ProjectActions.projectFailure(error))
    expect(state.data).toEqual({})
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe(error)
  })

  test('should be able to add project', () => {
    const data = {
      data: 'some data',
    }
    const state = projectReducer({ data: {} }, ProjectActions.projectSuccess(data))
    expect(state.data).toEqual(data)
    expect(state.loading).toBeFalsy()
    expect(state.error).toBe('')
  })
})

import { runSaga } from 'redux-saga'
import MockAdapter from 'axios-mock-adapter'
import * as m from 'react-toastify'
import { push } from 'connected-react-router'
import api from '../../services/api'
import {
  addProject,
  getProject,
  updateProject,
  deleteProject,
} from '../../store/sagas/project'
import { Creators as ProjectActions } from '../../store/ducks/project'

const apiMock = new MockAdapter(api)
m.toast = jest.fn()

describe('Project Saga', () => {
  test('should be able to add Project', async () => {
    const dispatched = []

    const initialAction = { payload: { description: 'anything' } }
    const response = { project: 'add_success' }
    apiMock.onPost('/projects/').reply(200, response)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      addProject,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(ProjectActions.projectAddSuccess(response))
    expect(m.toast).toHaveBeenCalled()
    expect(dispatched).toContainEqual(push('/main'))
  })

  test('should failure to add Project', async () => {
    const dispatched = []

    const initialAction = { payload: { title: 'anything' } }
    const response =
      'Something wrong adding the project!Error: Request failed with status code 500'

    apiMock.onPost('/projects/').reply(500)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      addProject,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(ProjectActions.projectFailure(response))
  })

  test('should be able to get Project', async () => {
    const dispatched = []

    const initialAction = {}
    const response = { project: 'success' }
    apiMock.onGet(`/projects/`).reply(200, response)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      getProject,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(ProjectActions.projectSuccess(response))
  })

  test('should failure to get Project', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    apiMock.onGet(`/projects/`).reply(500)
    const response =
      'Something wrong getting projects!Error: Request failed with status code 500'
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      getProject,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(ProjectActions.projectFailure(response))
  })

  test('should be able to update a Project', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = { id: '1' }
    apiMock.onPut(`/projects/${initialAction.payload.id}`).reply(200, response)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      updateProject,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(ProjectActions.projectUpdateSuccess(response))
    expect(m.toast).toHaveBeenCalled()
  })

  test('should be able to delete a Project', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = '1'
    apiMock.onDelete(`/projects/${initialAction.payload.id}`).reply(200, response)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      deleteProject,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(ProjectActions.projectDelSuccess(response))
    expect(m.toast).toHaveBeenCalled()
  })
})

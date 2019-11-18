import { runSaga } from 'redux-saga'
import MockAdapter from 'axios-mock-adapter'
import * as m from 'react-toastify'
import { push } from 'connected-react-router'
import api from '../../services/api'
import { addTask, finishTask, deleteTask } from '../../store/sagas/task'
import { Creators as TaskActions } from '../../store/ducks/task'
import { Creators as ProjectActions } from '../../store/ducks/project'

const apiMock = new MockAdapter(api)
m.toast = jest.fn()

describe('Task Saga', () => {
  test('should be able to add Task', async () => {
    const dispatched = []

    const initialAction = { payload: { projectId: '1', description: 'anything' } }
    const response = { task: 'add_success' }
    apiMock.onPost('/tasks').reply(200, response)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      addTask,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(ProjectActions.getProjectRequest())
    expect(m.toast).toHaveBeenCalled()
    expect(dispatched).toContainEqual(push('/main'))
  })

  test('should failure to add Task', async () => {
    const dispatched = []

    const initialAction = { payload: { title: 'anything' } }
    const response =
      'Something wrong adding the task!Error: Request failed with status code 500'

    apiMock.onPost('/tasks').reply(500)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      addTask,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(TaskActions.taskFailure(response))
  })

  test('should be able to finish a Task', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = '1'
    apiMock.onGet(`/tasks/finish/${initialAction.payload.id}`).reply(200, response)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      finishTask,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(ProjectActions.getProjectRequest())
    expect(m.toast).toHaveBeenCalled()
  })

  test('should be able to delete a Task', async () => {
    const dispatched = []

    const initialAction = { payload: { id: '1' } }
    const response = '1'
    apiMock.onDelete(`/tasks/${initialAction.payload.id}`).reply(200, response)
    await runSaga(
      {
        dispatch: action => {
          dispatched.push(action)
        },
      },
      deleteTask,
      initialAction,
    ).toPromise()
    expect(dispatched).toContainEqual(ProjectActions.getProjectRequest())
    expect(m.toast).toHaveBeenCalled()
  })
})

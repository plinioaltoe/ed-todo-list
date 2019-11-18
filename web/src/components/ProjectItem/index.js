import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Container,
  Description,
  InputDiv,
  TextField,
  IconGroup,
  IconBtn,
  Button,
  Header,
  Error,
} from './styles'

import { Creators as ProjectActions } from '~/store/ducks/project'
import { Creators as TaskActions } from '~/store/ducks/task'
import TaskList from '../TaskList'

class ProjectItem extends Component {
  static propTypes = {
    addTaskRequest: PropTypes.func.isRequired,
    updateProjectRequest: PropTypes.func.isRequired,
    deleteProjectRequest: PropTypes.func.isRequired,
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      Tasks: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          description: PropTypes.string,
          done: PropTypes.bool,
          finished_at: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string,
          ]),
          user_id: PropTypes.number,
          project_id: PropTypes.number,
        }),
      ),
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      description: '',
      taskDescription: '',
      error: '',
      errorTask: '',
      errorProject: '',
      isEditionMode: false,
    }
  }

  componentDidMount = () => {
    const { project } = this.props
    const { description } = project
    this.setState({ description })
  }

  isEmpty = (campo, text) => {
    if (!text) {
      this.setState({
        [campo]: 'Name required.',
      })
      return true
    }
    return false
  }

  handleAdd = async e => {
    e.preventDefault()
    const { taskDescription } = this.state
    if (!this.isEmpty('errorTask', taskDescription)) {
      const { addTaskRequest, project } = this.props
      await addTaskRequest({ description: taskDescription, projectId: project.id })
      this.setState({ taskDescription: '' })
    }
  }

  handleChange = (e, campo) => {
    this.setState({ [campo]: e.target.value, error: '', errorProject: '', errorTask: '' })
  }

  handleDelete = () => {
    const { deleteProjectRequest, project } = this.props
    deleteProjectRequest(project.id)
  }

  handleChangeEditar = () => {
    const { isEditionMode } = this.state
    this.setState({ isEditionMode: !isEditionMode })
  }

  handleEditar = e => {
    e.preventDefault()
    const { description } = this.state
    if (!this.isEmpty('errorProject', description)) {
      const { updateProjectRequest, project } = this.props
      updateProjectRequest({ id: project.id, description })
      this.handleChangeEditar()
    }
  }

  handleCancel = () => {
    const { project } = this.props
    this.setState({
      isEditionMode: false,
      description: project.description,
      errorProject: '',
    })
  }

  render() {
    const {
      description,
      taskDescription,
      error,
      errorTask,
      errorProject,
      loading,
      isEditionMode,
    } = this.state
    const { project } = this.props
    const { Tasks: tasks } = project

    const tasksDone = Array.isArray(tasks) ? tasks.filter(task => task.done) : []
    const tasksToDo = Array.isArray(tasks) ? tasks.filter(task => !task.done) : []
    return (
      <Container>
        {error && <Error project>{error}</Error>}
        {errorProject && <Error project>{errorProject}</Error>}
        <Header>
          {isEditionMode ? (
            <form onSubmit={this.handleEditar}>
              <InputDiv>
                <TextField
                  type="text"
                  placeholder="Project name"
                  onChange={e => this.handleChange(e, 'description')}
                  value={description}
                />
                <IconGroup>
                  <IconBtn value={project.id}>
                    <i className="fa fa-check" />
                  </IconBtn>
                  <IconBtn value={project.id} onClick={this.handleCancel}>
                    <i className="fa fa-ban" />
                  </IconBtn>
                </IconGroup>
              </InputDiv>
            </form>
          ) : (
            <Fragment>
              <Description>{description}</Description>
              <div>
                <IconBtn onClick={this.handleDelete}>
                  <i className="fa fa-trash" />
                </IconBtn>
                <IconBtn onClick={this.handleChangeEditar}>
                  <i className="fa fa-pencil" />
                </IconBtn>
              </div>
            </Fragment>
          )}
        </Header>
        <TaskList title="To Do" tasks={tasksToDo} />
        <TaskList title="Done" tasks={tasksDone} disabled />

        <hr />
        {error && <Error>{error}</Error>}
        {errorTask && <Error>{errorTask}</Error>}
        <form onSubmit={this.handleAdd}>
          <InputDiv padding>
            <TextField
              isTask
              type="text"
              placeholder="Task name"
              onChange={e => this.handleChange(e, 'taskDescription')}
              value={taskDescription}
            />
            <Button type="submit">
              {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Add'}
            </Button>
          </InputDiv>
        </form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ProjectActions, ...TaskActions }, dispatch)

export default connect(null, mapDispatchToProps)(ProjectItem)

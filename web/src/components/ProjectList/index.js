import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Container,
  Description,
  InputDiv,
  TextField,
  IconBtn,
  Button,
  Header,
  TextFieldNewTask,
} from './styles'

import { Creators as ProjectActions } from '../../store/ducks/project'
import { Creators as TaskActions } from '../../store/ducks/task'
import TaskList from '../TaskList'

class ProjectList extends Component {
  static propTypes = {
    addTaksRequest: PropTypes.func.isRequired,
    updateProjectRequest: PropTypes.func.isRequired,
    deleteProjectRequest: PropTypes.func.isRequired,
    project: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.number]))
      .isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      description: props.project.name,
      taskDescription: '',
      error: '',
      errorLocalMessage: '',
      isEditionMode: false,
    }
  }

  componentWillMount = () => {
    const { project } = this.props
    const { description } = project
    this.setState({ description })
  }

  isEmpty = () => {
    const { taskDescription } = this.state
    if (!taskDescription) {
      this.setState({
        errorLocalMessage: 'Name required.',
      })
      return true
    }
    return false
  }

  handleAdd = async e => {
    e.preventDefault()
    if (!this.isEmpty()) {
      const { addTaksRequest, project } = this.props
      const { taskDescription } = this.state
      await addTaksRequest({ description: taskDescription, projectId: project.id })
      this.setState({ taskDescription: '' })
    }
  }

  handleChange = (e, campo) => {
    this.setState({ [campo]: e.target.value })
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
    const { updateProjectRequest, project } = this.props
    updateProjectRequest({ id: project.id, description })
    this.handleChangeEditar()
  }

  render() {
    const {
      description,
      taskDescription,
      error,
      errorLocalMessage,
      loading,
      isEditionMode,
    } = this.state
    const { project } = this.props
    const { Tasks: tasks } = project

    const tasksDone = Array.isArray(tasks) && tasks.filter(task => task.done)
    const tasksToDo = Array.isArray(tasks) && tasks.filter(task => !task.done)
    return (
      <Container>
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
                <IconBtn value={project.id}>
                  <i className="fa fa-check" />
                </IconBtn>
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
        <form onSubmit={this.handleAdd}>
          <InputDiv padding>
            {error && <p>{error}</p>}
            {errorLocalMessage && <p>{errorLocalMessage}</p>}
            <TextFieldNewTask
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

export default connect(() => {}, mapDispatchToProps)(ProjectList)

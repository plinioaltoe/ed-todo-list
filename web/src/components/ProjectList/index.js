import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, TextField, Button, Checkbox, Form } from './styles'

import { Creators as ProjectActions } from '../../store/ducks/project'
import { Creators as TaskActions } from '../../store/ducks/task'
import TaskList from '../TaskList'

class ProjectList extends Component {
  static propTypes = {
    finishTaksRequest: PropTypes.func.isRequired,
    addTaksRequest: PropTypes.func.isRequired,
    getTaksRequest: PropTypes.func.isRequired,
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

  handleChange = e => {
    this.setState({ taskDescription: e.target.value })
  }

  handleDelete = e => {
    const { deleteProjectRequest } = this.props
    deleteProjectRequest(e.target.value)
  }

  render() {
    const { description, taskDescription, error, errorLocalMessage, loading } = this.state
    const { project } = this.props
    const { Tasks: tasks } = project

    const tasksDone = Array.isArray(tasks) && tasks.filter(task => task.done)
    const tasksToDo = Array.isArray(tasks) && tasks.filter(task => !task.done)
    return (
      <Container>
        <div>
          <div>{description}</div>
          <Button value={project.id} onClick={this.handleDelete}>
            Excluir
          </Button>
        </div>
        <TaskList title="To Do" tasks={tasksToDo} />
        <TaskList title="Done" tasks={tasksDone} disabled />

        <Form onSubmit={this.handleAdd}>
          {error && <p>{error}</p>}
          {errorLocalMessage && <p>{errorLocalMessage}</p>}
          <TextField
            type="text"
            placeholder="Task name"
            onChange={this.handleChange}
            value={taskDescription}
          />
          <Button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Add'}
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ProjectActions, ...TaskActions }, dispatch)

export default connect(() => {}, mapDispatchToProps)(ProjectList)

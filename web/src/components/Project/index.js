import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, TextField, Button, Checkbox, Form } from './styles'

import { Creators as ProjectActions } from '../../store/ducks/project'
import { Creators as TaskActions } from '../../store/ducks/task'

class Project extends Component {
  static propTypes = {
    finishTaksRequest: PropTypes.func.isRequired,
    addTaksRequest: PropTypes.func.isRequired,
    getTaksRequest: PropTypes.func.isRequired,
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
    const { project, getTaksRequest } = this.props
    const { description } = project
    this.setState({ description })
    getTaksRequest(project.id)
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

  handleCheck = e => {
    const { finishTaksRequest } = this.props
    finishTaksRequest(e.target.value)
  }

  handleChange = e => {
    this.setState({ taskDescription: e.target.value })
  }

  render() {
    const { description, taskDescription, error, errorLocalMessage, loading } = this.state
    const { project } = this.props
    const { Tasks: tasks } = project

    const tasksDone = Array.isArray(tasks) && tasks.filter(task => task.done)
    const tasksNotDone = Array.isArray(tasks) && tasks.filter(task => !task.done)
    return (
      <Container>
        <ul>
          <li>
            <div>{description}</div>
          </li>
          <li>
            <div>To Do</div>
          </li>
          {tasksDone &&
            tasksDone.map(task => {
              return (
                <li key={task.id}>
                  <Checkbox
                    value={task.id}
                    onChange={this.handleCheck}
                    type="checkbox"
                    checked={task.done}
                  />
                  <div>{task.description}</div>
                </li>
              )
            })}
        </ul>
        <ul>
          <li>
            <div>Done</div>
          </li>
          {tasksNotDone &&
            tasksNotDone.map(task => {
              return (
                <li key={task.id}>
                  <Checkbox
                    value={task.id}
                    onChange={this.handleCheck}
                    type="checkbox"
                    checked={task.done}
                  />
                  <div>{task.description}</div>
                </li>
              )
            })}
        </ul>

        <Form onSubmit={this.handleAdd}>
          {error && <p>{error}</p>}
          {errorLocalMessage && <p>{errorLocalMessage}</p>}
          <TextField
            type="description"
            placeholder="Project name"
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

const mapStateToProps = state => ({
  tasks: state.task.data,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ProjectActions, ...TaskActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Project)

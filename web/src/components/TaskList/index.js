import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container } from './styles'

import { Creators as TaskActions } from '~/store/ducks/task'
import TaskItem from '../TaskItem'

class TaskList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    finishTaskRequest: PropTypes.func.isRequired,
    deleteTaskRequest: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string,
        done: PropTypes.bool,
        finished_at: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
        user_id: PropTypes.number,
        project_id: PropTypes.number,
      }),
    ).isRequired,
  }

  handleCheck = e => {
    const { finishTaskRequest } = this.props
    finishTaskRequest(e.target.value)
  }

  handleDelete = e => {
    const { deleteTaskRequest } = this.props
    deleteTaskRequest(e.target.value)
  }

  render() {
    const { tasks, title } = this.props
    return (
      <Container>
        <span>{title}</span>
        <ul>
          {Array.isArray(tasks) &&
            tasks.map(task => {
              return (
                <li key={task.id}>
                  <TaskItem task={task} />
                </li>
              )
            })}
        </ul>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(TaskActions, dispatch)

export default connect(null, mapDispatchToProps)(TaskList)

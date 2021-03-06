import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Container, Checkbox, Icon, IconGroup, Text } from './styles'

import { Creators as TaskActions } from '~/store/ducks/task'

class TaskList extends Component {
  static propTypes = {
    finishTaskRequest: PropTypes.func.isRequired,
    deleteTaskRequest: PropTypes.func.isRequired,
    task: PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      done: PropTypes.bool,
      finished_at: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
      user_id: PropTypes.number,
      project_id: PropTypes.number,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    }
  }

  get terminationDate() {
    const { task } = this.props
    return `This task was finished at ${moment(task.finished_at).format(
      'MMMM Do YYYY, h:mm',
    )}`
  }

  handleCheck = () => {
    const { checked } = this.state
    this.setState({ checked: !checked })
  }

  handleFinish = () => {
    const { finishTaskRequest, task } = this.props
    finishTaskRequest(task.id)
  }

  handleDelete = () => {
    const { deleteTaskRequest, task } = this.props
    deleteTaskRequest(task.id)
  }

  render() {
    const { task } = this.props
    const { checked } = this.state
    return (
      <Container>
        <Checkbox
          value={task.id}
          onChange={this.handleCheck}
          type="checkbox"
          checked={checked || task.done}
          disabled={task.done}
        />
        {task.done ? (
          <Tooltip title={this.terminationDate}>
            <Text done={task.done}>{task.description}</Text>
          </Tooltip>
        ) : (
          <Text done={task.done}>{task.description}</Text>
        )}
        {!task.done && checked && (
          <IconGroup>
            <Icon value={task.id} onClick={this.handleDelete}>
              <i className="fa fa-trash" />
            </Icon>
            <Icon value={task.id} onClick={this.handleFinish}>
              <i className="fa fa-check" />
            </Icon>
          </IconGroup>
        )}
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(TaskActions, dispatch)

export default connect(null, mapDispatchToProps)(TaskList)

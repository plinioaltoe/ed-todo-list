import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Checkbox, Button } from './styles'

import { Creators as ProjectActions } from '../../store/ducks/project'
import { Creators as TaskActions } from '../../store/ducks/task'

class TaskList extends Component {
  static propTypes = {
    finishTaksRequest: PropTypes.func.isRequired,
    deleteTaksRequest: PropTypes.func.isRequired,
    project: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.number]))
      .isRequired,
  }

  handleCheck = e => {
    const { finishTaksRequest } = this.props
    finishTaksRequest(e.target.value)
  }

  handleDelete = e => {
    const { deleteTaksRequest } = this.props
    deleteTaksRequest(e.target.value)
  }

  render() {
    const { tasks, title, disabled } = this.props
    return (
      <Container>
        <div>{title}</div>
        <ul>
          {tasks &&
            tasks.map(task => {
              return (
                <li key={task.id}>
                  <Checkbox
                    value={task.id}
                    onChange={this.handleCheck}
                    type="checkbox"
                    checked={task.done}
                    disabled={disabled}
                  />
                  <div>{task.description}</div>
                  {!disabled && (
                    <Button value={task.id} onClick={this.handleDelete}>
                      Excluir
                    </Button>
                  )}
                </li>
              )
            })}
        </ul>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ProjectActions, ...TaskActions }, dispatch)

export default connect(() => {}, mapDispatchToProps)(TaskList)

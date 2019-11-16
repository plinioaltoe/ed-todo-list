import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Creators as AuthActions } from '~/store/ducks/auth'
import { Creators as ProjectActions } from '~/store/ducks/project'

import { Container, TextField, Button, Form } from './styles'

class ProjectAdd extends Component {
  static propTypes = {
    addProjectRequest: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      errorLocalMessage: '',
      description: '',
    }
  }

  isEmpty = () => {
    const { description } = this.state
    if (!description) {
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
      const { addProjectRequest } = this.props
      const { description } = this.state
      await addProjectRequest({ description })
      this.setState({ description: '' })
    }
  }

  handleChange = e => {
    this.setState({ description: e.target.value })
  }

  render() {
    const { description, errorLocalMessage } = this.state
    const { error, loading } = this.props
    return (
      <Fragment>
        <Container>
          <Form onSubmit={this.handleAdd}>
            <p>Create a new project</p>
            {error && <p>{error}</p>}
            {errorLocalMessage && <p>{errorLocalMessage}</p>}
            <TextField
              type="description"
              placeholder="Project name"
              onChange={this.handleChange}
              value={description}
            />
            <Button type="submit">
              {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Create project'}
            </Button>
          </Form>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ProjectActions, ...AuthActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd)

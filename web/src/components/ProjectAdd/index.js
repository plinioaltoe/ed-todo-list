import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Creators as AuthActions } from '~/store/ducks/auth'
import { Creators as ProjectActions } from '~/store/ducks/project'

import { Container, TextField, Button, Form, Text, Error } from './styles'

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
    this.setState({ description: e.target.value, errorLocalMessage: '' })
  }

  render() {
    const { description, errorLocalMessage } = this.state
    const { error, loading } = this.props
    return (
      <Container>
        <Form onSubmit={this.handleAdd}>
          <Text>Create a new project</Text>
          {error && <Error>{error}</Error>}
          {errorLocalMessage && <Error>{errorLocalMessage}</Error>}
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

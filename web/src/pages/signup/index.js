import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import UserInputs from '../../components/UserInputs'
import { Creators as UserActions } from '../../store/ducks/user'
import { Container, Button, Text, Error, Form } from './styles'

class Signup extends Component {
  static propTypes = {
    addUserRequest: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errorLocalMessage: '',
  }

  isEmpty = () => {
    const { name, email, password, passwordConfirmation } = this.state
    if (!name) {
      this.setState({
        errorLocalMessage: 'Name required.',
      })
      return true
    }
    if (!email) {
      this.setState({
        errorLocalMessage: 'E-mail required.',
      })
      return true
    }
    if (!password) {
      this.setState({
        errorLocalMessage: 'Password required.',
      })
      return true
    }
    if (!passwordConfirmation) {
      this.setState({
        errorLocalMessage: 'Confirmation required.',
      })
      return true
    }
    if (password !== passwordConfirmation) {
      this.setState({
        errorLocalMessage: `Passwords don't match .`,
      })
      return true
    }
    return false
  }

  handleSignup = e => {
    e.preventDefault()
    if (!this.isEmpty()) {
      const { addUserRequest } = this.props
      const { name, email, password, passwordConfirmation } = this.state
      addUserRequest({
        name,
        email,
        password,
        passwordConfirmation,
      })
    }
  }

  handleChange = (e, campo) => {
    this.setState({
      [campo]: e.target.value,
      errorLocalMessage: '',
    })
  }

  render() {
    const { name, email, password, passwordConfirmation, errorLocalMessage } = this.state
    const { error, loading } = this.props
    const user = {
      name,
      email,
      password,
      passwordConfirmation,
    }
    return (
      <Container>
        <Form onSubmit={this.handleSignup}>
          {error && <Error>{error}</Error>}
          {errorLocalMessage && <Error>{errorLocalMessage}</Error>}
          <UserInputs display="signup" user={user} handleChange={this.handleChange} />
          <Button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Criar conta'}
          </Button>
          <Link to="/">
            <Text>Já tenho conta</Text>
          </Link>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  error: state.user.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

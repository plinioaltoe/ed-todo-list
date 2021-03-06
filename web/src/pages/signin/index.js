import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserInputs from '../../components/UserInputs'

import { Creators as AuthActions } from '../../store/ducks/auth'

import { Container, Button, Text, Form, Error } from './styles'

class Signin extends Component {
  static propTypes = {
    authRequest: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      errorLocalMessage: '',
      email: '',
      password: '',
    }
  }

  isEmpty = () => {
    const { email, password } = this.state
    if (!email) {
      this.setState({
        errorLocalMessage: 'E-mail obrigatório.',
      })
      return true
    }
    if (!password) {
      this.setState({
        errorLocalMessage: 'Password obrigatório.',
      })
      return true
    }
    return false
  }

  handleSignIn = async e => {
    e.preventDefault()
    if (!this.isEmpty()) {
      const { authRequest } = this.props
      const { email, password } = this.state
      await authRequest({ email, password })
    }
  }

  handleChange = (e, campo) => {
    this.setState({ [campo]: e.target.value, errorLocalMessage: '' })
  }

  render() {
    const { email, password, errorLocalMessage } = this.state
    const user = { email, password }
    const { error, loading } = this.props
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          {error && <Error>{error}</Error>}
          {errorLocalMessage && <Error>{errorLocalMessage}</Error>}
          <UserInputs display="signin" user={user} handleChange={this.handleChange} />
          <Button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Entrar'}
          </Button>
          <Link to="/signup">
            <Text>Criar conta</Text>
          </Link>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
})

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signin)

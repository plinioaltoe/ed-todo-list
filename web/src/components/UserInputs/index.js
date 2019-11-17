import React from 'react'
import PropTypes from 'prop-types'

import { Container, TextField, Text } from './styles'

const UserInputs = ({ display, handleChange, user }) => (
  <Container>
    {display !== 'signin' && <Text>Nome</Text>}
    {display !== 'signin' && (
      <TextField
        type="text"
        placeholder="Type your name"
        onChange={e => handleChange(e, 'name')}
        value={user.username}
      />
    )}
    {display !== 'profile' && <Text>E-mail</Text>}
    {display !== 'profile' && (
      <TextField
        type="email"
        placeholder="Type your e-mail"
        onChange={e => handleChange(e, 'email')}
        value={user.email}
      />
    )}
    <Text>Senha</Text>
    <TextField
      placeholder="Secret password"
      type="password"
      onChange={e => handleChange(e, 'password')}
      value={user.password}
    />
    {display !== 'signin' && <Text>Confirmação de senha</Text>}
    {display !== 'signin' && (
      <TextField
        placeholder="Confirm your password"
        type="password"
        onChange={e => handleChange(e, 'passwordConfirmation')}
        value={user.passwordConfirmation}
      />
    )}
  </Container>
)

UserInputs.propTypes = {
  display: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    passwordConfirmation: PropTypes.string,
  }).isRequired,
}

export default UserInputs

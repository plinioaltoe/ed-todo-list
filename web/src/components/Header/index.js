import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../services/auth'
import { Container, Menu, MenuProfile } from './styles'

const Header = ({ name }) => (
  <Container>
    <div id="img">
      <img src="" alt="logo" />
    </div>
    <Menu>
      <Link to="/dashboard" id="link-dashboard">
        EDirectinsure TODO List
      </Link>
    </Menu>
    <MenuProfile>
      <img src="" alt="nome" />

      <ul>
        <li>
          <Link to="/profile" id="link-profile">
            {name}
          </Link>
        </li>
        <li>
          <Link onClick={() => logout()} to="/" id="link-logout">
            Logout
          </Link>
        </li>
      </ul>
    </MenuProfile>
  </Container>
)

const mapStateToProps = state => {
  return { name: state.auth.data.name }
}

export default connect(mapStateToProps)(Header)

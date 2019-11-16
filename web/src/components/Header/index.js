import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../services/auth'
import { Container, Menu, MenuProfile } from './styles'

const Header = ({ name }) => (
  <Container>
    <Menu>EDirectinsure TODO List</Menu>
    <MenuProfile>
      <div>
        {name}
        <i className="fa fa-caret-down" />
      </div>
      <ul>
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

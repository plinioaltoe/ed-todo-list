import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '~/components/Header'
// import MeetupList from '~/components/MeetupList'
import { Creators as ProjectActions } from '~/store/ducks/project'
import { propTypes } from './propTypes'
import { TextField, Container, ContainerList, ContentList } from './styles'
import ProjectAdd from '~/components/ProjectAdd'
import Project from '~/components/Project'

class Main extends Component {
  static propTypes = propTypes

  state = {
    title: '',
  }

  componentWillMount = () => {
    this.handleSearch()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.handleSearch()
  }

  handleSearch = () => {
    const { getProjectRequest } = this.props
    getProjectRequest()
  }

  render() {
    const { location, projects } = this.props
    const { title } = this.state
    const searchBar = (
      <Container onSubmit={this.handleSubmit}>
        <button id="search" type="submit">
          <i className="fa fa-search" />
        </button>
        <TextField
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
      </Container>
    )
    return (
      <Fragment>
        <Header />
        {location.pathname === '/search' && searchBar}
        <ContainerList>
          <ContentList>
            {projects && projects.map(project => <Project project={project} />)}
          </ContentList>
          <ContentList>Próximos Meetups</ContentList>
          <ProjectAdd />
        </ContainerList>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  projects: state.project.data,
})
const mapDispatchToProps = dispatch => bindActionCreators(ProjectActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)

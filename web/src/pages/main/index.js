import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '~/components/Header'
// import MeetupList from '~/components/MeetupList'
import { Creators as ProjectActions } from '~/store/ducks/project'
import { propTypes } from './propTypes'
import { TextField, Container, ContainerList, ContentList } from './styles'
import ProjectAdd from '~/components/ProjectAdd'
import ProjectList from '~/components/ProjectList'

class Main extends Component {
  static propTypes = propTypes

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
    const { projects } = this.props

    return (
      <Fragment>
        <Header />
        <ContainerList>
          <ContentList>
            {Array.isArray(projects) &&
              projects.map(project => <ProjectList key={project.id} project={project} />)}
          </ContentList>
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

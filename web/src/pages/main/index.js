import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '~/components/Header'
import { Creators as ProjectActions } from '~/store/ducks/project'
import { propTypes } from './propTypes'
import { Content, Container } from './styles'
import ProjectAdd from '~/components/ProjectAdd'
import ProjectItem from '~/components/ProjectItem'

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
        <Container>
          <Content>
            {Array.isArray(projects) &&
              projects.map(project => <ProjectItem key={project.id} project={project} />)}
          </Content>
          <ProjectAdd />
        </Container>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  projects: state.project.data,
})
const mapDispatchToProps = dispatch => bindActionCreators(ProjectActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)

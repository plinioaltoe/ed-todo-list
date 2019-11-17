import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Header from '~/components/Header'
import { Creators as ProjectActions } from '~/store/ducks/project'
import { Content, Container } from './styles'
import ProjectAdd from '~/components/ProjectAdd'
import ProjectItem from '~/components/ProjectItem'

class Main extends Component {
  static propTypes = {
    getProjectRequest: PropTypes.func.isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        Tasks: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string,
            done: PropTypes.bool,
            finished_at: PropTypes.oneOfType([
              PropTypes.instanceOf(Date),
              PropTypes.string,
            ]),
            user_id: PropTypes.number,
            project_id: PropTypes.number,
          }),
        ),
      }),
    ).isRequired,
  }

  componentDidMount = () => {
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

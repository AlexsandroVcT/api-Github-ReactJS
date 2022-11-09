import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../services/api'

import Container from '../../components/Container'
import { Loading, Owner, IssueList } from '../Repository/style'

export default class Repository extends Component {
  static propTypes = {
    mathc: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      })
    }).isRequired,
  }

  state = {
    repository: {},
    issues: [],
    loading: 1,
  }

  async componentDidMount() {
    const { match } = this.props

    const repoName = decodeURIComponent(match.params.repository)
    console.log(repoName)
    // api.github.com/repos/rocketseat/unform
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        }
      })
    ])
    // console.log(repository)
    // console.log(issues)
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: 0,
    })
  }

  render() {
    const { repository, issues, loading } = this.state

    if (loading) {
      return <Loading>Carregando</Loading>
    }

    return (

    <Container>
      <Owner>
        <Link to="/">Voltar aos repositõrios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p> {/* name */}
      </Owner>

      <IssueList>
        {issues.map(issue => {
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        })}
      </IssueList>

    </Container>
    )
  }
}

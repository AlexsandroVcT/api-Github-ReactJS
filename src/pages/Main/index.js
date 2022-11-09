import React, { Component } from 'react'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import Container from '../../components/Container'
import { Form, SubmitButton, List } from './style'

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: 0,
  }

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories')

    if (repositories){
      this.setState({ repositories: JSON.parse(repositories) })

    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state

    if(prevState.repositories !== repositories) {
      localStorage.setItem('repositores', JSON.stringify(repositories))
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    this.setState({ loading: 1})
    setTimeout(() => {
      this.setState({loading: 0 })
    }, 2000)

    const { newRepo, repositories } = this.state

    const response = await api.get(`/repos/${newRepo}`)

    const data = {
      name: response.data.full_name,
    }

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
     })
  }

  render () {
    const { newRepo, repositories, loading } = this.state

    return (
      <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

    <Form onSubmit={this.handleSubmit}>
      <input
      type="text"
      placeholder="Adionar repositório"
      value={newRepo}
      onChange={this.handleInputChange}
      />

      <SubmitButton loading={loading}>
        { loading ? (
        <FaSpinner color="#FFF" size={14} />
        ) : (
          <FaPlus color="#FFF" size={14} />
        )}
      </SubmitButton>
    </Form>

    <List>
      {repositories.map(r => (
        <li key={r.name}>
          <span>{r.name}</span>
          <Link to={`/repository/${encodeURIComponent(r.name)}`}>Detalhes</Link>
        </li>
      ))}
    </List>
  </Container>
    )
  }
}


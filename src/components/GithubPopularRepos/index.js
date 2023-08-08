import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    apiFilterId: languageFiltersData[0].id,
    popularData: [],
    isLoading: true,
    isPageError: false,
  }

  componentDidMount() {
    this.getApiData()
  }

  isTypeClicked = typeId => {
    this.setState({apiFilterId: typeId}, this.getApiData)
  }

  getApiData = async () => {
    this.setState({isLoading: true})
    const {apiFilterId} = this.state
    console.log(apiFilterId)
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${apiFilterId}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const formattedData = fetchedData.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        id: eachItem.id,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      console.log(response)
      this.setState({popularData: formattedData, isLoading: false})
    } else if (response.status === 401) {
      this.setState({isLoading: false, isPageError: true})
    }
  }

  getFetchResponse = () => {
    const {popularData, isLoading, apiFilterId} = this.state
    return (
      <div className="main-cont">
        <div className="site-card">
          <div>
            <h1 className="title">Popular</h1>
          </div>
          <ul className="ul-card">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                filterDetails={eachItem}
                key={eachItem.id}
                isTypeClicked={this.isTypeClicked}
                typeStatus={eachItem.id === apiFilterId}
              />
            ))}
          </ul>
          {isLoading ? (
            <div data-testid="loader" className="loader">
              <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
            </div>
          ) : (
            <div className="api-data-card">
              {popularData.map(eachItem => (
                <RepositoryItem itemDetails={eachItem} key={eachItem.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  render() {
    const {isPageError} = this.state
    return (
      <div>
        {isPageError ? (
          <div className="pageError-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
              className="error-page"
            />
            <p>Something went wrong</p>
          </div>
        ) : (
          this.getFetchResponse()
        )}
      </div>
    )
  }
}

export default GithubPopularRepos

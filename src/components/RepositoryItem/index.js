import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = itemDetails
  return (
    <li className="tab-ele">
      <img src={avatarUrl} alt={name} />
      <h2 className="name">{name}</h2>

      <p className="stars">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo"
        />
        {starsCount} stars
      </p>

      <p className="forks">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo"
        />
        {forksCount} forks
      </p>
      <p className="issues">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logo"
        />
        {issuesCount} open issues
      </p>
    </li>
  )
}
export default RepositoryItem

import './index.css'

const LanguageFilterItem = props => {
  const {filterDetails, isTypeClicked, typeStatus} = props
  const {id, language} = filterDetails
  const onClickTypeBtn = () => {
    isTypeClicked(id)
  }
  const highLightedbtnClass = typeStatus && 'highLightButton'
  return (
    <li className="list-ele">
      <button
        className={`btn ${highLightedbtnClass}`}
        type="button"
        onClick={onClickTypeBtn}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

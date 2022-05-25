import './MethodStep.css'

function MethodStep(props) {
  return (
    <div>
      <div className="method-step small-header"></div>
      <div className="method-text">{props.recipeMethod}</div>
    </div>
  )
}

export default MethodStep

import './MethodStep.css'
import React from 'react'

let methodArray
function mapMethod() {
  return methodArray.map((item, idx) => (
    <React.Fragment key={idx}>
      <div className="method-step small-header">Step {idx + 1}</div>
      <div className="method-text">{item}</div>
    </React.Fragment>
  ))
}

function MethodStep(props) {
  methodArray = props.recipeMethod

  return <div className="recipe-method-container">{mapMethod()}</div>
}

export default MethodStep

import './MethodStep.css'
import React from 'react'

let methodArray
function mapMethod() {
  console.log(methodArray)
  return methodArray.map((item, idx) => (
    <React.Fragment key={idx}>
      <div className="method-step small-header">Step {idx + 1}</div>
      <div className="method-text">{item}</div>
    </React.Fragment>
  ))
}

function MethodStep(props) {
  console.log(props)
  methodArray = props.recipeMethod
  // methodArray = array.length !== 0 ? array.split(/\r?\n/) : []

  return <div className="recipe-method-container">{mapMethod()}</div>
}

export default MethodStep

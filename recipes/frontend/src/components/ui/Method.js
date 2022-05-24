import './Method.css'

import MethodStep from './MethodStep'
function Method(props) {
  return (
    <div className="method">
      <MethodStep recipeMethod={props.recipeMethod}></MethodStep>
    </div>
  )
}

export default Method

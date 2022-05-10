import './MeasurementDropdown.css'

export default function MeasurementDropdown() {
  return (
    <select className="dropdown" name="cars" id="cars">
      <option value="tsp">tsp</option>
      <option value="tbsp">tbsp</option>
      <option value="cup">cup</option>
      <option value="grams">gm</option>
      <option value="tsp"></option>
    </select>
  )
}

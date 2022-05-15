import './MeasurementDropdown.css'

export default function MeasurementDropdown() {
  return (
    <select className="dropdown" name="cars" id="cars">
      <option value="cup">cup</option>
      <option value="tbsp">tbsp</option>
      <option value="tsp">tsp</option>
      <option value="kilogram">kg</option>
      <option value="gram">g</option>
      <option value="litre">l</option>
      <option value="millilitre">ml</option>
      <option value="none"></option>
    </select>
  )
}

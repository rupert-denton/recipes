//fetch(`http://localhost:3001/getjoinedrecipes/?name=${name}`, {
//   method: 'GET',
//   headers: { 'Content-type': 'application/json' },
// })
//   .then((resp) => resp.json())
//   .then((json) => {
//     let result = json
//     console.log(json)
//     console.log(result)
//     const ingredientList = result.map((item) => {
//       return {
//         name: item.ingredient_name,
//         quantity: item.quantity,
//         measure: item.measure,
//       }
//     })

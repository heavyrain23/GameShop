import React from "react"

const Game = ({ products, id }) => {
  console.log({ products, id })
  console.log(id)

  const gameItem = (id) => {
    return (
      <div>
        <img src={products[id].image} alt="" width="300px" />
        <h3>{products[id].genre}</h3>
        <h4>{products[id].description}</h4>
        <h3>{products[id].price} $</h3> <br />
      </div>
    )
  }

  return <>{products[id] && gameItem(id)}</>
}

export default Game

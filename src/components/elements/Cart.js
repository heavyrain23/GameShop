import React, { useContext } from "react"
import { GameContext } from "./AllGames"
const Cart = ({ click, id, products }) => {
  // if (click === 0) {
  //   return <div>Nothing was added</div>
  // }
  const { game } = useContext(GameContext)

  return (
    <>
      <div>Cart</div>
      <div>Orders:</div>
      <ul>
        {game.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>
  )
}

export default Cart

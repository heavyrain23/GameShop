import React, { useContext } from "react"
import GamesContext from "./GamesContext"

const Cart = () => {
  const { cart } = useContext(GamesContext)
  console.log(cart)

  // price counting
  const oneGamePrices = cart.map((game) => game.price * game.quantity)
  const sumTotal = oneGamePrices.reduce(function (a, b) {
    return a + b
  }, 0)

  console.log(sumTotal)
  return (
    <>
      <div>Cart</div>
      <div>Orders:</div>
      {cart.length === 0 && <div>Cart is empty</div>}
      {cart.map((product) => (
        <div className="game-item">
          <img src={"/images/" + product.image} alt="" width="300px" />
          <h1> {product.title}</h1>
          <h3>{product.price} $</h3>
          <h3>quantity :{product.quantity}</h3>
        </div>
      ))}
      <br />
      <h2>Total price:</h2>
      <h2>{sumTotal}</h2>
    </>
  )
}

export default Cart

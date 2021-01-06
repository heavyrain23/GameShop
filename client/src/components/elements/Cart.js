import React, { useContext, useState } from "react"
import GamesContext from "./GamesContext"

const Cart = () => {
  let { cart, setToCart } = useContext(GamesContext)
  const [gameQuantity, setGameQuantity] = useState({})

  // price counting
  const oneGamePrices = cart.map((game) => game.price * game.quantity)
  const sumTotal = oneGamePrices
    .reduce(function (a, b) {
      return a + b
    }, 0)
    .toFixed(2)

  const increaseButton = (product) => {
    product.quantity++
    setGameQuantity({})
  }

  const decreaseButton = (product) => {
    if (product.quantity === 0) {
      return 0
    }
    product.quantity--
    setGameQuantity({})
  }

  const removeButton = () => {
    setToCart([])
    setGameQuantity({})
  }
  console.log(cart)
  return (
    <>
      <h1>Cart</h1>
      <h2>Orders:</h2>
      {cart.length === 0 && <div>Cart is empty</div>}
      {cart.map((product) => (
        <div className="game-item">
          <img src={"/images/" + product.image + ".png"} alt="" width="50px" />
          <h2> {product.title}</h2>
          <h3>{product.price} $</h3>
          <h3>quantity :{product.quantity}</h3>
          <button onClick={() => increaseButton(product)}>+</button>
          <button onClick={() => decreaseButton(product)}>-</button>
        </div>
      ))}
      <br />
      <button onClick={() => removeButton()}>Remove</button>
      <h2>Total price:</h2>
      <h2>{sumTotal}</h2>
    </>
  )
}

export default Cart

import React, { useContext } from "react";
import GamesContext from "./GamesContext";
import CartClientFields from "./Cart_client_fields";
import { StyledCart } from "./../styles/StyledCart";

const Cart = () => {
  let { cart, updateCart } = useContext(GamesContext);

  // price counting
  const oneGamePrices = cart.map((game) => game.price * game.quantity);
  const sumTotal = oneGamePrices
    .reduce(function (a, b) {
      return a + b;
    }, 0)
    .toFixed(2);

  return (
    <>
      <h1>Cart</h1>
      <StyledCart>
        <div className="cart-inputs">
          <CartClientFields />
        </div>

        <div className="order-item">
          <h2>Orders:</h2>
          {cart.length === 0 && <div>Cart is empty</div>}
          {cart.map((product) => (
            <div className="cart-item">
              <img className="orders-image" src={"/images/" + product.image_name} alt="" width="40px" />
              <div className="orders-info">
                <h2> {product.title}</h2>
                <h3>{product.price}$</h3>
              </div>
              <div className="orders-quantity">
                <button onClick={() => updateCart({ type: "increase", item: product })}>+</button>
                <button onClick={() => updateCart({ type: "decrease", item: product })}>-</button>
                <h3>quantity :{product.quantity}</h3>
              </div>
            </div>
          ))}
          <br />
          <button onClick={() => updateCart({ type: "clear" })}>Remove</button>
          <h2>Total price:</h2>
          <h2>{sumTotal}</h2>
        </div>
      </StyledCart>
    </>
  );
};

export default Cart;

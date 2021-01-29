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
      <StyledCart>
        <h1 className="cart-title">Cart</h1>
        <div className="cart-inputs">
          <CartClientFields />
        </div>

        <div className="order-item">
          <h2>Orders:</h2>
          {cart.length === 0 && <div>Cart is empty</div>}
          {cart.map((product) => (
            <div className="cart-item" key={product.id}>
              <img className="orders-image" src={"/images/" + product.image_name} alt="" width="40px" />
              <div className="orders-info">
                <div className="product-title"> {product.title}</div>
                <div className="product-price">{product.price}$</div>
              </div>
              <div className="orders-quantity">
                <button onClick={() => updateCart({ type: "increase", item: product })}>+</button>
                <button onClick={() => updateCart({ type: "decrease", item: product })}>-</button>
                <div>quantity :{product.quantity}</div>
              </div>
            </div>
          ))}
          <br />
          {cart.length > 0 && (
            <div>
              <button className="remove-button" onClick={() => updateCart({ type: "clear" })}>
                Remove all
              </button>
              <div className="total-container">
                <div>Total price:</div>
                <div>{sumTotal}</div>
              </div>
            </div>
          )}
        </div>
      </StyledCart>
    </>
  );
};

export default Cart;

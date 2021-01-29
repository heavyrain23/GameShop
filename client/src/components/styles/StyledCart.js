import styled from "styled-components";

export const StyledCart = styled.div`
  max-width: 1160px;
  margin: 70px 20%;
  display: flex;
  border: 1px solid black;
  position: relative;
  margin-bottom: 190px;

  .cart-title {
    position: absolute;
    top: -85px;
    left: 0;
    color: #56514a;
    width: 400px;
    font-size: 40px;
    font-weight: bold;
    font-family: sans-serif;
  }

  .cart-inputs {
    justify-content: center;
    display: flex;
    width: 70%;
    padding: 20px;

    .title {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 30px;
    }

    p {
      text-align: left;
      margin: 10px 0;
      font-weight: bold;
      font-size: 15px;
    }

    input {
      background-color: ${(props) => props.warningInputColor || "white"};
      width: 200px;
      display: flex;
    }

    button {
      display: flex;
      margin: 25px auto;
      padding: 5px 15px;
    }
  }

  .order-item {
    width: 30%;
    border-left: 1px solid black;
    padding-left: 10px;
    padding-right: 10px;

    h2 {
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
  }

  .cart-item {
    position: relative;
    margin-bottom: 5px;
    width: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    background-color: rgb(193 193 193 / 18%);
  }

  .orders-image {
    width: 20%;
    padding: 5px;
  }

  .orders-info {
    width: 200px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 5px;
    display: inline-block;
  }
  .product-price {
    margin-top: 5px;
  }

  .orders-quantity {
    min-width: 100px;
    position: absolute;
    bottom: 0;
    right: -20px;
  }

  .orders-quantity button {
    background: rgb(122 111 119);
    padding: 0 7px;
    margin: 5px;
    border-radius: 5px;
    color: white;
  }

  .remove-button {
    justify-content: center;
    display: flex;
    width: 40%;
    padding: 5px;
    margin: 0 auto;
  }

  .total-container {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 600;
    margin: 10px;
  }

  @media (max-width: 1186px) {
    .cart-item {
      height: 120px;
    }

    .orders-info {
      width: 100px;
      font-size: 15px;
    }

    .orders-quantity {
      font-size: 15px;
    }

    .orders-image {
      width: 40%;
    }
  }

  @media (max-width: 900px) {
    .orders-image {
      width: 0;
    }
  }
`;

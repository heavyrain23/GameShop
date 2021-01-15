import styled from "styled-components";

export const StyledCart = styled.div`
  max-width: 1160px;
  width: 100%;
  margin: 0px 20%;
  display: flex;
  border: 1px solid black;
  position: relative;

  .cart-inputs {
    justify-content: center;
    display: flex;
    width: 70%;
    border: 1px solid black;
  }

  .order-item {
    width: 30%;
  }

  .cart-item {
    position: relative;
    width: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    background-color: rgb(189 188 188 / 18%);
  }

  .orders-image {
    width: 20%;
    padding: 5px;
  }

  .orders-info {
    width: 70%;
    display: flex;
    justify-content: flex-start;
  }

  .orders-info h2,
  h3 {
    font-size: 20px;
    margin: 0;
    margin-left: 20px;
    margin-top: 10px;
  }

  .orders-info h3 {
    font-size: 20px;
  }

  .orders-quantity {
    display: flex;

    position: absolute;
    right: 90px;
    bottom: 10px;
  }

  .orders-quantity h3 {
    font-weight: 100;
  }

  .orders-quantity button {
    background: rgb(122 111 119);
    padding: 0 7px;
    margin: 5px;
    border-radius: 5px;
    color: white;
  }
`;

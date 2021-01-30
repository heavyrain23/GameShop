import styled from "styled-components";

export const StyledHome = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  max-width: 1160px;
  margin: 0 auto;
  padding: 15px 10px 5px 5px;

  .game-item {
    position: relative;
    margin-left: 12px;
    margin-bottom: 12px;
    width: 330px;
    height: 550px;
    padding: 30px 20px;
    border-radius: 5px;
    text-align: center;
    background: #ffffff;
  }

  .game-item:hover {
    box-shadow: 5px 5px 15px 5px #aca8a8;
    transition: 0.5s;
  }

  .nav-link {
    text-decoration: none;
  }

  .item-title {
    font-size: 25px;
    font-weight: bold;
    color: #636565;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .item-genre {
    position: absolute;
    font-size: 25px;
    color: rgb(192,25,150);
    font-weight: bolder;
    margin-top: 10px;
    bottom: 80px;
    left: 0;
    right: 0;
  }

  .item-price {
    position: absolute;
    bottom: 25px;
    left: 5px;
    font-size: 20px;
    margin-top: 20px;
    background-color: #c6c7c7e8;
    color: white;
    font-weight: 100;
    padding: 5px 158px;
    transition: 0.5s;
  }

  .item-price:hover {
    background-color: rgb(192, 25, 150);
  }

  @media (max-width: 782px) {
    justify-content:center;
    }
  }
`;

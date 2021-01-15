import styled from "styled-components";

export const StyledGame = styled.div`
  box-sizing: border-box;
  border-style: solid;
  border-color: #aca8a8;
  border-width: 1px;
  max-width: 70%;
  padding: 10px 10px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;

  .info_item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px;
    width: 50%;
  }

  .image_item {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item_desc {
    margin-top: 30px;
    font-size: 15px;
    line-height: 25px;
    font-family: sans-serif;
    font-weight: 600;
    color: #56514a;
  }

  .game_button {
    position: absolute;
    top: 70%;
    cursor: pointer;
    display: flex;
    margin-top: 10%;
    justify-content: space-between;
    width: 250px;
    background-color: rgb(192, 25, 150);
    color: whitesmoke;
    padding: 15px 20px;
    align-items: center;

    .game_button_text {
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      font-family: sans-serif;
    }
  }
`;

export const StyledGameTitle = styled.div`
  color: #56514a;
  margin-left: 95px;
  width: 400px;
  padding: 10px 10%;
  font-size: 40px;
  font-weight: bold;
  font-family: sans-serif;
`;

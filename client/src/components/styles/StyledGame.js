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
    max-width: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px;
  }

  .image_item {
    margin-right: 20px;
    width: 40%;
  }

  .item_desc {
    margin-top: 30px;
    font-size: 15px;
    line-height: 25px;
    font-family: sans-serif;
    font-weight: 600;
    color: #56514a;
    margin-left: 30px;
  }

  .game_button {
    
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

  @media (max-width: 1388px) {
    width: 70%;
    
    .item_desc {
      width: 70%;
    }

    @media (max-width: 1275px) {
      display: flex;
      flex-wrap:wrap;
      justify-content: center;

      .info_item {
      width: 100%;
      }

      .item_desc {
        width: 150%        
      }

      .image_item {
        width: 100%;
        display: contents;    
      }
  }

  @media (max-width: 620px) {
    .image_item img {
      width: 80%;
        
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

  @media (max-width: 1275px) {
    margin: 0 auto;
  }
`;

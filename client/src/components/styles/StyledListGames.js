import styled from "styled-components";

export const StyledListGames = styled.div`
  position: absolute;
  text-align: center;
  background: white;
  border: 1px solid rgb(192, 25, 150);
  border-radius: 5px;
  left: 130px;
  right: 0;
  top: 70px;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  z-index: 1000;

  .nav-link {
    text-decoration: none;
    color: #3d3c3c;
    font-size: 15px;
    text-transform: uppercase;
  }

  div {
    padding: 3px 0;
    border-top: 1px solid rgb(192, 25, 150);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .nav-link:hover {
    background-color: rgb(199, 198, 198);
  }
`;

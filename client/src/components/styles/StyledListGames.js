import styled from "styled-components";

export const StyledListGames = styled.div`
  position: absolute;
  text-align: center;
  background: white;
  border: 1px solid rgb(192, 25, 150);
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 25%;

  .nav-link {
    text-decoration: none;
    color: #3d3c3c;
    font-size: 18px;
    text-transform: uppercase;
  }

  div {
    padding: 5px 0;
    border-top: 2px solid rgb(192, 25, 150);
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
  }

  nav-link:hover {
    background-color: rgb(192, 25, 150);
  }
`;

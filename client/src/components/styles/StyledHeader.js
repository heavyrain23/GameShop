import styled from "styled-components";

export const StyledHeader = styled.div`
  background: rgb(54, 53, 53);
  padding: 0 20px;
  box-sizing: border-box;

  .header-content {
    align-items: center;
    display: flex;
    justify-content: space-around;
    max-width: 1280px;
    min-height: 80px;
    padding: 20px 0px;
    margin: 0 auto;
    box-sizing: border-box;

    @media screen and (max-width: 500px) {
      max-width: 1280px;
      min-height: 0px;
    }

    .nav-link {
      text-decoration: none;
      color: white;
      font-weight: bold;
      font-size: 30px;
    }

    .nav-link:hover {
      color: rgb(192, 25, 150);
    }
  }
`;

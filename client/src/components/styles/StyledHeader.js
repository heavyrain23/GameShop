import styled from "styled-components";

export const StyledHeader = styled.div`
  background: #a19f9f;
  padding: 0 20px;
  box-sizing: border-box;

  .header-content {
    display: flex;
    justify-content: space-around;
    max-width: 1280px;
    min-height: 50px;
    padding: 20px 0px;
    margin: 0 auto;
    box-sizing: border-box;

    @media screen and (max-width: 500px) {
      max-width: 1280px;
      min-height: 0px;
    }
  }
`;

import styled from "styled-components";

export const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Loader = () => {
  return (
    <StyledLoader>
      <img src={"/loader.gif"} alt="" width="80px" />
    </StyledLoader>
  );
};

export default Loader;

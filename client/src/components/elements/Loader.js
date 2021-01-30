import styled from "styled-components";

export const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Loader = () => {
  return (
    <StyledLoader>
      <img src={"/loader.svg"} alt="" width="200px" />
    </StyledLoader>
  );
};

export default Loader;

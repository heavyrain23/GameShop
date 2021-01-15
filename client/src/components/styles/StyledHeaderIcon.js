import { Cart3 } from "@styled-icons/bootstrap/Cart3";
import styled from "styled-components";

export const MiniCart = styled(Cart3)`
  color: white;
  width: 30px;

  :hover {
    color: rgb(192, 25, 150);
  }
`;

export const MiniCartCurcle = styled.span`
  position: relative;
  left: 40px;
  bottom: 12px;
  height: 10px;
  width: 10px;
  background-color: rgb(192, 25, 150);
  border-radius: 50%;
  display: inline-block;
`;

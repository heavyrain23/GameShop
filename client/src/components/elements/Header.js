import React, { useContext } from "react";
import { StyledHeader } from "./../styles/StyledHeader";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Cart3 } from "@styled-icons/bootstrap/Cart3";
import GamesContext from "./GamesContext";

const MiniCart = styled(Cart3)`
  color: white;
  width: 30px;
`;

const MiniCartCurcle = styled.span`
  position: relative;
  left: 40px;
  bottom: 12px;
  height: 10px;
  width: 10px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
`;

const Header = () => {
  const { cart } = useContext(GamesContext);

  return (
    <StyledHeader>
      <div className="header-content">
        <NavLink exact to={"/"}>
          <div className="header-logo"> Game Store</div>
        </NavLink>
        <NavLink exact to={"/cart"}>
          {cart.length > 0 && <MiniCartCurcle />}
          <MiniCart />
        </NavLink>
      </div>
    </StyledHeader>
  );
};

export default Header;

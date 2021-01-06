import React from "react"
import { StyledHeader } from "./../styles/StyledHeader"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <StyledHeader>
      <div className="header-content">
        <NavLink exact to={"/"}>
          Logo
        </NavLink>
        <NavLink exact to={"/cart"}>
          Cart
        </NavLink>
      </div>
    </StyledHeader>
  )
}

export default Header

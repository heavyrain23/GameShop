import React, { useContext } from "react"
import { StyledHome } from "./../styles/StyledHome"
import { NavLink } from "react-router-dom"
import GamesContext from "./GamesContext"

const AllGames = () => {
  const { products } = useContext(GamesContext)

  return (
    <StyledHome>
      {products &&
        products.map((product) => (
          <NavLink key={product.id} to={"/game/" + product.id}>
            <div className="game-item">
              <img src={"/images/" + product.image + ".png"} alt="" width="250px" />
              <h1> {product.title}</h1>
              <h3>{product.genre}</h3>
              <h3>{product.price} $</h3> <br />
            </div>
          </NavLink>
        ))}
    </StyledHome>
  )
}

export default AllGames

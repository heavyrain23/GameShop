import React, { useContext } from "react";
import { StyledHome } from "./../styles/StyledHome";
import { NavLink } from "react-router-dom";
import GamesContext from "./GamesContext";

const AllGames = () => {
  const { products } = useContext(GamesContext);

  return (
    <div>
      <StyledHome>
        {products &&
          products.map((product) => (
            <NavLink className="nav-link" key={product.id} to={"/game/" + product.id}>
              <div className="game-item">
                <img src={"/images/" + product.image_name} alt="" height="350px" />
                <div className="item-title"> {product.title}</div>
                <div className="item-genre">{product.genre}</div>
                <div className="item-price">{product.price} $</div> <br />
              </div>
            </NavLink>
          ))}
      </StyledHome>
    </div>
  );
};

export default AllGames;

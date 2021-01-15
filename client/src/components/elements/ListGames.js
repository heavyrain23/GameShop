import React, { useContext } from "react";
import GamesContext from "./GamesContext";
import { NavLink } from "react-router-dom";
import { StyledListGames } from "./../styles/StyledListGames";

const ListGames = () => {
  let { filter, setFilter, products } = useContext(GamesContext);

  let listToDisplay = products;
  if (filter) {
    listToDisplay = products.filter((product) => product.title.toLowerCase().includes(filter.toLowerCase()));
  }

  // Nothing found, or no filter.
  if (!filter || listToDisplay.length < 1) {
    return <div></div>;
  }

  const rows = () =>
    listToDisplay.map((game) => (
      <NavLink onClick={() => setFilter("")} className="nav-link" key={game.id} exact to={"/game/" + game.id}>
        <div>{game.title}</div>
      </NavLink>
    ));

  return (
    <StyledListGames>
      <div>{rows()}</div>
    </StyledListGames>
  );
};

export default ListGames;

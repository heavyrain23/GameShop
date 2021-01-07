import React, { useContext } from "react"
import GamesContext from "./GamesContext"
import { NavLink } from "react-router-dom"

const ListGames = () => {
  let { filter, products } = useContext(GamesContext)

  let listToDisplay = products
  if (filter) {
    listToDisplay = products.filter((product) => product.title.toLowerCase().includes(filter.toLowerCase()))
  }

  // Nothing found, or no filter.
  if (!filter || listToDisplay.length < 1) {
    return <div></div>
  }

  const rows = () =>
    listToDisplay.map((game) => (
      <NavLink exact to={"/game/" + game.id}>
        <div key={game.title}>{game.title}</div>
      </NavLink>
    ))

  return <div>{rows()}</div>
}

export default ListGames

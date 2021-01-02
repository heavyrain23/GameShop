import React from "react"
import { useHistory } from "react-router-dom"
import Game from "./Game"

const ListGames = ({ products }) => {
  let history = useHistory()

  function handleClick(id) {
    console.log(id)
    history.push({
      pathname: "/game",
      search: "?id=" + id,
    })
  }
  console.log({ history })

  const rows = () =>
    products.map((game) => (
      <li onClick={() => handleClick(game.id)} game={game.title} key={game.id}>
        {game.title}
      </li>
    ))

  return (
    <>
      <ul>{rows()}</ul>
    </>
  )
}

export default ListGames

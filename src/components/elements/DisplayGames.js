import React from "react"
import ListGames from "./ListGames"

const DisplayGames = ({ products, filter }) => {
  let gamesToDisplay = products

  if (filter) {
    gamesToDisplay = products.filter((game) => game.title.toLowerCase().includes(filter.toLowerCase()))
  }

  if (gamesToDisplay.length < 1 || !filter) {
    return <div></div>
  }

  return (
    <>
      <ListGames products={gamesToDisplay} />
    </>
  )
}

export default DisplayGames

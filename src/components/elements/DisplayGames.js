import React from "react"

const DisplayGames = ({ products, filter }) => {
  let gamesToDisplay = products

  if (filter) {
    gamesToDisplay = products.filter((game) => game.title.toLowerCase().includes(filter.toLowerCase()))
  }

  if (gamesToDisplay.length < 1 || !filter) {
    return <div></div>
  }

  const rows = () => gamesToDisplay.map((game) => <div game={game.title} key={game.id}></div>)

  return (
    <>
      <div>{rows()}</div>
    </>
  )
}

export default DisplayGames

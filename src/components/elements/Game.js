import React, { useState, useContext, useReducer } from "react"
import { StyledGame, StyledGameTitle } from "./../styles/StyledGame"
import Card from "./Cart"
import { GameContext } from "./AllGames"

const Game = ({ products, id }) => {
  const [click, setClick] = useState(0)
  const [view, setView] = useState("all")

  const GameItem = (id) => {
    const { setGame } = useContext(GameContext)

    function update(name, id) {
      setGame({
        name: name,
        gameId: id,
      })
    }
    console.log(update)

    return (
      <div>
        <StyledGameTitle>{products[id].title}</StyledGameTitle>
        <StyledGame>
          <div className="image_item">
            <img src={products[id].image} alt="" width="600px" />
          </div>
          <div className="info_item">
            <h4 className="item_desc">{products[id].description}</h4>
            <div onClick={() => update(products[id].title, products[id].id)} className="game_button">
              <div className="game_button_text">Buy now</div>
              <div className="game_button_text">{products[id].price} $</div>{" "}
            </div>
          </div>
        </StyledGame>
        <Card click={click} id={id} products={products} />
      </div>
    )
  }

  return <>{products[id] && GameItem(id)}</>
}

export default Game

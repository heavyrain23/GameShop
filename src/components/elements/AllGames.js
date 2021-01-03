import React, { useState, createContext, useReducer } from "react"
import { StyledHome } from "./../styles/StyledHome"
import { NavLink } from "react-router-dom"
import Game from "./Game"
import { StyledHeader } from "./../styles/StyledHeader"
import DisplayGames from "./DisplayGames"

export const GameContext = createContext()

function reducer(state, item) {
  return [...state, item]
}

const AllGames = ({ products }) => {
  const [filter, setFilter] = useState("")
  const [id, setId] = useState("")
  const [view, setView] = useState("all")
  const [game, setGame] = useReducer(reducer, [])

  const filterEventHandler = (event) => {
    setFilter(event.target.value)
  }

  let gamesToDisplay = products
  if (filter) {
    gamesToDisplay = products.filter((game) => game.title.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <div>
      <StyledHeader>
        <div className="header-content">
          <a href="/"> Logo</a>
          <input onChange={filterEventHandler} />

          <div>Card</div>
        </div>
      </StyledHeader>

      <DisplayGames products={products} filter={filter} />

      <GameContext.Provider value={{ game, setGame }}>
        <StyledHome>
          {view === "all" &&
            gamesToDisplay.map((product) => (
              <NavLink to={"/game?id=" + product.id}>
                <div
                  className="game-item"
                  key={product.id}
                  onClick={() => {
                    setId(product.id - 1)
                    setView("gameId")
                  }}
                >
                  <img src={product.image} alt="" width="300px" />
                  <h1> {product.title}</h1>
                  <h3>{product.genre}</h3>
                  <h3>{product.price} $</h3> <br />
                </div>
              </NavLink>
            ))}
        </StyledHome>
        {view === "gameId" && <Game products={products} id={id} />}
      </GameContext.Provider>
    </div>
  )
}

export default AllGames

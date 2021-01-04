import React, { useState, createContext, useReducer, useContext } from "react"
import { StyledHome } from "./../styles/StyledHome"
import { NavLink } from "react-router-dom"
import Game from "./Game"
import { StyledHeader } from "./../styles/StyledHeader"
import DisplayGames from "./DisplayGames"
import AllGamesContext from "./AllGames"

export const GameContext = createContext()

function reducer(state, item) {
  return [...state, item]
}

const AllGames = () => {
  const [filter, setFilter] = useState("")
  const [id, setId] = useState("")
  const [game, setGame] = useReducer(reducer, [])

  const { products } = useContext(AllGamesContext)

  console.log(products)

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

      <AllGamesContext.Consumer>
        <DisplayGames products={products} filter={filter} />

        <GameContext.Provider value={{ game, setGame }}>
          <StyledHome>
            {gamesToDisplay.map((product) => (
              <NavLink to={"/game?id=" + product.id}>
                <div
                  className="game-item"
                  key={product.id}
                  onClick={() => {
                    setId(product.id - 1)
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
          <Game products={products} id={id} />}
        </GameContext.Provider>
      </AllGamesContext.Consumer>
    </div>
  )
}

export default AllGames

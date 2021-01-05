import React, { useState, useEffect, useReducer } from "react"
import AllGames from "./elements/AllGames"
import Game from "./elements/Game"
import Cart from "./elements/Cart"
import GamesContext from "./elements/GamesContext"
import { NavLink, Route } from "react-router-dom"
import axios from "axios"
import { StyledHeader } from "./styles/StyledHeader"

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setToCart] = useReducer(reducer, [])

  function reducer(state, item) {
    return [...state, item]
  }

  useEffect(() => {
    axios.get("/goods")
         .then((response) => {
            setProducts(response.data)})
         .catch((err) => {
            console.log(err)})
  }, [])

  const filterList = (event) => {
    const value = event.target.value;
    console.log("Filter will be hear!");
    console.log("Inputed value is " + value);
  }

  return (
    <GamesContext.Provider value={{products, cart, setToCart }}>
       <StyledHeader>
        <div className="header-content">
          <NavLink exact to={"/"}>Logo</NavLink>
          <input onChange={filterList} />
          <NavLink exact to={"/cart"}>Cart</NavLink>
        </div>
      </StyledHeader>

      <Route exact path="/" children={<AllGames />} />
      <Route exact path="/game/:id" children={<Game />}/>
      <Route exact path="/cart" children={<Cart />}/>
    </GamesContext.Provider>
  )
}

export default App

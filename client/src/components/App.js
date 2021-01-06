import React, { useState, useEffect, useReducer } from "react"
import AllGames from "./elements/AllGames"
import Game from "./elements/Game"
import Cart from "./elements/Cart"
import GamesContext from "./elements/GamesContext"
import { Route } from "react-router-dom"
import axios from "axios"
import ListGames from "./elements/ListGames"
import Header from "./elements/Header"

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setToCart] = useReducer(reducer, [])
  const [filter, setFilter] = useState("")

  function reducer(state, item) {
    if (item instanceof Array) {
      return item
    }
    return [...state, item]
  }

  useEffect(() => {
    axios
      .get("/goods")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const filterList = (event) => {
    setFilter(event.target.value)
    console.log("Inputed value is " + filter)
  }

  return (
    <GamesContext.Provider value={{ products, cart, setToCart, filter }}>
      <Header />
      <input onChange={filterList} />
      <ListGames />
      <Route exact path="/" children={<AllGames />} />
      <Route exact path="/game/:id" children={<Game />} />
      <Route exact path="/cart" children={<Cart />} />
    </GamesContext.Provider>
  )
}

export default App

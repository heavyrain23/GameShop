import React, { useState, useEffect, createContext } from "react"
import axios from "axios"
import AllGames from "./elements/AllGames"
import Game from "./elements/Game"
import Cart from "./elements/Cart"
import { BrowserRouter as Switch, Route } from "react-router-dom"

export const AllGamesContext = createContext()

const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await fetch("/goods")
      const data = await result.json()

      setProducts(data)
    })()
  }, [])
  console.log(products)

  if (!products[0]) return "Wait"

  return (
    <AllGamesContext.Provider value={products}>
      <Switch>
        <Route path="/all">
          <AllGames products={products} />
        </Route>
        <Route path="/game/id">
          <Game />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </AllGamesContext.Provider>
  )
}

export default App

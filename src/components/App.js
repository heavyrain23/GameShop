import React, { useState, useEffect, createContext } from "react"
import AllGames from "./elements/AllGames"
import Game from "./elements/Game"
import Cart from "./elements/Cart"
import GamesContext from "./elements/GamesContext"
import { BrowserRouter as Switch, Route } from "react-router-dom"

const App = () => {
  const [products, setProducts] = useState([])
  console.log(products)
  useEffect(() => {
    ;(async () => {
      const result = await fetch("/goods")
      const data = await result.json()

      setProducts(data)
      console.log(products)
    })()
  }, [])
  console.log(products)

  return (
    <GamesContext.Provider value={products}>
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
    </GamesContext.Provider>
  )
}

export default App

import React, { useState, useEffect } from "react"
import axios from "axios"
import AllGames from "./elements/AllGames"
import UserContext from "./elements/User"

const App = () => {
  const [products, setProducts] = useState([])

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

  const user = {
    favorites: ["Cyberpunk", "Call of duty"],
  }

  return (
    <UserContext.Provider value={user}>
      <AllGames products={products} />
    </UserContext.Provider>
  )
}

export default App

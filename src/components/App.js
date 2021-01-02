import React, { useState, useEffect } from "react"
import axios from "axios"
import AllGames from "./elements/AllGames"

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

  return (
    <div>
      <AllGames products={products} />
    </div>
  )
}

export default App

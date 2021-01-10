import React, { useContext } from "react"
import { useParams } from "react-router"
import { StyledGame, StyledGameTitle } from "./../styles/StyledGame"
import GamesContext from "./GamesContext"

const Game = () => {
  const { id } = useParams()
  const { products, cart, updateCart } = useContext(GamesContext)
  const product = products && products[id - 1]

  const addGame = () => {
    // checking for existing obj in array
    const checkingCart = cart.find(item => item.id === product.id)
    // if array contains same obj then prop.quantity increased by 1
    
    if (checkingCart) {
      product.quantity = product.quantity + 1
    } else {
      // create quantity property and new obj to cart
      product.quantity = 1
      updateCart({ type: "add", item: product })
    }

  }

  return (
    <>
      {product && (
        <div>
          <StyledGameTitle>{product.title}</StyledGameTitle>
          <StyledGame>
            <div className="image_item">
              <img src={"/images/" + product.image + ".png"} alt="" width="400px" />
            </div>
            <div className="info_item">
              <h4 className="item_desc">{product.description}</h4>
              <div onClick={() => addGame()} className="game_button">
                <div className="game_button_text">Buy now</div>
                <div className="game_button_text">{product.price} $</div>
              </div>
            </div>
          </StyledGame>
        </div>
      )}
    </>
  )
}

export default Game

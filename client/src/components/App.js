import React, { useState, useEffect, useReducer } from "react";
import AllGames from "./elements/AllGames";
import Game from "./elements/Game";
import Cart from "./elements/Cart";
import GamesContext from "./elements/GamesContext";
import { Route } from "react-router-dom";
import axios from "axios";
import ListGames from "./elements/ListGames";
import Header from "./elements/Header";
import { GlobalStyle } from "./styles/GlobalStyle";
import Footer from "./elements/Footer";
import Loader from "./elements/Loader";

function reducer(state, action) {
  switch (action.type) {
    case "clear":
      return [];
    case "add":
      return [...state, action.item];
    case "increase":
      action.item.quantity++;
      return [...state];
    case "decrease":
      if (action.item.quantity > 0) {
        action.item.quantity--;
      }

      return [...state];
    default:
      console.log(`Type: ${action.type} is incorrect`);
  }
}

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, updateCart] = useReducer(reducer, []);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <GamesContext.Provider value={{ products, cart, updateCart, filter, setFilter, loading, setLoading }}>
        <Header />
        {loading && <Loader />}
        <ListGames />
        <Route exact path="/" children={<AllGames />} />
        <Route exact path="/game/:id" children={<Game />} />
        <Route exact path="/cart" children={<Cart />} />
      </GamesContext.Provider>
      <Footer />
      <GlobalStyle />
    </>
  );
};

export default App;

import React, { useContext, useState } from "react";
import axios from "axios";
import GamesContext from "./GamesContext";

const CartClientFields = () => {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adress, setAdress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { cart } = useContext(GamesContext);

  async function makePostRequest() {
    const newCustoumer = {
      firstName,
      secondName,
      phoneNumber,
      email,
      adress,
      postalCode,
      orders: cart.map((x) => ({ productId: x.id, quantity: x.quantity })),
    };

    console.log(newCustoumer);
    let res = await axios.post("/customers", newCustoumer);
    console.log(res.data);
  }

  return (
    <div>
      <p>Customer information</p>

      <p>Email</p>
      <input onChange={(event) => setEmail(event.target.value)} />

      <p>First name</p>
      <input onChange={(event) => setfirstName(event.target.value)} />

      <p>Second name</p>
      <input onChange={(event) => setSecondName(event.target.value)} />

      <p>Phone Number</p>
      <input onChange={(event) => setPhoneNumber(event.target.value)} />

      <p>Adress</p>
      <input onChange={(event) => setAdress(event.target.value)} />

      <p>Postal code</p>
      <input onChange={(event) => setPostalCode(event.target.value)} />

      <button onClick={() => makePostRequest()}>Send</button>
    </div>
  );
};

export default CartClientFields;

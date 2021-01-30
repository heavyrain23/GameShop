import React, { useContext, useState } from "react";
import axios from "axios";
import GamesContext from "./GamesContext";
import Notification from "./Notification";

const CartClientFields = () => {
  const { cart } = useContext(GamesContext);
  const [notification, setNotification] = useState(null);
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    secondName: "",
    phoneNumber: "",
    adress: "",
    postalCode: "",
  });

  const set = (propName) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [propName]: value }));
    };
  };

  async function makePostRequest(event) {
    event.preventDefault();
    const newCustoumer = {
      firstName: values.firstName,
      secondName: values.secondName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      adress: values.adress,
      postalCode: values.postalCode,
      orders: cart.map((x) => ({ productId: x.id, quantity: x.quantity })),
    };

    if (newCustoumer.orders.length === 0) {
      sendNotification("YOUR CART IS EMPTY :C");
    } else {
      sendNotification("YOUR ORDER IS ACCEPTED C:");
      let res = await axios.post("/customers", newCustoumer);
    }
  }

  const sendNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div>
      <Notification text={notification} />

      <form onSubmit={makePostRequest}>
        <p className="title">Customer information</p>

        <p>*Email</p>
        <input type="text" value={values.email} required minLength="5" onChange={set("email")} />

        <p>*First name</p>
        <input type="text" value={values.firstName} required minLength="3" onChange={set("firstName")} />

        <p>*Second name</p>
        <input type="text" value={values.secondName} required minLength="3" onChange={set("secondName")} />

        <p>*Phone Number</p>
        <input type="number" value={values.phoneNumber} required minLength="5" onChange={set("phoneNumber")} />

        <p>*Adress</p>
        <input type="text" value={values.adress} required minLength="5" onChange={set("adress")} />

        <p>*Postal code</p>
        <input type="number" value={values.postalCode} required minLength="5" onChange={set("postalCode")} />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CartClientFields;

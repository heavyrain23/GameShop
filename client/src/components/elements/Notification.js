import { StyledNotification } from "../styles/StyledNotification";
import React from "react";

const Notification = ({ text }) => {
  if (text === null) {
    return null;
  }

  return <StyledNotification>{text} </StyledNotification>;
};

export default Notification;

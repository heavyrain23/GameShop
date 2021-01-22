import React from "react";
import styled from "styled-components";

export const NotificationStyle = styled.div`
  box-sizing: border-box;
  border: 2px solid rgb(192, 25, 150);
  font-size: 25px;
  padding: 10px;
  position: absolute;
  top: -60px;
  border-radius: 5px;
  font-weight: 700;
  background-color: #f2f2f2;
`;

const Notification = () => {
  return <NotificationStyle> Your order is accepted! :)</NotificationStyle>;
};

export default Notification;

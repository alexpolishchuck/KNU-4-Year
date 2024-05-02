import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../Common/Styles/MainPart.css'

export const Button = ({buttonName, onClickFunc}) => {
  return(
    <button class='button' onClick={() => onClickFunc()}>{buttonName}</button>
  )
};
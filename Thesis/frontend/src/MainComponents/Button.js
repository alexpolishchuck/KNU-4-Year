import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../Common/Styles/MainPart.css'

export const Button = ({buttonName, onClickFunc}) => {
  const onClick = async () => {
    await onClickFunc();
  }
  
  return(
    <button className='button' onClick={onClick}>{buttonName}</button>
  )
};
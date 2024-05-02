import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {LogoutButton} from '../Authorization/AuthButtons'
import '../Common/Styles/Common.css'
import '../Common/Styles/HeaderPart.css'

const Header = () => {

  const {isAuthenticated} = useAuth0();

  let logoutButton;
  let header = <span>Fake Media Identification</span>;
  if(isAuthenticated)
    {
      logoutButton = <div class = 'ms-auto d-flex'><LogoutButton/></div>
      header = <span class='ms-auto'>Fake Media Identification</span>;
    }


    return (
      <div class='headerStyle px-5'>
          {header}
          {logoutButton}
      </div>
  
    );
  };
  
  export default Header;


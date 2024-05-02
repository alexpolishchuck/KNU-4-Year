import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {LoginButton, SignUpButton} from './AuthButtons'
import Header from '../MainComponents/Header'
import '../Common/Styles/Common.css'
import '../Common/Styles/MainPart.css'

const LoginPageContent = () => {
  const { logout } = useAuth0();
  const { user, isAuthenticated} = useAuth0();

  return (
    !isAuthenticated && 
    <div class='mainBackground'>
        <Header/>
        <div class='d-flex mx-auto my-lg-auto my-2'>
          <LoginButton/>
          <div className="ms-2">
            <SignUpButton/>
          </div>
        </div>
    </div>

  );
};

export default LoginPageContent;
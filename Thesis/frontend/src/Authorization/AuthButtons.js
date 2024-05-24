import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../Common/Styles/MainPart.css'

export const LoginButton = () => {
  const {loginWithRedirect, isAuthenticated} = useAuth0();

  return(
  !isAuthenticated 
  && <button className='mainButton' onClick={loginWithRedirect}>Login</button>
  )
};

export const SignUpButton = () =>{
  const {loginWithRedirect, isAuthenticated} = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return(
  !isAuthenticated 
  && <button className='mainButton' onClick={handleSignUp}>SignUp</button>
  )
}

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className='mainButton' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Logout
    </button>
  );
};
import React from 'react';
import LoginPageContent from '../Authorization/AuthLoginPageContent'
import LoadingCircle from '../MainComponents/LoadingCircle'
import { useAuth0 } from "@auth0/auth0-react";
import {AuthorizedPage} from '../UserPages/Components/AuthorizedPage'
import 'bootstrap/dist/css/bootstrap.css'

function InitialPage() {

  const { user, isAuthenticated, isLoading} = useAuth0();

    if(isLoading)
      return <LoadingCircle/>

    if(!isAuthenticated)
      return <LoginPageContent/>

    return (
      <div class='mainBackground mainBody'>
        <AuthorizedPage/>
      </div>
    );
  }
  
  export default InitialPage;
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPageContent from '../Authorization/AuthLoginPageContent'
import LoadingCircle from '../MainComponents/LoadingCircle'
import { useAuth0 } from "@auth0/auth0-react";
import { AuthorizedPage } from '../UserPages/Components/AuthorizedPage'
import { UploadsContent } from '../UserPages/Components/UploadsPage';
import 'bootstrap/dist/css/bootstrap.css'
import { MediaDemonstration } from '../UserPages/Components/MediaDemonstation';

function InitialPage() {

  const { user, isAuthenticated, isLoading} = useAuth0();

    if(isLoading)
      return <LoadingCircle/>

    if(!isAuthenticated)
      return <LoginPageContent/>

    return (
<BrowserRouter>
<Routes>
  <Route index element={
    <div className='mainBackground mainBody'>
        <AuthorizedPage/>
    </div>}>
  </Route>
  <Route path='/:userId' element={<UploadsContent/>}>
  </Route>
  <Route path='/:userId/:contentHash' element={<MediaDemonstration/>}>
  </Route>
</Routes>
</BrowserRouter>
    );
  }
  
  export default InitialPage;
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../../Common/Styles/MainPart.css'
import Header from '../../MainComponents/Header'
import {UserPage} from './UserPage'

const USER_ROLES_CLAIM = process.env.REACT_APP_ROLES_USER_TOKEN_CLAIM
const ADMIN_ROLE = "ROLE_ADMIN"
const USER_ROLE = "ROLE_USER"

const AdminPage = () => {
    // TODO: 
    const {isAuthenticated} = useAuth0();

    return(
        isAuthenticated 
        && 
        <div className='mainBackground'>
            <Header/>
            <h1>
                ADMIN
            </h1>
        </div>
    )
}

export const AuthorizedPage = () => {
    const {user, isAuthenticated} = useAuth0();

    const roles = user[USER_ROLES_CLAIM];

    let pageContent;
    if(roles.includes(ADMIN_ROLE))
        pageContent = <AdminPage/>
    else
        pageContent = <UserPage/>

    return(
        isAuthenticated 
        && 
        <div className='mainBackground'>
            {pageContent}
        </div>
    )
  };
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useState} from "react";
import Header from '../../MainComponents/Header'
import {Button} from '../../MainComponents/Button'
import {DragAndDropZone} from './DragAndDrop'
import {getUserInfo, addUser, getWallets, userWalletExists} from './UserPageRequests'

import '../../Common/Styles/MainPart.css'
import '../Styles/UserPage.css'
import { addWallet } from "./UserPageRequests";
import { VerificationForm } from "./VerificationForm";

async function onFirstLogin(getAccessTokenSilently, auth0User)
{
            let email = auth0User.email
            let user = await getUserInfo(email)

            if(user != null)
            {
                console.log('[DEBUG] onFirstLogin. User already exists.')
                return;
            }

            let token = await getAccessTokenSilently()
            let name = ''
            let surname = ''
            addUser(token, email, name, surname)
}

const UserPageSideBar = ({setContentFunc}) => {
    return(
        <div className = 'sideBar'>
            <div className = 'buttonHolder'>
                <hr/>
                <h2 className = 'mt-2'>Menu</h2>
                <Button buttonName={"Upload video"} onClickFunc={() => {setContentFunc(<DragAndDropZone/>)}} />
                <Button buttonName={"All uploads"} onClickFunc={() => {}} />
                <Button buttonName={"Verify account"} onClickFunc={() => {setContentFunc(<VerificationForm/>)}} />
            </div>
        </div>
    )
};

async function setupEther(getAccessTokenSilently, userEmail)
{
    const ethers = require("ethers")

    try{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const acc = ethers.getAddress(accounts[0])

        let user = await getUserInfo(userEmail)
        let token = await getAccessTokenSilently()

        let walletExists = await userWalletExists(acc)
        if(!walletExists)
            await addWallet(token, user.id, acc);
    }
    catch(error){
        console.log(error.message)
        alert(`Couldn't connect to MetaMask: ${error.message}\nCheck if you have metamask wallet installed`);
    }
}

export const UserPage = () => {
    const {isAuthenticated, getAccessTokenSilently, user} = useAuth0();
    const [userPageContent, setUserPageContent] = useState(null);
    const [isInitialized, setIsInitialized] = useState(null);

    if(!isInitialized)
    {
        setIsInitialized(true)
        setupEther(getAccessTokenSilently, user.email)
        onFirstLogin(getAccessTokenSilently, user);
    }
    
    // TODO: 
    return(
        isAuthenticated 
        && 
        <div className='mainBackground'>
            <Header/>
            <div className="mainBackground flex-row">
                {userPageContent}

                <UserPageSideBar setContentFunc={setUserPageContent}/>
            </div>
        </div>
    )
};
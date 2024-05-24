import React, {useCallback, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import {getUserInfoById} from './UserPageRequests'
import ReactPlayer from 'react-player'
import MediaStorageABI from '../../ABI/MediaStorage.json'

import 'bootstrap/dist/css/bootstrap.css'
import '../../Common/Styles/MainPart.css'

const mediaStorageAdress = process.env.REACT_APP_MESSAGE_STORAGE_ADDRESS

async function get_values_from_blockchain(setMediaUrl, contentHash)
{
    const ethers = require("ethers")

    try{
        const prov = new ethers.BrowserProvider(window.ethereum);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const acc = ethers.getAddress(accounts[0])

        const signer = await prov.getSigner();
        console.log(signer)
        const mediaStorage = new ethers.Contract(mediaStorageAdress, MediaStorageABI, signer);
        
        const mediaUrl = await mediaStorage.getMediaByHash(contentHash);
        console.log(mediaUrl);
        setMediaUrl(mediaUrl);
    }
    catch(error){
        console.log(error.message)
        alert(`Couldn't connect to MetaMask: ${error.message}\nCheck if you have metamask wallet installed`);
    }
}

async function getUser(userId, setUserInfo)
{
    let user = await getUserInfoById(userId)
    setUserInfo(user)
}

export const MediaDemonstration = () => {
    const [mediaUrl, setMediaUrl] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const params = useParams();
    const userId = params.userId;
    const contentHash = params.contentHash;

    if(!mediaUrl)
        get_values_from_blockchain(setMediaUrl, contentHash)

    if(!userInfo)
        getUser(userId, setUserInfo)

    if(userInfo)
        console.log(userInfo)

    return (
        
        <div className="mainBackground d-flex flex-column align-items-center">
            {
                mediaUrl && 
                userInfo &&
                <div>
                    <div className="d-flex flex-column align-items-center">
                        <div>
                            <h1>Owner</h1>

                            <h2>Name: {userInfo.name}</h2>
                            <h2>Surname: {userInfo.surname}</h2>
                            <h2>Verified: {Boolean.prototype.toString(userInfo.is_verified)}</h2>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center mt-4">
                        <ReactPlayer url={mediaUrl} controls={true} />
                    </div>
                </div>
            }   
        </div>
    )
}
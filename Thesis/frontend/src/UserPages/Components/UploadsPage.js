import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../../MainComponents/Header'
import {Button} from '../../MainComponents/Button'
import {getUserInfoById, getWallets} from './UserPageRequests'

import MediaStorageABI from '../../ABI/MediaStorage.json'
import 'bootstrap/dist/css/bootstrap.css'
import '../Styles/UploadsPage.css'

const mediaStorageAdress = process.env.REACT_APP_MESSAGE_STORAGE_ADDRESS

async function getUser(userId, setUserInfo)
{
    let user = await getUserInfoById(userId)

    setUserInfo(user)
}

async function getContentHashes(userId, setMediaFiles)
{
    const ethers = require("ethers")

    try{
        const prov = new ethers.BrowserProvider(window.ethereum);
        const signer = await prov.getSigner();
        const mediaStorage = new ethers.Contract(mediaStorageAdress, MediaStorageABI, signer);

        let allMediaFiles = []
        let wallets = await getWallets(userId)
        for(let i = 0; i < wallets.length; i++)
        {
            const mediaFiles = await mediaStorage.getMediaFiles(ethers.getAddress(wallets[i]));
            console.log(mediaFiles);
            
            allMediaFiles = allMediaFiles.concat(mediaFiles);
        }

        console.log(allMediaFiles)

        setMediaFiles(allMediaFiles)
    }
    catch(error){
        console.log(error.message)
        alert(`Couldn't connect to MetaMask: ${error.message}\nCheck if you have metamask wallet installed`);
    }
}

function createOnPreviewFunc(contentHash, navigate)
{
    return () => {
        console.log("origin: " + window.location.origin)
        navigate(contentHash)
    }
}

export const UploadsContent = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [mediaFiles, setMediaFiles] = useState(null);
    const params = useParams();
    const userId = params.userId;
    const navigate = useNavigate(); 

    if(!userInfo)
        getUser(userId, setUserInfo)

    if(!mediaFiles)
        getContentHashes(userId, setMediaFiles)

    return (
        <div className='mainBackground'>
            <Header/>
            <div className="mainBackground flex-row">
                <table class="uploadsTable">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mediaFiles &&
                            mediaFiles.map((mediaFile)=> {
                                return (
                                    <tr>
                                        <td>
                                            {
                                                mediaFile.name
                                            }
                                        </td>
                                        <td>
                                            <Button buttonName={"Preview"} onClickFunc={
                                                createOnPreviewFunc(mediaFile.contentHash, navigate)
                                                }/>
                                        </td>
                                    </tr>
                                )
                              })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
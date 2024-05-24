import React, {useCallback, useRef, useState} from "react";
import {useDropzone} from 'react-dropzone'
import {ReactComponent as UploadSign} from '../../Images/upload-sign.svg'
import {Button} from '../../MainComponents/Button'
import {VideoPlayer} from './VideoPlayer'
import {calculateSHA256, createIpfsUlr, createIpfsUnpinUrl, createMediaDemoUrl} from './UserPageUtils';
import {pinFileToIPFS, unpinFileFromIPFS} from "./FileUploading";
import {QRCode} from 'react-qr-code'
import { getUserInfo } from "./UserPageRequests";
import { useAuth0 } from "@auth0/auth0-react";

import MediaStorageABI from '../../ABI/MediaStorage.json'
import {elementToSVG} from 'dom-to-svg'

import '../../Common/Styles/MainPart.css'
import '../Styles/UserPage.css'


const mediaStorageAdress = process.env.REACT_APP_MESSAGE_STORAGE_ADDRESS
const defaultState = null
const processingState = 'Processing...'
const uploadingState = 'Uploading...'
const finalizingUpload = 'Finilizing...'

const DragAndDropZoneEnabled = ({callback}) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: callback,
        maxFiles: 1,
        accept: {
            'video/*': [],
            'text/*': []
          }
      })

    return(
        <div {...getRootProps()} className='d-flex flex-column align-items-center justify-content-center dragNDrop'>
            <input id="video_upload_input" {...getInputProps()} />
            <UploadSign fill='#284B63' width='50px' height='50px'/>
            
            {
                !isDragActive &&
                <h2 className='text-capitalize mt-3'>Drag and Drop Video to Upload</h2>
            }

            {
                isDragActive &&
                <h2 className='text-capitalize mt-3'>Dropping...</h2>
            }
        </div>
    )
}

const downloadQrCode = () =>{
    const svgQrcode = elementToSVG(document.querySelector('#qrCode'))
    const svgString = new XMLSerializer().serializeToString(svgQrcode)
    const blob = new Blob([svgString], { type: "image/svg+xml" });

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = 'QrCodeVerification';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

const createQrCodeComponent = (ipfsUrl) => {
    return (
    <div className="d-flex flex-column align-items-center">
        <div id="qrCode">
            <QRCode
            title="Click to download"
            value={ipfsUrl}
            size={100}
            />
        </div>

        <div className="mt-2 mb-2">
            <Button buttonName={'Download QR code'} onClickFunc={downloadQrCode}/>
        </div>              
    </div>
    )
}

async function setupEther(setProvider, setMediaStorageContract, setAccount)
{
    const ethers = require("ethers")

    try{
        const prov = new ethers.BrowserProvider(window.ethereum);
        setProvider(prov);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const acc = ethers.getAddress(accounts[0])
        setAccount(acc);

        const signer = await prov.getSigner();
        const mediaStorage = new ethers.Contract(mediaStorageAdress, MediaStorageABI, signer);
        setMediaStorageContract(mediaStorage)
    }
    catch(error){
        console.log(error.message)
        alert(`Couldn't connect to MetaMask: ${error.message}\nCheck if you have metamask wallet installed`);
    }
}

async function getUser(setUserInfo, userEmail)
{
    let user = await getUserInfo(userEmail)
    setUserInfo(user)
}

async function onUpload(
    setQrCode, 
    setDragZoneState, 
    uploadedFileRef, 
    isVideoPlayerActiveRef,
    mediaStorageContract,
    userInfo)
{
    setDragZoneState(uploadingState)
    isVideoPlayerActiveRef.current = false

    let currentFile = uploadedFileRef.current

    let contentHash = await calculateSHA256(currentFile)
    console.log("[DEBUG] FILE SHA: " + contentHash)

    let ipfsHash = await pinFileToIPFS(currentFile)
    console.log("[DEBUG] IPFS HASH: " + ipfsHash)

    const ipfsUrl = createIpfsUlr(ipfsHash)
    console.log(ipfsUrl)

    if(currentFile != uploadedFileRef.current)
    {
        console.log("[DEBUG] Unpinning: " + ipfsHash)
        await unpinFileFromIPFS(ipfsHash)
        return;
    }

    setDragZoneState(finalizingUpload)
    try{
        const fileName = currentFile.path
        await mediaStorageContract.addMediaFile({url: ipfsUrl, contentHash: contentHash, name: fileName});
    
        let mediaDemoUrl = createMediaDemoUrl(userInfo.id, contentHash);
        
        setQrCode(createQrCodeComponent(mediaDemoUrl))
    }
    catch(error)
    {
        console.log(error.message)
    }

    setDragZoneState(defaultState)
    isVideoPlayerActiveRef.current = false
    uploadedFileRef.current = null
}

export const DragAndDropZone = () => {
    const {getAccessTokenSilently, user} = useAuth0();
    let [dragZoneState, setDragZoneState] = useState(null);
    let [qrCode, setQrCode] = useState(null)
    let [provider, setProvider] = useState(null)
    let [mediaStorageContract, setMediaStorageContract] = useState(null);
    let [account, setAccount] = useState(null)
    let [userInfo, setUserInfo] = useState(null)

    const uploadedFileRef = useRef(null);
    const isVideoPlayerActiveRef = useRef(false)

    if(!provider)
        {
            setupEther(
                setProvider, 
                setMediaStorageContract, 
                setAccount)
        }
    if(!userInfo)
        getUser(setUserInfo, user.email)

    const onDropCallback = useCallback((acceptedFiles) => {
        setDragZoneState(processingState)
        setQrCode(null)

        let file = acceptedFiles[0]
        uploadedFileRef.current = file

        isVideoPlayerActiveRef.current = true
    }, [])

    const onCancelClickFuncImpl = () =>
        {
            if(dragZoneState == finalizingUpload)
                return;

            setQrCode(null)
            uploadedFileRef.current = null
            setDragZoneState(defaultState)
            isVideoPlayerActiveRef.current = false
        }

    const onUploadClickFuncImpl = async () =>
        {
            if(!mediaStorageContract)
                return;

            onUpload(
                setQrCode, 
                setDragZoneState, 
                uploadedFileRef, 
                isVideoPlayerActiveRef,
                mediaStorageContract,
                userInfo);
        }

    const videoPlayerOnLoad = () => 
        {
            setDragZoneState(defaultState)
        }

      return (
        <div className='mainBackground justify-content-center align-items-center'>

            {
                qrCode
            }

            {
                dragZoneState==defaultState?
                <DragAndDropZoneEnabled callback={onDropCallback}/>
                : <h2 className='text-capitalize mt-3'>{dragZoneState}</h2>
            }

            {
                <VideoPlayer 
                uploadedFile={uploadedFileRef.current} 
                isActiveRef={isVideoPlayerActiveRef}
                onLoadCallback={videoPlayerOnLoad}/>
            }

            {
                uploadedFileRef.current !=null &&
                <div className="mt-2">
                    <Button buttonName={'Cancel upload'} onClickFunc={onCancelClickFuncImpl} />
                </div>
            }

            {
                uploadedFileRef.current != null &&
                dragZoneState != uploadingState &&
                <div className="mt-2 d-flex flex-column align-items-center">
                    <Button buttonName={'Upload'} onClickFunc={onUploadClickFuncImpl} />
                </div>
            }
        </div>
      )
}
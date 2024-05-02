import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useState} from "react";
import Header from '../../MainComponents/Header'
import {Button} from '../../MainComponents/Button'
import '../../Common/Styles/MainPart.css'
import { ReactComponent as UploadSign } from '../../Images/upload-sign.svg'

const DragAndDropZone = () => {
    return(
        <div class='mainBackground align-items-center justify-content-center'>
            <UploadSign fill='#284B63' width='5%' height='5%'/>
            <h2 class='text-capitalize mt-3'>Drag and Drop to Upload</h2>
        </div>
    )
}

const UserPageSideBar = ({setContentFunc}) => {
    return(
        <div class = 'sideBar'>
            <div class = 'buttonHolder'>
                <hr/>
                <h2 class = 'mt-2'>Menu</h2>
                <Button buttonName={"Upload video"} onClickFunc={() => {setContentFunc(<DragAndDropZone/>)}} />
                <Button buttonName={"Test"} onClickFunc={() => {}} />
                <Button buttonName={"Test"} onClickFunc={() => {}} />
            </div>
        </div>
    )
};

export const UserPage = () => {
    const {isAuthenticated} = useAuth0();
    let [userPageContent, setUserPageContent] = useState(<div></div>);
    // TODO: 
    return(
        isAuthenticated 
        && 
        <div class='mainBackground'>
            <Header/>
            <div className="mainBackground flex-row">
                {userPageContent}

                <UserPageSideBar setContentFunc={setUserPageContent}/>
            </div>
        </div>
    )
};
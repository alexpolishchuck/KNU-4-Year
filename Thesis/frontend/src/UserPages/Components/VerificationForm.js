import React, { useState } from 'react'

import '../../Common/Styles/MainPart.css'
import '../Styles/VerificationForm.css'
import { Button } from '../../MainComponents/Button'

function onInputFileChange(event, setInputFileName){
    const files = Array.from(event.target.files)
    setInputFileName(files[0].name)
}

export const VerificationForm = ({userId}) => {
    const [inputFileName, setInputFileName] = useState(null);

    return(
        <div className='mainBackground align-items-center'>
            <h1 className='my-3'>
                Verification Form
            </h1>
            <form className='verificationForm'>
            <div className="formGroup">
                <label for="nameInput">Name</label>
                <input className='inputText' type='text' id='nameInput' placeholder="Enter name"/>
            </div>
            <div className="formGroup">
                <label for="surnameInput">Surname</label>
                <input className='inputText' type='text' id='surnameInput' placeholder="Enter surname"/>
            </div>
            <div className="formGroup">
                <label className='me-2' for="exampleFormControlFile1">Photo of ID or driver's license</label>
                <input className='inputFile' type="file" id="exampleFormControlFile1"
                onInput={(e) => {onInputFileChange(e, setInputFileName)}}>
                </input>
                <span className='inputFileName'>{inputFileName}</span>
            </div>
            <div className="formGroup">
                <Button buttonName={"Submit"} onClickFunc={() => {}}/>
            </div>
            </form>
        </div>
    )
}
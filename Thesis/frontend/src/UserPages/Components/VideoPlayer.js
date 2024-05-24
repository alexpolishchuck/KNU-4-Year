import React from "react";
import {useState} from "react";
import ReactPlayer from 'react-player'
import {createReader} from './UserPageUtils';

export const VideoPlayer = ({uploadedFile, isActiveRef, onLoadCallback}) => 
{
    let [uploadedFileUrl, setUploadedFileUrl] = useState(null);
    let [videoPlayerContent, setVideoPlayerContent] = useState(<div></div>);

    if(!isActiveRef.current)
        return <div></div>

    const onFileRead = (res) => 
        {
            setUploadedFileUrl(res)

            setVideoPlayerContent(
                isActiveRef.current &&
                <div className="d-flex flex-column align-items-center mt-4">
                    <ReactPlayer url={uploadedFileUrl} controls={true} />
                </div>
            )

            onLoadCallback()
        }

    let fileReader = createReader(onFileRead)
    fileReader.readAsDataURL(uploadedFile)

    return (
       videoPlayerContent
    )
}
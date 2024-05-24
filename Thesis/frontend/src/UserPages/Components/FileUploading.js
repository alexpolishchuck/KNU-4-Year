import axios from 'axios'
import FormData from'form-data'
import { createIpfsUnpinUrl } from './UserPageUtils';

const JWT = process.env.REACT_APP_PINATA_API_KEY

export const pinFileToIPFS = async (file) => {
  try 
  {
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: "File name",
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const res = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
      }
    );

    const resData = await res.json();
    console.log(resData);

    if(resData.isDuplicate)
      return null

    return resData.IpfsHash
  } 
  catch (error) 
  {
    console.log(error);
  }

  return null
}

export const unpinFileFromIPFS = async (hash) => {
  let unpinUrl = createIpfsUnpinUrl(hash)

  try {
    const response = await fetch(
      unpinUrl,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: JWT,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
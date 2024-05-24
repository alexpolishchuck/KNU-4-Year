const ipfsUrl = process.env.REACT_APP_PINATA_RETRIEVAL_URL
const ipfsRemovalUrl = process.env.REACT_APP_PINATA_REMOVAL_URL

async function readFileAsArrayBuffer(file) {
    let fileBytes = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsArrayBuffer(file);
    });

    return fileBytes;
}

export function createReader(onLoadCallback)
{
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
        const res = reader.result
        onLoadCallback(res)
    }

    return reader
}

export async function calculateSHA256(uploadedFile)
{
    const CryptoJS = require('crypto-js');
    let fileBytes = await readFileAsArrayBuffer(uploadedFile)

    let sha256 = CryptoJS.algo.SHA256.create();

    const chunkSize = 10000;
    const length = fileBytes.byteLength;
    let offset = 0;
    while (offset < length) {
        const chunk = new Uint8Array(uploadedFile.slice(offset, offset + chunkSize));
        const fileWordArr = CryptoJS.lib.WordArray.create(chunk);
        sha256.update(fileWordArr)

        offset += chunkSize;
    }

    const hash = sha256.finalize()
    console.log(hash.toString())
        
    return hash.toString()
}

export function createIpfsUlr(ipfsHash)
{
    return ipfsUrl + '/ipfs/' + ipfsHash 
}

export function createIpfsUnpinUrl(ipfsHash)
{
    return ipfsRemovalUrl + '/' + ipfsHash
}

export function createMediaDemoUrl(userId, contentHash)
{
    return window.location.origin + `/${userId}/${contentHash}`
}
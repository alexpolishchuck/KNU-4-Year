// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract MediadOwner {

    struct MediaFile {
        string url;
        uint256 contentHash;
    }

    address private owner;
    MediaFile[] private mediaFiles;
    mapping (string => address) private urlToAddress;
    mapping (uint256 => address) private contentHashToAddress; 
    
    constructor(address owner_) {
        owner = owner_;
    }

    function addMediaFile(address ownerAddress, MediaFile memory mediaFile) public returns(bool) {
        require(ownerAddress == owner);

        if (contentHashToAddress[mediaFile.contentHash] != address(0)
            || urlToAddress[mediaFile.url] != address(0)) 
        {
            return false;
        }
        
        mediaFiles.push(MediaFile(mediaFile.url, mediaFile.contentHash));
        urlToAddress[mediaFile.url] = msg.sender;
        contentHashToAddress[mediaFile.contentHash] = msg.sender;

        return true;
    }

    function getMediaFiles() public view returns(MediaFile[] memory) {
        return mediaFiles;
    }
}
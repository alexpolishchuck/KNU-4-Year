// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
pragma abicoder v2;

contract MediaStorage {

    struct MediaFile {
        string url;
        uint256 contentHash;
        string name;
    }

    mapping (address => MediaFile[]) private addressToMediaFiles;
    mapping (string => address) private urlToAddress;
    mapping (uint256 => address) private contentHashToAddress;
    mapping (uint256 => string) private hashToUrl;

    function addMediaFile(MediaFile memory mediaFile) public{
        if (contentHashToAddress[mediaFile.contentHash] != address(0)
            || urlToAddress[mediaFile.url] != address(0)) 
        {
            revert("This media already exist");
        }
        
        addressToMediaFiles[msg.sender].push(MediaFile(mediaFile.url, mediaFile.contentHash, mediaFile.name));
        urlToAddress[mediaFile.url] = msg.sender;
        contentHashToAddress[mediaFile.contentHash] = msg.sender;
        hashToUrl[mediaFile.contentHash] = mediaFile.url;
    }

    function getMediaFiles(address owner) public view returns(MediaFile[] memory) {
        return addressToMediaFiles[owner];
    }

    function getMediaByHash(uint256 hash) public view returns(string memory) {
        return hashToUrl[hash];
    }

    function removeByUrl(string memory url) public {
        address owner = urlToAddress[url];
        MediaFile[] memory mediaFiles = addressToMediaFiles[owner];

        uint len = mediaFiles.length;

        for(uint i = 0; i < len; i++)
        {
            uint256 contentHash = mediaFiles[i].contentHash;

            delete urlToAddress[url];
            delete contentHashToAddress[contentHash];
            delete hashToUrl[contentHash];
            delete addressToMediaFiles[owner];
        }
        
    }     
}
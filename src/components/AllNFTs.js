import React, { useState, useEffect } from 'react';
import { BufferList } from "bl";
import { IPFS } from '../constants';
import { ethers } from "ethers";
import { BRIDGE } from '../contracts/Bridge';
import ipfsClient from "ipfs-http-client";
import NFTCards from './NFTCards';

const AllNFTs = ({ nftList }) => {
    //const [nftList, setNftList] = useState([]);
    const ipfs = ipfsClient({ host: IPFS.HOST, port: IPFS.PORT, protocol: IPFS.PROTOCOL });
    debugger

    /*     useEffect(() => {
            const loadNfts = async () => {
                const signer = await injectedProvider.getSigner();
                const bridgeContract = new ethers.Contract(BRIDGE.ADDRESS, BRIDGE.ABI, signer)
    
                const nrOfDepositedNFts = await bridgeContract.id();
                const nftsFromIpfs = [];
                //debugger
                for (let tokenId = 0; tokenId < nrOfDepositedNFts; tokenId++) {
                    let tokenFromBridge = await bridgeContract.allDepositsById(0);
                    console.log(tokenFromBridge);
                    const tokenURI = tokenFromBridge.tokenURI;
                    let nftMetadataFromIPFS = {};
                    for await (const file of ipfs.get(tokenURI)) {
                        const content = new BufferList()
                        for await (const chunk of file.content) {
                            content.append(chunk)
                        }
                        nftMetadataFromIPFS = JSON.parse(content.toString());
                    }
                    nftMetadataFromIPFS.bridgeId = tokenId;
                    nftsFromIpfs.push(nftMetadataFromIPFS);
                }
                debugger
    
                            // if (tokens.length > 0) {
                            //     for (let token of tokens) {
                            //         const tokenURI = token.tokenURI;
                            //         let nftMetadataFromIPFS = { name: 'name' };
                            //         for await (const file of ipfs.get(tokenURI)) {
                            //             const content = new BufferList()
                            //             for await (const chunk of file.content) {
                            //                 content.append(chunk)
                            //             }
                            //             nftMetadataFromIPFS = JSON.parse(content.toString());
                            //         }
                            //         nftMetadataFromIPFS.tokenId = token.identifier;
                            //         nftMetadataFromIPFS.myShares = token.balances.length === 1 ? token.balances[0].value : 0;
                            //         nftMetadataFromIPFS.sharesAmount = token.totalSupply;
                            //         nftsFromIpfs.push(nftMetadataFromIPFS);
                            //     }
                            // } 
                setNftList(nftsFromIpfs);
            }
            loadNfts();
            // eslint-disable-next-line
        }, []); */

    return (
        <>
            <NFTCards nftList={nftList} />

        </>
    )

}

export default AllNFTs;
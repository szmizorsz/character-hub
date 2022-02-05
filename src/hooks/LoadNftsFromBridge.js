import { useEffect, useState } from "react";
import { BufferList } from "bl";
import { IPFS } from '../constants';
import { ethers } from "ethers";
import { BRIDGE } from '../contracts/Bridge';
import ipfsClient from "ipfs-http-client";

export default function useNftsFromBridge(injectedProvider) {
    const [nftList, setNftList] = useState([]);
    const [ownNftList, setOwnNftList] = useState([]);
    const ipfs = ipfsClient({ host: IPFS.HOST, port: IPFS.PORT, protocol: IPFS.PROTOCOL });

    useEffect(() => {
        const loadNfts = async () => {
            const signer = await injectedProvider.getSigner();
            const bridgeContract = new ethers.Contract(BRIDGE.ADDRESS, BRIDGE.ABI, signer)

            const nrOfDepositedNFts = await bridgeContract.id();
            const nftsFromIpfs = [];
            for (let tokenId = 0; tokenId < nrOfDepositedNFts; tokenId++) {
                let tokenFromBridge = await bridgeContract.allDepositsById(tokenId);
                let tokenURI = tokenFromBridge.tokenURI;
                let nftMetadataFromIPFS = {};
                for await (const file of ipfs.get(tokenURI)) {
                    const content = new BufferList()
                    for await (const chunk of file.content) {
                        content.append(chunk)
                    }
                    nftMetadataFromIPFS = JSON.parse(content.toString());
                }
                nftMetadataFromIPFS.bridgeId = tokenId;
                nftMetadataFromIPFS.originalContract = tokenFromBridge.contractAddress;
                nftMetadataFromIPFS.owner = tokenFromBridge.owner;
                nftsFromIpfs.push(nftMetadataFromIPFS);
            }
            setNftList(nftsFromIpfs);
            const account = await injectedProvider.getSigner().getAddress();
            const ownNfts = nftsFromIpfs.filter(item => item.owner === account);
            setOwnNftList(ownNfts);
        }
        loadNfts();
        // eslint-disable-next-line
    }, [injectedProvider]);

    return [nftList, ownNftList];
}
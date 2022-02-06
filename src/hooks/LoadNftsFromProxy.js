import { useEffect, useState } from "react";
import { BufferList } from "bl";
import { IPFS } from '../constants';
import { ethers } from "ethers";
import { TOKEN_PROXY } from "../contracts/TokenProxy";
import ipfsClient from "ipfs-http-client";

export default function useNftsFromProxy(injectedProvider) {
    const [nftList, setNftList] = useState([]);
    const [ownNftList, setOwnNftList] = useState([]);
    const ipfs = ipfsClient({ host: IPFS.HOST, port: IPFS.PORT, protocol: IPFS.PROTOCOL });

    useEffect(() => {
        const loadNfts = async () => {
            const signer = await injectedProvider.getSigner();
            const proxyContract = new ethers.Contract(TOKEN_PROXY.ADDRESS, TOKEN_PROXY.ABI, signer)

            const nrOfProxies = await proxyContract.nrOfProxies();
            const nftsFromIpfs = [];
            for (let tokenId = 0; tokenId < nrOfProxies; tokenId++) {
                let proxy = await proxyContract.getProxyById(tokenId);
                let tokenURI = proxy.tokenURI;
                let nftMetadataFromIPFS = {};
                for await (const file of ipfs.get(tokenURI)) {
                    const content = new BufferList()
                    for await (const chunk of file.content) {
                        content.append(chunk)
                    }
                    nftMetadataFromIPFS = JSON.parse(content.toString());
                }
                nftMetadataFromIPFS.proxyId = tokenId;
                nftMetadataFromIPFS.originalContract = proxy.originalContractAddress;
                nftMetadataFromIPFS.owner = proxy.owner;
                nftMetadataFromIPFS.withLocking = proxy.withLocking;
                nftMetadataFromIPFS.tokenURI = tokenURI;
                nftsFromIpfs.push(nftMetadataFromIPFS);
            }
            debugger
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
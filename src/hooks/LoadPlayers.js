import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FIELD_MANAGER } from '../contracts/FieldManager';
import { FIELD } from "../contracts/Field";
import { BufferList } from "bl";
import { IPFS } from '../constants';
import ipfsClient from "ipfs-http-client";

export default function usePlayers(fieldId, injectedProvider) {
    const [players, setPlayers] = useState([]);
    const ipfs = ipfsClient({ host: IPFS.HOST, port: IPFS.PORT, protocol: IPFS.PROTOCOL });

    useEffect(() => {
        const loadPlayers = async () => {
            const signer = await injectedProvider.getSigner();
            const fieldManagerContract = new ethers.Contract(FIELD_MANAGER.ADDRESS, FIELD_MANAGER.ABI, signer);
            let fieldAddress = await fieldManagerContract.fields(fieldId);
            let fieldContract = new ethers.Contract(fieldAddress, FIELD.ABI, signer);

            const nrOfPlayers = await fieldContract.playerId();
            const playersFromContract = [];
            for (let playerId = 0; playerId < nrOfPlayers; playerId++) {
                let player = await fieldContract.getPlayerDataById(playerId);
                let tokenURI = player._tokenURI;
                let playerMetadataFromIPFS = {};
                for await (const file of ipfs.get(tokenURI)) {
                    const content = new BufferList()
                    for await (const chunk of file.content) {
                        content.append(chunk)
                    }
                    playerMetadataFromIPFS = JSON.parse(content.toString());
                }
                playersFromContract.push(playerMetadataFromIPFS);
                //console.log(player)
            }
            //debugger
            //console.log(playersFromContract)
            setPlayers(playersFromContract)
        }
        loadPlayers();
        // eslint-disable-next-line
    }, [injectedProvider]);

    return players;
}
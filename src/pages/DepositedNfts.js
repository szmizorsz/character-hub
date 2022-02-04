import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import DepositNftDialog from '../components/DepositNftDialog';
import { ethers } from "ethers";
import { BRIDGE } from '../contracts/Bridge';

const DepositedNfts = ({ injectedProvider }) => {
    const [nftDepositDialogOpen, setNftDepositDialogOpen] = useState(false);

    useEffect(() => {
        if (injectedProvider) {
            load();
        }
    }, []);

    const load = async () => {
        console.log(await injectedProvider.getSigner().getAddress())
        const signer = await injectedProvider.getSigner();
        const bridgeContract = new ethers.Contract(BRIDGE.ADDRESS, BRIDGE.ABI, signer)
        const id = await bridgeContract.id();
        console.log(id.toNumber())
    }

    if (!injectedProvider) {
        return (
            <Box mt={10}>
                <div>
                    Loading... please, make sure that ehtereum is selected network!
                </div>
            </Box>
        )
    }

    return (
        <>
            <Button
                onClick={() => { setNftDepositDialogOpen(true) }}
                variant="outlined"
                type="submit">
                Deposit NFT
            </Button>

            <DepositNftDialog
                injectedProvider={injectedProvider}
                nftDepositDialogOpen={nftDepositDialogOpen}
                setNftDepositDialogOpen={setNftDepositDialogOpen} />
        </>
    )
}

export default DepositedNfts;

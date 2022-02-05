import React from 'react';
import { TextField, Button } from '@material-ui/core/'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { ethers } from "ethers";
import { BRIDGE } from '../contracts/Bridge';
import { ERC721 } from '../contracts/ERC721';

const DepositNftDialog = ({ injectedProvider, nftDepositDialogOpen, setNftDepositDialogOpen }) => {
    const [originalContract, setOriginalContract] = React.useState('');
    const [originalTokenId, setOriginalTokenId] = React.useState('');
    const [withLocking, setWithLocking] = React.useState('true');

    const handleSubmit = async () => {
        //debugger
        const signer = await injectedProvider.getSigner();
        const bridgeContract = new ethers.Contract(BRIDGE.ADDRESS, BRIDGE.ABI, signer)

        const withLockingBool = withLocking === 'true' ? true : false;

        if (withLockingBool) {
            const erc721Contract = new ethers.Contract(originalContract, ERC721.ABI, signer)
            await erc721Contract.approve(BRIDGE.ADDRESS, originalTokenId);
        }

        await bridgeContract.deposit(originalContract, originalTokenId, withLockingBool);

        handleClose();
    };

    const handleClose = async () => {
        setOriginalContract('');
        setOriginalTokenId('');
        setWithLocking(false);
        setNftDepositDialogOpen(false);
    };

    const handleRadioChange = (event) => {
        setWithLocking(event.target.value);
    };

    return (
        <>
            <Dialog open={nftDepositDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
                <DialogTitle id="form-dialog-title">NFT deposit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        'Please, specify the contract address and the token id of your NFT! You can also choose if you want to lock your NFT and create a unique proxy on Polygon'
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="originalContract"
                        label="Contract address"
                        value={originalContract}
                        onInput={e => setOriginalContract(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="originalTokenId"
                        label="Token ID"
                        value={originalTokenId}
                        onInput={e => setOriginalTokenId(e.target.value)}
                        type="number"
                        fullWidth
                    />
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" value={withLocking} onChange={handleRadioChange}>
                            <FormControlLabel value="true" control={<Radio />} label="Unique proxy (With locking on Ethereum)" />
                            <FormControlLabel value="false" control={<Radio />} label="Inflationary proxy (Without locking)" />
                        </RadioGroup>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { handleSubmit() }} color="primary">
                        Deposit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DepositNftDialog;

/*
import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box'
import { ethers } from "ethers";
import { MERAL_MOCK } from '../contracts/MeralMock';

const DepositNft = ({ web3Modal, injectedProvider }) => {

    useEffect(() => {
        if (injectedProvider) {
            signer();
        }
    }, []);

    const signer = async () => {
        //const provider = new ethers.providers.Web3Provider(web3Modal);
        //console.log(await injectedProvider.getSigner().getAddress())
        const signer = await injectedProvider.getSigner();
        const contract = new ethers.Contract(MERAL_MOCK.ADDRESS, MERAL_MOCK.ABI, signer)
        const onwerOf0 = await contract.ownerOf(0);
        console.log(onwerOf0)
    }

    return (
        <Box mt={2}>
            Hello

        </Box>
    )

}

export default DepositNft; */

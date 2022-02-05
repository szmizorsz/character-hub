import React from 'react';
import { TextField, Button } from '@material-ui/core/'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ethers } from "ethers";
import { FIELD_MANAGER } from '../contracts/FieldManager';

const CreateFieldDialog = ({ injectedProvider, createFieldDialogOpen, setCreateFieldDialogOpen }) => {
    const [name, setName] = React.useState('');
    const [symbol, setSymbol] = React.useState('');

    const handleSubmit = async () => {
        //debugger
        const signer = await injectedProvider.getSigner();
        const fieldManagerContract = new ethers.Contract(FIELD_MANAGER.ADDRESS, FIELD_MANAGER.ABI, signer)

        await fieldManagerContract.createField(name, symbol);

        handleClose();
    };

    const handleClose = async () => {
        setName('');
        setSymbol('');
        setCreateFieldDialogOpen(false);
    };

    return (
        <>
            <Dialog open={createFieldDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
                <DialogTitle id="form-dialog-title">Create field</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        'Please, specify the field name and symbol (ERC721 name and ticker)'
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        value={name}
                        onInput={e => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="symbol"
                        label="Symbol"
                        value={symbol}
                        onInput={e => setSymbol(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { handleSubmit() }} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CreateFieldDialog;

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

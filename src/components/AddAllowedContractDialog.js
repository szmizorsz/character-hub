import React from 'react';
import { TextField, Button } from '@material-ui/core/'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ethers } from "ethers";
import { FIELD_MANAGER } from '../contracts/FieldManager';
import { FIELD } from '../contracts/Field';
import loadFields from '../utils/LoadFields';

const AddAllowedContractDialog = ({ injectedProvider, fieldId, allowedContractDialogOpen, setAllowedContractDialogOpen, setFields }) => {
    const [contract, setContract] = React.useState('');

    const handleSubmit = async () => {
        debugger
        const signer = await injectedProvider.getSigner();
        const fieldManagerContract = new ethers.Contract(FIELD_MANAGER.ADDRESS, FIELD_MANAGER.ABI, signer)

        const fieldAddress = await fieldManagerContract.fields(fieldId);
        let fieldContract = new ethers.Contract(fieldAddress, FIELD.ABI, signer);

        const tx = await fieldContract.setAllowedContract(contract, true);
        await tx.wait();
        await loadFields(injectedProvider, setFields);

        handleClose();
    };

    const handleClose = async () => {
        setContract('');
        setAllowedContractDialogOpen(false);
    };

    return (
        <>
            <Dialog open={allowedContractDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
                <DialogTitle id="form-dialog-title">Add allowed contract</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can add contract address where this field will accept players from
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="contract"
                        label="Contract address"
                        value={contract}
                        onInput={e => setContract(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { handleSubmit() }} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddAllowedContractDialog;

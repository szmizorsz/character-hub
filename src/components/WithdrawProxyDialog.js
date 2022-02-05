import React, { useState } from 'react';
import { Button } from '@material-ui/core/'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const WithdrawProxyDialog = ({ withdrawProxyDialogOpen, setWithdrawProxyDialogOpen }) => {

    const handleClose = async () => {
        setWithdrawProxyDialogOpen(false);
    };

    return (
        <>
            <Dialog open={withdrawProxyDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
                <DialogTitle id="form-dialog-title">Proxy withdrawal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Withdrawal means that the proxy is deleted and if it was unique than the original NFT is released from the escrow.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { }} color="primary">
                        Withdraw
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default WithdrawProxyDialog;


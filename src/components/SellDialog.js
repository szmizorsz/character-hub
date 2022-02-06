import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core/'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const SellDialog = ({ sellDialogOpen, setSellDialogOpen }) => {
    const [sellOption, setSellOption] = useState('onlyProxy')
    const [price, setPrice] = useState();

    const handleClose = async () => {
        setSellDialogOpen(false);
    };

    const handleRadioChange = (event) => {
        setSellOption(event.target.value);
    };

    return (
        <>
            <Dialog open={sellDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
                <DialogTitle id="form-dialog-title">Sale</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can sell your NFT proxy or your original NFT and its proxy in a package.
                    </DialogContentText>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="sellOption" name="sellOption" value={sellOption} onChange={handleRadioChange}>
                            <FormControlLabel value="onlyProxy" control={<Radio />} label="Only proxy" />
                            <FormControlLabel value="package" control={<Radio />} label="Proxy and the original NFT in package (for unique proxies only)" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        value={price}
                        onInput={e => setPrice(e.target.value)}
                        type="number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { }} color="primary">
                        Sell
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SellDialog;


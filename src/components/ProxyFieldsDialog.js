import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core/'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ethers } from "ethers";
import { FIELD_MANAGER } from '../contracts/FieldManager';
import { FIELD } from '../contracts/Field';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    tableNameCell: {
        borderBottom: 'none',
        fontSize: '13pt'
    },
    tableButtonCell: {
        borderBottom: 'none'
    },
    tableRow: {
        height: 5
    },
    tableContainer: {
        boxShadow: "none"
    },
}));

const ProxyFieldsDialog = ({ proxy, fields, injectedProvider }) => {
    const classes = useStyles();
    const [proxyFieldsDialogOpen, setProxyFieldsDialogOpen] = useState(false);
    debugger

    useEffect(() => {
        const loadProxyHasPlayer = async () => {
            const signer = await injectedProvider.getSigner();
            for (let field of fields) {
                let fieldContract = new ethers.Contract(field.address, FIELD.ABI, signer);
                let proxyIsAPlayerOnThisField = await fieldContract.proxyIdHasPlayer(proxy.proxyId);
                field.proxyHasPlayer = proxyIsAPlayerOnThisField;
            }
            debugger
        }
        loadProxyHasPlayer();
        // eslint-disable-next-line
    }, [injectedProvider]);

    const handleSubmit = async (fieldId) => {
        const signer = await injectedProvider.getSigner();
        const fieldManagerContract = new ethers.Contract(FIELD_MANAGER.ADDRESS, FIELD_MANAGER.ABI, signer)
        const fieldAddress = await fieldManagerContract.fields(fieldId);
        let fieldContract = new ethers.Contract(fieldAddress, FIELD.ABI, signer);
        await fieldContract.mintPlayer(proxy.proxyId, proxy.owner, proxy.originalContract, proxy.tokenURI);

        handleClose();
    };

    const handleClose = async () => {
        setProxyFieldsDialogOpen(false);
    };

    const enterDisplay = (proxyHasPlayer, fieldId) => {
        if (proxyHasPlayer) {
            return 'Already entered'
        } else {
            return <Button onClick={() => { handleSubmit(fieldId) }} color="primary">
                Enter
            </Button>
        }
    }

    return (
        <>
            <Button
                onClick={() => { setProxyFieldsDialogOpen(true) }}
                variant="outlined"
                type="submit">
                Fields
            </Button>
            <Dialog open={proxyFieldsDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
                <DialogTitle id="form-dialog-title">Fields</DialogTitle>
                <DialogContent>
                    <TableContainer className={classes.tableContainer} component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {fields.map((row) => (
                                    <TableRow key={row.fieldId}>
                                        <TableCell className={classes.tableNameCell}>{row.name}</TableCell>
                                        <TableCell className={classes.tableButtonCell}>{enterDisplay(row.proxyHasPlayer, row.fieldId)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ProxyFieldsDialog;

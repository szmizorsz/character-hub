import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField } from '@material-ui/core/';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core/'
import CreateFieldDialog from '../components/CreateFieldDialog';
import useFields from '../hooks/LoadFields';
import AddAllowedContractDialog from '../components/AddAllowedContractDialog';
import PlayerCards from '../components/PlayerCards';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const IconLeftAccordionSummary = withStyles({
    expandIcon: {
        order: -1
    }
})(AccordionSummary);

const Accordion = withStyles({
    root: {
        border: 'none',
        boxShadow: 'none',

    },
    expanded: {},
})(MuiAccordion);

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'none',
        },
    },
    tableContainer: {
        boxShadow: "none"
    },
    tableCell: {
        fontSize: '16pt',
    }
});

const allowedContractsValue = (allowedContracts) => {
    if (allowedContracts.length === 0) {
        return "All";
    } else {
        return allowedContracts;
    }
}

function Row({ injectedProvider, row }) {
    const [open, setOpen] = React.useState(false);
    const [allowedContractDialogOpen, setAllowedContractDialogOpen] = useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" className={classes.tableCell}>
                    {row.name}
                </TableCell>
            </TableRow>
            <TableRow className={classes.root}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Grid container className={classes.root}>
                                <Grid md={2}></Grid>
                                <Grid item xs={12} md={3}>
                                    <Box>
                                        <TextField InputProps={{ disableUnderline: true }} label="Symbol" fullWidth value={row.symbol || ''} margin="dense" />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <Box>
                                        <TextField InputProps={{ disableUnderline: true }} label="Address" fullWidth value={row.address || ''} margin="dense" />
                                    </Box>
                                </Grid>
                                <Grid md={2}></Grid>
                                <Grid md={1}>
                                    <Box mt={1}>
                                        <Button
                                            onClick={() => { setAllowedContractDialogOpen(true) }}
                                            variant="outlined"
                                            type="submit">
                                            Modify
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Box ml={2}>
                                        <TextField InputProps={{ disableUnderline: true }} label="Allowed contracts" fullWidth value={allowedContractsValue(row.allowedContracts) || ''} margin="dense" />
                                    </Box>
                                </Grid>
                                <Grid md={2}></Grid>
                                <Grid item xs={12} md={10}>
                                    <Accordion>
                                        <IconLeftAccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                            style={{ border: 'none' }}
                                        >
                                            <Box ml={3}><Typography>Players on the field</Typography></Box>
                                        </IconLeftAccordionSummary>
                                        <AccordionDetails>
                                            <PlayerCards fieldId={row.fieldId} injectedProvider={injectedProvider} />
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
                <AddAllowedContractDialog
                    injectedProvider={injectedProvider}
                    fieldId={row.fieldId}
                    allowedContractDialogOpen={allowedContractDialogOpen}
                    setAllowedContractDialogOpen={setAllowedContractDialogOpen} />
            </TableRow>
        </React.Fragment>
    );
}

export default function Fields({ injectedProvider }) {
    const classes = useRowStyles();
    const [createFieldDialogOpen, setCreateFieldDialogOpen] = useState(false);
    const fields = useFields(injectedProvider);

    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer} >
                <Table aria-label="collapsible table" className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}><Box fontWeight="fontWeightBold">Fields</Box></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map((row) => (
                            <Row
                                injectedProvider={injectedProvider}
                                key={row.id}
                                row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={1}>
                <Button
                    onClick={() => { setCreateFieldDialogOpen(true) }}
                    variant="outlined"
                    type="submit">
                    Create field
                </Button>
            </Box>
            <CreateFieldDialog
                injectedProvider={injectedProvider}
                createFieldDialogOpen={createFieldDialogOpen}
                setCreateFieldDialogOpen={setCreateFieldDialogOpen} />
        </>
    );
}

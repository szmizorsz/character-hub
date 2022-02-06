import React from 'react';
import { Box } from '@material-ui/core/';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import banner from '../assets/game_banner1.png';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    name: {
        fontSize: '16pt',
    },
    field: {
        fontSize: '14pt',
    }
});

export default function Games() {
    const classes = useRowStyles();

    return (
        <>
            <Accordion>
                <IconLeftAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    style={{ border: 'none' }}
                >
                    <Box ml={3}><Typography className={classes.name}>Etherorcs attacks Ethemerals</Typography></Box>
                </IconLeftAccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item md={12}>
                            <Box ml={10}><img src={banner} alt="Game banner" /></Box>
                        </Grid>
                        <Grid item md={12}>
                            <Box ml={15}><Typography align="center">Interactive gameplay with parties of Orcs trying to attack the kingdom of Merals</Typography></Box>
                        </Grid>
                        <Grid item md={10}>
                            <Box mt={5} ml={15}><Typography className={classes.field}>Built on field: Ethemerals and Etherorcs</Typography></Box>
                        </Grid>
                        <Grid item md={2}>
                            <Box mt={5} ml={5}>
                                <Button
                                    onClick={() => { }}
                                    variant="contained"
                                    type="submit">
                                    Open game
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <IconLeftAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    style={{ border: 'none' }}
                >
                    <Box ml={3}><Typography className={classes.name}>Ethemerals build a new kingdom in the Wilds</Typography></Box>
                </IconLeftAccordionSummary>
            </Accordion>
            <Accordion>
                <IconLeftAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    style={{ border: 'none' }}
                >
                    <Box ml={3}><Typography className={classes.name}>Ultimate battle of any character</Typography></Box>
                </IconLeftAccordionSummary>
            </Accordion>
        </>
    );
}

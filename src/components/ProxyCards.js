import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@material-ui/core';
import WithdrawProxyDialog from './WithdrawProxyDialog';
import SellDialog from './SellDialog';

const useStyles = makeStyles((theme) => ({

    root: {
        maxWidth: 400
    },
    card: {
        width: "200px",
        height: "222px"
    },
    media: {
        height: "62vh",
        width: "41vh",
    },
}));

const uniqueIconDisplay = (withLocking) => {
    if (withLocking) {
        return <Tooltip title="Unique">
            <   StarIcon />
        </Tooltip>;
    }
}

const ProxyCards = ({ nftList }) => {
    const classes = useStyles();
    const [fieldsDialogOpen, setFieldsDialogOpen] = useState(false);
    const [withdrawProxyDialogOpen, setWithdrawProxyDialogOpen] = useState(false);
    const [sellDialogOpen, setSellDialogOpen] = useState(false);

    return (
        <Grid container>
            {nftList.map((row) => (
                <Grid item xs={12} md={6} key={row.name}>
                    <Box ml={5} mb={6} >
                        <Card className={classes.root} >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={row.image}
                                    title={row.description}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="p" color="textSecondary" >
                                        {row.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Box ml={1} mr={9} >
                                    {uniqueIconDisplay(row.withLocking)}
                                </Box>
                                <Box ml={20}>
                                    <Button
                                        onClick={() => { setFieldsDialogOpen(true) }}
                                        variant="outlined"
                                        type="submit">
                                        Fields
                                    </Button>
                                </Box>
                                <Box>
                                    <Button
                                        onClick={() => { setWithdrawProxyDialogOpen(true) }}
                                        variant="outlined"
                                        type="submit">
                                        Withdraw
                                    </Button>
                                </Box>
                                <Box>
                                    <Button
                                        onClick={() => { setSellDialogOpen(true) }}
                                        variant="outlined"
                                        type="submit">
                                        Sell
                                    </Button>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                    <WithdrawProxyDialog
                        withdrawProxyDialogOpen={withdrawProxyDialogOpen}
                        setWithdrawProxyDialogOpen={setWithdrawProxyDialogOpen} />
                    <SellDialog
                        sellDialogOpen={sellDialogOpen}
                        setSellDialogOpen={setSellDialogOpen} />
                </Grid>
            ))}
        </Grid>
    );

}
export default ProxyCards;
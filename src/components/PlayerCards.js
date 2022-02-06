import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import usePlayers from '../hooks/LoadPlayers';

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


const PlayerCards = ({ fieldId, injectedProvider }) => {
    const classes = useStyles();
    const players = usePlayers(fieldId, injectedProvider);

    return (
        <Grid container>
            {players.map((row) => (
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
                        </Card>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );

}
export default PlayerCards;
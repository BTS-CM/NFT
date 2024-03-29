import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ReactGA from 'react-ga4';
ReactGA.initialize('G-CTZ1V9EXWY');

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Viewers(properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  useEffect(() => {
    ReactGA.pageview('Other galleries')
  }, []);

  return ([
    <Grid item xs={12} key={"Viewer grid"}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5">
          {i18n.t('viewers:nft.header')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {i18n.t('viewers:nft.body')}
        </Typography>
        <a href={`http://nft.iamredbar.com/`}>
          <Button size="small" className={classes.button} variant="contained">Art-o-Matic</Button>
        </a>
        <a href={`https://artcasa.gallery/`}>
          <Button size="small" className={classes.button} variant="contained">ArtCASA</Button>
        </a>
        <a href={`https://alguienalli.github.io/`}>
          <Button size="small" className={classes.button} variant="contained">Alguien's Bitshares NFT Explorer</Button>
        </a>
      </Paper>
    </Grid>,
    <Grid item xs={12} key={"Viewer grid"}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5">
          {i18n.t('viewers:blockchain.header')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {i18n.t('viewers:blockchain.body')}
        </Typography>
        <a href={`https://wallet.bitshares.org/#/explorer/assets`}>
          <Button size="small" className={classes.button} variant="contained">Bitshares.org</Button>
        </a>
        <a href={`https://ex.xbts.io/explorer/assets`}>
          <Button size="small" className={classes.button} variant="contained">XBTS.io</Button>
        </a>
        <a href={`https://www.gdex.io/explorer/assets`}>
          <Button size="small" className={classes.button} variant="contained">GDEX.io</Button>
        </a>
        <a href={`https://bts.ai/`}>
          <Button size="small" className={classes.button} variant="contained">BTS.AI</Button>
        </a>
        <a href={`https://api.testnet.bitshares.ws/docs`}>
          <Button size="small" className={classes.button} variant="contained">Insight</Button>
        </a>
        <a href={`https://cryptofresh.com`}>
          <Button size="small" className={classes.button} variant="contained">cryptofresh</Button>
        </a>
      </Paper>
    </Grid>
  ]);
}

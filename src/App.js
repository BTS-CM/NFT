import './App.css';

import React, {useEffect, useState} from 'react';
import { useQuery } from 'react-query';

import {Apis} from "bitsharesjs-ws";
import 'fontsource-roboto';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import NFT from "./NFT";
const art = require("./art.json");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

function Gallery() {

  const [server, setServer] = useState()
  const [nfts, setNfts] = useState([]);

  async function initialize () {
    if (!nfts || !nfts.length) {
      await Apis.instance("wss://node.testnet.bitshares.eu", true).init_promise;
      let assets = await Apis.db.get_assets(art.art);
      setNfts(assets.filter(x => x));
    }
  }

  useEffect(() => {
    initialize()
  }, []);

  const classes = useStyles();

  return nfts && nfts.length > 0
    ? nfts.map(nft => <NFT apis={Apis} data={nft} key={nft.id} />)
    : [];
}

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Bitshares NFT viewer</Paper>
          </Grid>
          <Gallery />
        </Grid>
      </Container>
    </div>
  );
}

import { Link } from "react-router-dom";

import React, { useState } from 'react';
import { Apis } from "bitsharesjs-ws";
import { useQuery } from 'react-query'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import CarouselElement from "./Carousel";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  leftPaper: {
    padding: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  rightPaper: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  left: {
    marginRight: theme.spacing(1),
  },
  center: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  right: {
    marginLeft: theme.spacing(1)
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  a: {
    color: theme.palette.text.secondary,
    textDecoration: 'none'
  },
  button: {
    margin: theme.spacing(1)
  },
  stat: {
    margin: theme.spacing(1)
  }
}));

function diff_years(dt2, dt1) {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25));

}

export default function MainPage(properties) {
  const classes = useStyles();
  const art = properties && properties.art ? properties.art : [];

  let genesis = new Date(2013,6,2);
  let now = new Date();

  const [nfts, setNfts] = useState([]);
  const { data, error } = useQuery('all', async () => {
    await Apis.instance("wss://node.testnet.bitshares.eu", true).init_promise;
    return await Apis.db.get_assets(art.map(asset => asset.name));
  });

  if (!nfts || !nfts.length) {
    if (data && !error) {
      setNfts(data.filter(x => x))
    }
  }

  return ([
    <Grid item xs={12} sm={6} key={"Index featured NFT"}>
      <Paper className={classes.leftPaper}>
        <Typography gutterBottom variant="h5">
          Featured NFTs
        </Typography>
        <CarouselElement nfts={nfts} art={art} featured={true} {...properties} />
      </Paper>
    </Grid>,
    <Grid item xs={12} sm={6} key={"Index recent NFT"}>
      <Paper className={classes.rightPaper}>
        <Typography gutterBottom variant="h5">
          New NFTs
        </Typography>
        <CarouselElement nfts={nfts.slice(0,6)} art={art} featured={false} {...properties} />
      </Paper>
    </Grid>,
    <Grid item xs={12} sm={6} key={"Index artist prompt"}>
      <Paper className={classes.leftPaper}>
        <Typography gutterBottom variant="h5">
          Calling all artists!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you interested in monetizing your art?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Issue your NFT on the Bitshares decentralized exchange!
        </Typography>
      </Paper>
    </Grid>,
    <Grid item xs={12} sm={6} key={"Index gallery prompt"}>
      <Paper className={classes.rightPaper}>
        <Typography gutterBottom variant="h5">
          Prospective gallery owners
        </Typography>
        <Typography variant="body1" gutterBottom>
          Interested in creating your own gallery?
        </Typography>
        <Typography variant="body1" gutterBottom>
          This gallery is <a href="https://github.com/BTS-CM/NFT">fully open-source</a> and <a href="/license">MIT licensed</a>.
        </Typography>
      </Paper>
    </Grid>,
    <Grid item xs={12} sm={6} key={"Index trader prompt"}>
      <Paper className={classes.leftPaper}>
        <Typography gutterBottom variant="h5">
          Interested in trading NFT on the BTS DEX?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Find out <a href="https://how.bitshares.works/en/master/user_guide/create_account.html">how to create a Bitshares account</a> & get trading today!
        </Typography>
        <a href={`https://wallet.bitshares.org`}>
          <Button size="small" className={classes.button} variant="contained">Bitshares.org</Button>
        </a>
        <a href={`https://ex.xbts.io/`}>
          <Button size="small" className={classes.button} variant="contained">XBTS.io</Button>
        </a>
        <a href={`https://www.gdex.io/`}>
          <Button size="small" className={classes.button} variant="contained">GDEX.io</Button>
        </a>
        <a href={`https://github.com/bitshares/bitshares-ui/releases`}>
          <Button size="small" className={classes.button} variant="contained">Desktop app</Button>
        </a>
      </Paper>
    </Grid>,
    <Grid item xs={12} sm={6} key={"Index unsure prompt"}>
      <Paper className={classes.rightPaper}>
        <Typography gutterBottom variant="h5">
          Unsure about Bitshares?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Fees on the BTS DEX are <a href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">competitively low</a>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Its' environmental footprint <a href="https://how.bitshares.works/en/master/technology/dpos.html">is low</a>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Its' <a href="https://how.bitshares.works/en/master/technology/bitshares_features.html#industrial-performance-and-scalability">performance is unrivaled</a>; don't settle for less!
        </Typography>
      </Paper>
    </Grid>,

    <Grid item xs={12} sm={4} key={"stats 1"}>
      <Card className={classes.stat}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Listed NFTs
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {art.length}
          </Typography>
        </CardContent>
      </Card>
    </Grid>,
    <Grid item xs={12} sm={4} key={"stats 1"}>
      <Card className={classes.stat}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Featured artists
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            1
          </Typography>
        </CardContent>
      </Card>
    </Grid>,
    <Grid item xs={12} sm={4} key={"stats 1"}>
      <Card className={classes.stat}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Years since Bitshares launch
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {
              diff_years(genesis, now) + " years"
            }
          </Typography>
        </CardContent>
      </Card>
    </Grid>

  ]);
}

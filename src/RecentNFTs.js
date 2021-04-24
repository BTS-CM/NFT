import React, { useState } from 'react';
import { Apis } from "bitsharesjs-ws";
import { useQuery } from 'react-query'

import Grid from '@material-ui/core/Grid';

import {
  Link as RouterLink,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const { getImage, getPngDimensions } = require("./images");


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function SingleCard(properties) {
  const classes = useStyles();
  const data = properties.data;
  let symbol = data.symbol;
  let options = data.options;
  let description = JSON.parse(options.description);
  let nft_object = description.nft_object;
  let title = nft_object.title ? nft_object.title : undefined;
  let artist = nft_object.artist ? nft_object.artist : undefined;

  let { image, imgURL } = getImage(nft_object); // retrieving best match media key

  // href={}

  return (
    <Button component={RouterLink} to={`/nft/${symbol}`}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imgURL}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Issued by {artist}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Button>
  );
}

function Recents(properties) {
  const art = properties && properties.art ? properties.art : [];
  const [nfts, setNfts] = useState([]);
  const { data, error } = useQuery('all', async () => {
    await Apis.instance("wss://node.testnet.bitshares.eu", true).init_promise;
    return await Apis.db.get_assets(art.slice(0, 6).map(asset => asset.name));
  });

  if (!nfts || !nfts.length) {
    if (data && !error) {
      setNfts(data.filter(x => x))
    }
  }

  return nfts && nfts.length > 0
    ? nfts.map(nft => <SingleCard data={nft} key={nft.id + "_recent_card"} />)
    : [];
}

export default function RecentNFTs(properties) {
  const classes = useStyles();

  return ([
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
      <Recents {...properties} />
    </ButtonGroup>,
  ]);
}

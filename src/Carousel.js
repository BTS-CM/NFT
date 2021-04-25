import React, { useState } from 'react';
import { Apis } from "bitsharesjs-ws";
import { useQuery } from 'react-query'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { Link } from "react-router-dom";

import {
  Link as RouterLink,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const { getImage, getPngDimensions } = require("./images");


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  button: {
    margin: theme.spacing(1)
  },
}));

export default function CarouselElement(properties) {
  const classes = useStyles();
  let nfts = properties && properties.nfts ? properties.nfts : [];

  let art = properties.art;
  let featured = properties.featured;

  let desiredNFT = featured
                    ? art
                      .filter(x => x.featured === true)
                      .map(nft => nft.name)
                    : [];

  const carouselItems = nfts && nfts.length > 0
    ? nfts.map(nft => {
      let symbol = nft.symbol;
      if (featured && !desiredNFT.includes(symbol)) {
        return undefined;
      }
      let options = nft.options;
      let description = JSON.parse(options.description);
      let nft_object = description.nft_object;
      let title = nft_object.title ? nft_object.title : undefined;
      let artist = nft_object.artist ? nft_object.artist : undefined;

      let { image, imgURL } = getImage(nft_object); // retrieving best match media key

      return <div key={nft.id + "_featured_div"}>
                <Link to={`/nft/${symbol}`}>
                  <img src={imgURL}/>
                  <Button className={classes.button} variant="contained">"{title}" by {artist}</Button>
                </Link>
             </div>;
    }).filter(x => x)
    : [];

  return (
      <Carousel showIndicators={false} showThumbs={false}>{carouselItems}</Carousel>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const { getImage } = require("./images");

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
  const { i18n } = useTranslation();
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
                  <img src={imgURL} alt={`${nft.id}_featured_div`} />
                  <Button className={classes.button} variant="contained">"{title}"{i18n.t('carousel:by')}{artist}</Button>
                </Link>
             </div>;
    }).filter(x => x)
    : [];

  return (
      <Carousel showIndicators={false} showThumbs={false}>{carouselItems}</Carousel>
  );
}

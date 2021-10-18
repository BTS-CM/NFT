import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const { getImage } = require("./images");
const { useQueryHook } = require("./reactQuery");

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

function CarouselItem (properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  let id = properties.id;
  const initAssetData = require(`./assets/${id}.json`);
  const [asset, setAsset] = useState(initAssetData ? initAssetData : undefined);

  /*
  useQueryHook(
    `https://api.bitshares.ws/lookup/asset/${id}`,
    //`http://localhost:8082/proxy/lookup/asset/${id}`,
    `getAsset_${id}`,
    setAsset,
    {}
  );
  */

  let symbol = asset && asset.symbol ? asset.symbol : undefined;
  let options = asset && asset.options ? asset.options : undefined;
  let description = options && options.description
                      ? JSON.parse(options.description)
                      : undefined;
  let nft_object = description ? description.nft_object : undefined;
  let title = nft_object && nft_object.title ? nft_object.title : undefined;
  let artist = nft_object && nft_object.artist ? nft_object.artist : undefined;

  let { image, imgURL } = getImage(nft_object); // retrieving best match media key

  let img = undefined;
  if (nft_object && nft_object.media_png_multihashes) {
    let topFile = nft_object.media_png_multihashes[0];
    let url = topFile.url;
    let icon = topFile.icon;
    let gateway = "https://cloudflare-ipfs.com/";
    imgURL = `${gateway}/${url}`;

    return title && artist && symbol
            ? <div key={id + "_featured_div"}>
                  <Link to={`/nft/${symbol}`}>
                    <LazyLoadImage
                      alt={`${id}_featured_div`}
                      effect="blur"
                      placeholderSrc={`data:image/png;base64,${icon}`}
                      src={imgURL}
                    />
                    <Button className={classes.button} variant="contained">"{title}"{i18n.t('carousel:by')}{artist}</Button>
                  </Link>
               </div>
            : <div key={id + "_featured_div"}>
                Loading..
               </div>;
  } else if (nft_object) {
    return title && artist && symbol
            ? <div key={id + "_featured_div"}>
                  <Link to={`/nft/${symbol}`}>
                    <LazyLoadImage
                      alt={`${id}_featured_div`}
                      effect="opacity"
                      src={imgURL}
                    />
                    <Button className={classes.button} variant="contained">"{title}"{i18n.t('carousel:by')}{artist}</Button>
                  </Link>
               </div>
            : <div key={id + "_featured_div"}>
                Loading..
               </div>;
  } else {
    return <div key={id + "_featured_div"}>
              Loading..
          </div>;
  }
}

export default function CarouselElement(properties) {
  const { i18n } = useTranslation();
  let art = properties.art;
  let featured = properties.featured;

  let artIds = featured
                ? art
                  .filter(x => x.featured === true)
                  .map(nft => nft.name)
                : art
                  .map(nft => nft.name);

  let carouselItems = artIds && artIds.length > 0
    ? artIds.map(id => {
        return <CarouselItem id={id} />;
      }).filter(x => x)
    : [];

  return (
      <Carousel showIndicators={false} showThumbs={false}>{carouselItems}</Carousel>
  );
}

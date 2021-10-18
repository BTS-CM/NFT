import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  }
}));

function CarouselItem (properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  let asset = properties.asset;
  let media_png_multihash = properties.media_png_multihash;

  let symbol = asset && asset.symbol ? asset.symbol : undefined;

  let gateway = "https://cloudflare-ipfs.com/";
  let imgURL = `${gateway}/${media_png_multihash.url}`;
  let icon = `data:image/png;base64,${media_png_multihash.icon}`;

  let itrs = media_png_multihash.url.split(".")[0].split("/");
  let itr = itrs[itrs.length - 1];

  return itr && icon && symbol && imgURL
          ? <div key={symbol + "_featured_div_" + itr}>
                <Link to={`/nft/${symbol}`}>
                  <LazyLoadImage
                    alt={`${symbol}_featured_div_${itr}`}
                    effect="blur"
                    src={imgURL}
                    placeholderSrc={icon}
                  />
                </Link>
             </div>
          : <div key={symbol + "_featured_div_loading"}>
              Loading..
             </div>;
}

export default function IPFSCarouselElement(properties) {
  const { i18n } = useTranslation();
  let media_png_multihashes = properties.media_png_multihashes;

  let carouselItems = media_png_multihashes && media_png_multihashes.length > 0
    ? media_png_multihashes.map(media_png_multihash => {
        return <CarouselItem media_png_multihash={media_png_multihash} { ...properties } />;
      }).filter(x => x)
    : [];

  return (
      <Carousel showIndicators={false} showThumbs={false}>{carouselItems}</Carousel>
  );
}

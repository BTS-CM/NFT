import React, { useEffect } from 'react';
import NFT from "./NFT";

import ReactGA from 'react-ga4';
ReactGA.initialize('G-CTZ1V9EXWY');

function All(properties) {
  const art = properties && properties.art ? properties.art : [];

  return art && art.length
    ? art.map(asset => <NFT id={asset.name} key={asset.name + "_gallery"} />)
    : [];
}

export default function Gallery(properties) {

  useEffect(() => {
    ReactGA.pageview('Gallery')
  }, []);

  return (
    <All {...properties} />
  );
}

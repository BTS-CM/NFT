import React from 'react';
import { useParams } from "react-router-dom";
import ReactGA from 'react-ga4';
import NFT from "./NFT";
ReactGA.initialize('G-CTZ1V9EXWY');

export default function IndividualNFT(properties) {
  let { id } = useParams();

  const art = properties && properties.art
                ? properties.art.map(item => item.name)
                : [];

  ReactGA.pageview(`NFT ${id}`);

  return id && art.includes(id)
    ? <NFT id={id} key={id} individual={true} />
    : <p>Unable to load NFT</p>;
}

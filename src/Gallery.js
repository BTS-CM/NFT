import React, { useState } from 'react';
import {Apis} from "bitsharesjs-ws";
import { useQuery } from 'react-query'

import NFT from "./NFT";

function All(properties) {
  const art = properties && properties.art ? properties.art : [];
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

  return nfts && nfts.length > 0
    ? nfts.map(nft => <NFT apis={Apis} data={nft} key={nft.id + "_gallery"} />)
    : [];
}

export default function Gallery(properties) {
  return (
    <All {...properties} />
  );
}

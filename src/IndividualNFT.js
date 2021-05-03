import React, {useState} from 'react';
import { useQuery } from 'react-query'
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import {Apis} from "bitsharesjs-ws";

import NFT from "./NFT";
const { getImage } = require("./images");

export default function IndividualNFT(properties) {
  let { id } = useParams();
  const { i18n } = useTranslation();

  const [nfts, setNfts] = useState([]);
  const { data, error } = useQuery('wsNFT', async () => {
    await Apis.instance("wss://node.testnet.bitshares.eu", true).init_promise;
    return await Apis.db.get_assets([id]);
  });

  if (!nfts || !nfts.length) {
    if (data && !error) {
      setNfts(data.filter(x => x))
    }
  }

  return nfts && nfts.length > 0
    ? nfts.map(nft => <NFT apis={Apis} data={nft} key={nft.id} />)
    : [];
}

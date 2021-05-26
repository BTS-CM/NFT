import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query'
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {Apis} from "bitsharesjs-ws";

import NFT from "./NFT";

export default function IndividualNFT(properties) {
  let { id } = useParams();
  const [nfts, setNfts] = useState([]);

  const { data, error } = useQuery('wsNFT', async () => {
    await Apis.instance("wss://node.testnet.bitshares.eu", true).init_promise;
    return await Apis.db.get_assets([id]);
  });

  useEffect(() => {
    if (data && !error) {
      setNfts(data.filter(x => x))
    }
  }, [data, error]);



  let options = nfts && nfts.length ? nfts[0].options : undefined;
  let description = options ? JSON.parse(options.description) : undefined;
  let nft_object = description ? description.nft_object : undefined;
  let title = nft_object && nft_object.title ? nft_object.title : undefined;
  let artist = nft_object && nft_object.artist ? nft_object.artist : undefined;

  let helmet_title = title && artist
                      ? `"${title}" (${nfts[0].symbol}) by ${artist} - Bitshares NFT`
                      : "Loading an NFT from the Bitshares blockchain";

  let helmet_description = title && artist
                            ? `"${title}" (${nfts[0].symbol}) by ${artist} - Bitshares NFT`
                            : "Loading an NFT from the Bitshares blockchain";

  return nfts && nfts.length > 0
    ? nfts.map(nft =>
      [
        <Helmet>
          <title>{helmet_title}</title>
          <meta name="description" content={helmet_description} />
        </Helmet>,
        <NFT apis={Apis} data={nft} key={nft.id} />
      ]
    )
    : null;
}

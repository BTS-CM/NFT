import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import { useQuery } from 'react-query'

import {
  useParams,
  Link
} from "react-router-dom";

import {Apis} from "bitsharesjs-ws";

import NFT from "./NFT";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export default function IndividualNFT(properties) {
  const classes = useStyles();
  let { id } = useParams();

  const [nfts, setNfts] = useState([]);
  const { status, data, error, isFetching } = useQuery('wsNFT', async () => {
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

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import {Apis} from "bitsharesjs-ws";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import NFT from "./NFT";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

function All(properties) {
  const art = properties && properties.art ? properties.art : [];
  const [nfts, setNfts] = useState([]);
  const { status, data, error, isFetching } = useQuery('all', async () => {
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
  const classes = useStyles();
  return (
    <All {...properties} />
  );
}

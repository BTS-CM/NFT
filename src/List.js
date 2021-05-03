import React, {useEffect, useState} from 'react';
import {Apis} from "bitsharesjs-ws";
import { useQuery } from 'react-query'
import NFT from "./NFT";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const { getImage } = require("./images");

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  a: {
    textDecoration: 'none',
    color: theme.palette.text.secondary
  },
}));

function ListContents(properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  
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

  const tableRows = nfts && nfts.length
                      ? nfts.map((nft) => {
                          const options = nft.options;
                          const description = JSON.parse(options.description);
                          const nft_object = description.nft_object;

                          let type = nft_object.type ? nft_object.type : undefined;
                          let title = nft_object.title ? nft_object.title : undefined;
                          let artist = nft_object.artist ? nft_object.artist : undefined;
                          let encoding = nft_object.encoding ? nft_object.encoding : undefined;
                          //let tags = nft_object.tags ? nft_object.tags.split(",") : "";

                          let {
                            image,
                            imgURL,
                            fileType
                          } = getImage(nft_object);

                          return (
                            <TableRow key={`tr ${nft.symbol}`}>
                                <TableCell component="th" scope="row">
                                  <Link className={classes.a} to={`/nft/${nft.symbol}`}>
                                    "{title}"<br/>
                                    by {artist}
                                  </Link>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Link className={classes.a} to={`/nft/${nft.symbol}`}>
                                    {type}<br/>
                                    {fileType} ({encoding})
                                  </Link>
                                </TableCell>
                                <TableCell>
                                  <Link className={classes.a} to={`/nft/${nft.symbol}`}>
                                    {nft.symbol} (ID: {nft.id})<br/>
                                  </Link>
                                </TableCell>
                            </TableRow>
                          );
                        })
                      : [];

  return tableRows;
}

export default function List(properties) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              NFT info
            </TableCell>
            <TableCell>
              NFT type
            </TableCell>
            <TableCell>
              Asset info
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <ListContents {...properties} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

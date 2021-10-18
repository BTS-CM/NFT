import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const { getImage } = require("./images");
const { useQueryHook } = require("./reactQuery");

ReactGA.initialize('G-CTZ1V9EXWY');

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  a: {
    textDecoration: 'none',
    color: theme.palette.text.secondary
  },
}));

function ListRow (properties) {
  const classes = useStyles();

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

  const symbol = asset ? asset.symbol : undefined;
  const options = asset ? asset.options : undefined;
  const description = options ? JSON.parse(options.description) : undefined;
  const nft_object = description ? description.nft_object : undefined;

  let type = nft_object && nft_object.type ? nft_object.type : undefined;
  let title = nft_object && nft_object.title ? nft_object.title : undefined;
  let artist = nft_object && nft_object.artist ? nft_object.artist : undefined;
  let encoding = nft_object && nft_object.encoding ? nft_object.encoding : undefined;

  let {
    image,
    imgURL,
    fileType
  } = getImage(nft_object);

  return title && artist
          ? (
            <TableRow key={`tr ${symbol}`}>
                <TableCell component="th" scope="row">
                  <Link className={classes.a} to={`/nft/${symbol}`}>
                    "{title}"<br/>
                    by {artist}
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link className={classes.a} to={`/nft/${symbol}`}>
                    {type}<br/>
                    {fileType} ({encoding})
                  </Link>
                </TableCell>
                <TableCell>
                  <Link className={classes.a} to={`/nft/${symbol}`}>
                    {symbol} (ID: {id})<br/>
                  </Link>
                </TableCell>
            </TableRow>
          )
        : (
          <TableRow key={`tr ${symbol}`}>
              <TableCell component="th" scope="row">
                <Link className={classes.a} to={`/nft/${symbol}`}>
                  loading
                </Link>
              </TableCell>
              <TableCell component="th" scope="row">
                <Link className={classes.a} to={`/nft/${symbol}`}>
                  loading
                </Link>
              </TableCell>
              <TableCell>
                <Link className={classes.a} to={`/nft/${symbol}`}>
                  loading
                </Link>
              </TableCell>
          </TableRow>
        );
}

function ListContents(properties) {
  const { i18n } = useTranslation();

  const art = properties && properties.art ? properties.art : [];
  let artIds = art.map(item => item.name);

  const tableRows = artIds && artIds.length
                      ? artIds.map((id) => {
                          return <ListRow id={id} />;
                        })
                      : [];

  return tableRows;
}

export default function List(properties) {
  const classes = useStyles();

  useEffect(() => {
    ReactGA.pageview('Gallery')
  }, []);

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

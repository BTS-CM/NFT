import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Chip from '@material-ui/core/Chip';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const { useQueryHook } = require("./reactQuery");

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.25)
  }
}));

export default function MarketOrders(properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const id = properties.id ? properties.id : null;
  const market = properties.market ? properties.market : null;
  const whitelist_markets = properties.whitelist_markets ? properties.whitelist_markets : null;
  const marketOrders = properties.marketOrders;
  const setMarketOrders = properties.setMarketOrders;

  //const [marketOrders, setMarketOrders] = useState();

  let approvedMarket;
  if (market) {
    approvedMarket = market;
  } else if (whitelist_markets && (whitelist_markets.length > 0)) {
    approvedMarket = whitelist_markets[0];
  } else {
    approvedMarket = "BTS";
  }

  useQueryHook(
    `https://api.bitshares.ws/openexplorer/order_book?base=${id}&quote=${approvedMarket}`,
    //`http://localhost:8082/proxy/openexplorer/order_book?base=${id}&quote=${approvedMarket}`,
    `getApprovedOrders_${id}`,
    setMarketOrders,
    {refetchInterval: 60000, enabled: !!id || !!approvedMarket}
  );

  let bids = marketOrders
              ? marketOrders["bids"]
              : undefined;

  let bidRows = bids && bids.length
                    ? bids.map((bid) => {
                        return (
                          <TableRow key={`tr bid ${bid.price}`}>
                              <TableCell component="th" scope="row">
                                {1/bid.price} {approvedMarket}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {bid.quote}
                              </TableCell>
                              <TableCell>
                                {bid.base}
                              </TableCell>
                          </TableRow>
                        );
                      })
                    : [];

    let asks = marketOrders
                ? marketOrders["asks"]
                : undefined;

    let askRows = asks && asks.length
                      ? asks.map((ask) => {
                          return (
                            <TableRow key={`tr ask ${ask.price}`}>
                                <TableCell component="th" scope="row">
                                  {ask.price}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {ask.quote}
                                </TableCell>
                                <TableCell>
                                  {ask.base}
                                </TableCell>
                            </TableRow>
                          );
                        })
                      : [];

    let bidContents = !bids || !bids.length
      ? <Chip label="No bids" disabled />
      : <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Quote
                </TableCell>
                <TableCell>
                  Base
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bidRows}
            </TableBody>
          </Table>
        </TableContainer>;

    let askContents = !asks || !asks.length
      ? <Chip label="No asks" disabled />
      : <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Quote
                </TableCell>
                <TableCell>
                  Base
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {askRows}
            </TableBody>
          </Table>
        </TableContainer>

    return ([
      <Typography variant="body1" gutterBottom style={{'paddingTop': '5px'}}>
        Bids
      </Typography>,
      bidContents,
      <Typography variant="body1" gutterBottom style={{'paddingTop': '5px'}}>
        Asks
      </Typography>,
      askContents
    ])

}

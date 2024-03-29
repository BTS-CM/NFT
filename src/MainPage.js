import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import CarouselElement from "./Carousel";

ReactGA.initialize('G-CTZ1V9EXWY');

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  leftPaper: {
    padding: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  rightPaper: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  stats: {
    marginBottom: theme.spacing(2),
  },
  left: {
    marginRight: theme.spacing(1),
  },
  center: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  right: {
    marginLeft: theme.spacing(1)
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  a: {
    color: theme.palette.text.secondary,
    textDecoration: 'none'
  },
  textLink: {
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing(1)
  },
  stat: {
    margin: theme.spacing(1)
  }
}));

function diff_years(dt2, dt1) {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25));

}

export default function MainPage(properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const art = properties && properties.art ? properties.art : [];
  const randomArt = Array.from(art);


  let genesis = new Date(2013,6,2);
  let now = new Date();

  useEffect(() => {
    ReactGA.pageview('Index');
    randomArt.sort(() => Math.random() - 0.5);
  }, []);

  return ([
    <Grid item xs={12} sm={6} key={"Index featured NFT"}>
      <Paper className={classes.leftPaper}>
        <Typography gutterBottom variant="h5">
          {i18n.t("mainpage:featured")}
        </Typography>
        <CarouselElement art={randomArt} featured={true} {...properties} />
      </Paper>
    </Grid>,

    <Grid item xs={12} sm={6} key={"Right info"}>

      <Grid item xs={12} key={"Trading"}>
        <Paper className={classes.leftPaper}>
          <Typography gutterBottom variant="h5">
            {i18n.t("mainpage:traders.header")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {i18n.t("mainpage:traders.body1a")}<a className={classes.textLink} href="https://how.bitshares.works/en/master/user_guide/create_account.html">{i18n.t("mainpage:traders.a1")}</a>{i18n.t("mainpage:traders.body1b")}
          </Typography>
          <a href={`https://wallet.bitshares.org`}>
            <Button size="small" className={classes.button} variant="contained">Bitshares.org</Button>
          </a>
          <a href={`https://ex.xbts.io/`}>
            <Button size="small" className={classes.button} variant="contained">XBTS.io</Button>
          </a>
          <a href={`https://www.gdex.io/`}>
            <Button size="small" className={classes.button} variant="contained">GDEX.io</Button>
          </a>
          <a href={`https://github.com/bitshares/bitshares-ui/releases`}>
            <Button size="small" className={classes.button} variant="contained">{i18n.t("mainpage:traders.a2")}</Button>
          </a>
        </Paper>
      </Grid>

      <Grid item xs={12} key={"BTS_Info"}>
        <Paper className={classes.leftPaper}>
          <Typography gutterBottom variant="h5">
            {i18n.t("mainpage:benefits.header")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {i18n.t("mainpage:benefits.body1")}<a className={classes.textLink} href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{i18n.t("mainpage:benefits.a1")}</a>.
          </Typography>
          <Typography variant="body1" gutterBottom>
            {i18n.t("mainpage:benefits.body2")}<a className={classes.textLink} href="https://how.bitshares.works/en/master/technology/dpos.html">{i18n.t("mainpage:benefits.a2")}</a>.
          </Typography>
          <Typography variant="body1" gutterBottom>
            {i18n.t("mainpage:benefits.body3")}<a className={classes.textLink} href="https://how.bitshares.works/en/master/technology/bitshares_features.html#industrial-performance-and-scalability">{i18n.t("mainpage:benefits.a3")}</a>;{i18n.t("mainpage:benefits.body4")}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} key={"stats 1"}>
        <Card className={classes.stats}>
          <CardContent>
            <Typography variant="h5" color="textSecondary">
              {i18n.t("mainpage:stat1.header")}
            </Typography>
            <Typography variant="body1" className={classes.pos} color="textSecondary">
              {art.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} key={"stats 2"}>
        <Card className={classes.stats}>
          <CardContent>
            <Typography variant="h5" color="textSecondary">
              {i18n.t("mainpage:stat2.header")}
            </Typography>
            <Typography variant="body1" className={classes.pos} color="textSecondary">
              2
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} key={"stats 3"}>
        <Card className={classes.stats}>
          <CardContent>
            <Typography variant="h5" color="textSecondary">
              {i18n.t("mainpage:stat3.header")}
            </Typography>
            <Typography variant="body1" className={classes.pos} color="textSecondary">
              {
                diff_years(genesis, now) + i18n.t("mainpage:stat3.years")
              }
            </Typography>
          </CardContent>
        </Card>
      </Grid>


    </Grid>
  ]);
}

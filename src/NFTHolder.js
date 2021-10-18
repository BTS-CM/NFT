import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Chip from '@material-ui/core/Chip';

const { useQueryHook } = require("./reactQuery");

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.25)
  }
}));

export default function NFTHolder(properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const id = properties.id;
  const [nftHolder, setNftHolder] = useState();

  useQueryHook(
    `https://api.bitshares.ws/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`,
    //`http://localhost:8082/proxy/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`,
    `getnftholders_${id}`,
    setNftHolder,
    {refetchInterval: 120000, enabled: !!id}
  );

  return (
    <Chip className={classes.chip} label={`${i18n.t('nft:asset.owner')}: ${nftHolder && nftHolder.length ? nftHolder[0].name : '???'}`} />
  );
}

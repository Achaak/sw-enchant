import React, { useState } from 'react';

import { Switch, DefaultPage, Dialog } from './../../Components'
import { Grid } from '@material-ui/core';

import './RuneEnchant.scss'

import { DetailTable, MinimalTable } from './Tables'

const RunesEnchant = ({ runes, runesLoading }) => {
  const [isDetailTable, setIsDetailTable] = useState(false)

  return (
    <DefaultPage className="rune-enchant-screen">
      <Grid item xs={12}>
        <Switch onChange={(e) => setIsDetailTable(e) } />
      </Grid>

      <Grid item xs={12}>
        {(isDetailTable ? (
          <DetailTable runes={runes} runesLoading={runesLoading} />
        ) : (
          <MinimalTable runes={runes} runesLoading={runesLoading} />
        ))}
      </Grid>

      <Dialog
        open={false}
      >
        test
      </Dialog>
    </DefaultPage>
  )
}

export default RunesEnchant;

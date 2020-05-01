import React, { useState, useRef, useEffect } from 'react';

import { Switch, DefaultPage, Dialog } from './../../Components'
import { RunesInfos } from './../../Services/SWManager'
import { Grid, DialogContentText, Input, Button } from '@material-ui/core';

import './RuneEnchant.scss'

import { DetailTable, MinimalTable } from './Tables'

const RunesEnchant = () => {
  const [runes, setRunes] = useState(global.SWManager.getRunes());
  const [runesFilter, setRunesFilter] = useState(global.SWManager.getRunes());

  const [isDetailTable, setIsDetailTable] = useState(false)

  const [enchantDialogVisible, setEnchantDialogVisible] = useState(false)
  const [newEnchantValue, setNewEnchantValue] = useState(null)
  const [enchantSelected, setEnchantSelected] = useState(null)

  const tableRef = useRef(null)

  useEffect(() => {
    filterRunes()
  }, [runes])

  const filterRunes = () => {
    setRunesFilter(runes.filter((item) => {
      if(!item.enchant_advice) return false
      if(!item.hasEnchantAvailable) return false

      return true
    }))
  }

  const showEnchantDialog = (rune_id, craft_type_id, oldStatLabel, oldStatValue) => {
    setEnchantDialogVisible(true)

    let _enchantSelected = RunesInfos.getRuneIsEnchant(craft_type_id)
    _enchantSelected.oldStatLabel = oldStatLabel
    _enchantSelected.oldStatValue = oldStatValue
    _enchantSelected.rune_id = rune_id

    setEnchantSelected(_enchantSelected)
  }

  return (
    <DefaultPage className="rune-enchant-screen">
      <Grid item xs={12}>
        <Switch onChange={(e) => setIsDetailTable(e) } />
      </Grid>

      <Grid item xs={12}>
        {(isDetailTable ? (
          <DetailTable
            data={runesFilter}
            runesLoading={false}
            showEnchantDialog={showEnchantDialog}
            tableRef={tableRef}
          />
        ) : (
          <MinimalTable
            data={runesFilter}
            runesLoading={false}
            showEnchantDialog={showEnchantDialog}
            tableRef={tableRef}
          />
        ))}
      </Grid>

      {(enchantSelected ? (
        <Dialog
          open={enchantDialogVisible}
          dialogTitle={(
            <>
              Rune enchantment
            </>
          )}
          dialogContent={(<>
            <DialogContentText>
              {`${enchantSelected.oldStatLabel.replace(" flat", "")} +${enchantSelected.oldStatValue} ➔ ${enchantSelected.stat_label} +`}
              <Input type="number" onChange={(e) => setNewEnchantValue(e.target.value)} />
            </DialogContentText>
          </>)}
          dialogActions={(
            <>
              <Button onClick={() => setEnchantDialogVisible(false)}>Cancel</Button>
              <Button 
              onClick={() => {
                setEnchantDialogVisible(false)

                global.SWManager.setEnchant(enchantSelected.rune_id, enchantSelected.craft_type_id, enchantSelected.oldStatLabel, parseInt(newEnchantValue))
                  .then((value) => {
                    setRunes(value.runes)
                  })
              }}>Validate</Button>
            </>
          )}
        />
      ) : null)}
    </DefaultPage>
  )
}

export default RunesEnchant;

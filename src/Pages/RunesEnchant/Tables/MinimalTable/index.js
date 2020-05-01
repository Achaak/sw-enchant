import React from 'react';

import { Table, DefaultPage } from './../../../../Components'
import { Grid } from '@material-ui/core';
import classnames from 'classnames'

//import './RuneEnchant.scss'

const RunesEnchant = ({ 
  data, tableRef,
  runesLoading, showEnchantDialog
}) => {

  const utilitiesRender = (item) => {
    let _utilities = []

    for (let i = 0; i < item.utilities.length; i++) {
      _utilities.push(<li key={i}>{ item.utilities[i] }</li>)
    }

    return (
      <ul>
        {_utilities}
      </ul>
    )
  }

  const enchantsAdviceRender = (item) => {
    let _enchantAdvice = []

    for (let i = 0; i < item.enchant_advice.length; i++) {
      const _enchant_advice = item.enchant_advice[i]

      for (let j = 0; j < _enchant_advice.enchants.length; j++) {
        const _enchant = _enchant_advice.enchants[j];
        
        _enchantAdvice.push(
          <li key={`${i}-${j}`}>
            {(_enchant.hasEnchant ? (<button onClick={() => showEnchantDialog(item.rune_id, _enchant.hasEnchant, _enchant.oldStat, item[_enchant.oldStat])}>up</button>) : null)}
            { `${_enchant_advice.label}: ${_enchant.oldStat.replace(" flat", "")} ➔ ${_enchant.newStats.replace(" flat", "")}` }
          </li>
        )
      }
    }

    return (
      <ul>
        {_enchantAdvice}
      </ul>
    )
  }

  const substatRender = (item, idSubstat) => {
    // Substat not exist
    if(!item.sec_eff[idSubstat]) return null

    const _substat_string = item[`substat_${idSubstat+1}_format`]
    
    return (
      <label className={classnames((item.sec_eff[idSubstat][3] ? "stat-grinded" : ""), 'stat')}>
        {_substat_string}
        {(item.sec_eff[idSubstat][2] ? (<i className="fas fa-sync"></i>) : null)}
      </label>
    )
  }

  const qualityRender = (item) => {
    return (<></>)
  }

  return (
    <DefaultPage className="rune-enchant-screen">
      <Grid item xs={12}>
        <Table
          columns={[
            { title: 'Id', field: 'rune_id', type: 'numeric', hidden: true },
            { title: '', field: 'extra_label',  type: 'string', render: qualityRender, sorting: false },
            { title: 'Set',     field: 'set_label',    type: 'string' },
            { title: 'Slot',    field: 'slot_no',      type: 'string' },
            { title: 'Grade',   field: 'class',        type: 'string' },
            { title: 'Level',   field: 'upgrade_curr', type: 'string' },
            { title: 'Eff.%',     field: 'efficiency',     type: 'string' },
            { title: 'Eff.% Max', field: 'efficiency_max', type: 'string' },
            { title: 'Main stat',  field: 'pri_eff_format',    type: 'string' },
            { title: 'Innet stat', field: 'prefix_eff_format', type: 'string' },
            { title: 'Substat 1', field: 'substat_1_format', type: 'string', render: (item) => substatRender(item, 0) },
            { title: 'Substat 2', field: 'substat_2_format', type: 'string', render: (item) => substatRender(item, 1) },
            { title: 'Substat 3', field: 'substat_3_format', type: 'string', render: (item) => substatRender(item, 2) },
            { title: 'Substat 4', field: 'substat_4_format', type: 'string', render: (item) => substatRender(item, 3) },
            { title: 'Enchantment advice',  field: 'enchant_advice', type: 'string', render: enchantsAdviceRender },
            { title: 'Utilities', field: 'utilities', type: 'string', render: utilitiesRender },
          ]}
          tableRef={tableRef}
          data={data}
          isLoading={runesLoading}
          pageSize={10}
          addButton={false}
          updateButton={false}
          deleteButton={false}
          toolbar={false}
        />
      </Grid>
    </DefaultPage>
  )
}

export default RunesEnchant;

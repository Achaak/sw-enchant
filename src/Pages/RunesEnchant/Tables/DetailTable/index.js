import React from 'react';

import { Table, DefaultPage } from './../../../../Components'
import { RunesFormat } from './../../../../Services'
import { Grid } from '@material-ui/core';
import classnames from 'classnames'

//import './RuneEnchant.scss'

const RunesEnchant = ({ runes, runesLoading }) => {

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
        
        _enchantAdvice.push(<li key={`${i}-${j}`}>{ `${_enchant_advice.label}: ${_enchant.oldStat} ➔ ${_enchant.newStats}` }</li>)
      }
    }

    return (
      <ul>
        {_enchantAdvice}
      </ul>
    )
  }

  const statRender = (item, variable) => {
    const _substatFormat = RunesFormat.getSubstatFormat(item.sec_eff, variable)
    
    if(_substatFormat)
      return (
        <label className={classnames((_substatFormat.isGrind ? "stat-grinded" : ""), 'stat')}>
          {_substatFormat.value}
          {(_substatFormat.isEnchant ? (<i className="fas fa-sync"></i>) : null)}
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
            { title: 'Type',  field: 'pri_eff_label',    type: 'string' },
            { title: 'Value', field: 'pri_eff_value',    type: 'string' },
            { title: 'Type',  field: 'prefix_eff_label', type: 'string' },
            { title: 'Value', field: 'prefix_eff_value', type: 'string' },
            { title: 'ATK%',  field: 'ATK%',     type: 'string', render: (item) => statRender(item, 'ATK%')  },
            { title: 'ATK',   field: 'ATK flat', type: 'string', render: (item) => statRender(item, 'ATK flat')   },
            { title: 'DEF%',  field: 'DEF%',     type: 'string', render: (item) => statRender(item, 'DEF%')  },
            { title: 'DEF',   field: 'DEF flat', type: 'string', render: (item) => statRender(item, 'DEF flat')   },
            { title: 'HP%',   field: 'HP%',      type: 'string', render: (item) => statRender(item, 'HP%')   },
            { title: 'HP',    field: 'HP flat',  type: 'string', render: (item) => statRender(item, 'HP flat')    },
            { title: 'SPD',   field: 'SPD',      type: 'string', render: (item) => statRender(item, 'SPD')   },
            { title: 'ACC',   field: 'ACC',      type: 'string', render: (item) => statRender(item, 'ACC')   },
            { title: 'RES',   field: 'RES',      type: 'string', render: (item) => statRender(item, 'RES')   },
            { title: 'CRate', field: 'CRate',    type: 'string', render: (item) => statRender(item, 'CRate') },
            { title: 'CDmg',  field: 'CDmg',     type: 'string', render: (item) => statRender(item, 'CDmg')  },
            { title: 'Enchantment advice',  field: 'enchant_advice', type: 'string', render: enchantsAdviceRender },
            { title: 'Utilities', field: 'utilities', type: 'string', render: utilitiesRender },
          ]}
          data={runes}
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

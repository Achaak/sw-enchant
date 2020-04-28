import React, { useState } from 'react';

import { Table } from './../../Components'

const RunesEnchant = ({ runes }) => {
  const [tableLoading, setTableLoading] = useState(runes.length !== 0)

  return (
    <section className="container">
      <Table
        columns={[
          { title: 'Id', field: 'rune_id', type: 'numeric', hidden: true },
          { title: 'Quality', field: 'extra_label',  type: 'string' },
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
          { title: 'ATK%',  field: 'ATK%',     type: 'string' },
          { title: 'ATK',   field: 'ATK flat', type: 'string' },
          { title: 'DEF%',  field: 'DEF%',     type: 'string' },
          { title: 'DEF',   field: 'DEF flat', type: 'string' },
          { title: 'HP%',   field: 'HP%',      type: 'string' },
          { title: 'HP',    field: 'HP flat',  type: 'string' },
          { title: 'SPD',   field: 'SPD',      type: 'string' },
          { title: 'ACC',   field: 'ACC',      type: 'string' },
          { title: 'RES',   field: 'RES',      type: 'string' },
          { title: 'CRate', field: 'CRate',    type: 'string' },
          { title: 'CDmg',  field: 'CDmg',     type: 'string' },
        ]}
        data={runes}
        title="Runes list"
        isLoading={tableLoading}
        pageSize={10}
        addButton={false}
        updateButton={false}
        deleteButton={false}
      />
    </section>
  )
}

export default RunesEnchant;

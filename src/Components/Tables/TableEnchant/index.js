import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import Table from './../Table'
import { RunesFormat } from './../../../Services'

const TableEnchant = ({ defaultRunes }) => {
  const [runes, setRunes] = useState(defaultRunes)
  const [tableLoading, setTableLoading] = useState(runes.length !== 0)

  useEffect(() => {
    defaultRunes = defaultRunes.map((item) => {
      return {
        ...item,
        set_label: RunesFormat.getSetLabel(item.set_id),
        extra_label: RunesFormat.getQualityLabel(item.extra),
        pri_eff_label: RunesFormat.getStatLabel(item.pri_eff[0]),
        pri_eff_value: item.pri_eff[1],
        prefix_eff_label: (item.prefix_eff[0] ? RunesFormat.getStatLabel(item.prefix_eff[0]) : undefined),
        prefix_eff_value: (item.prefix_eff[0] ? item.prefix_eff[1] : undefined),
        "ATK%":     RunesFormat.getSubstatValue(item.sec_eff, "ATK%"),
        "ATK flat": RunesFormat.getSubstatValue(item.sec_eff, "ATK flat"),
        "DEF%":     RunesFormat.getSubstatValue(item.sec_eff, "DEF%"),
        "DEF flat": RunesFormat.getSubstatValue(item.sec_eff, "DEF flat"),
        "HP%":      RunesFormat.getSubstatValue(item.sec_eff, "HP%"),
        "HP flat":  RunesFormat.getSubstatValue(item.sec_eff, "HP flat"),
        "SPD":      RunesFormat.getSubstatValue(item.sec_eff, "SPD"),
        "ACC":      RunesFormat.getSubstatValue(item.sec_eff, "ACC"),
        "RES":      RunesFormat.getSubstatValue(item.sec_eff, "RES"),
        "CRate":    RunesFormat.getSubstatValue(item.sec_eff, "CRate"),
        "CDmg":     RunesFormat.getSubstatValue(item.sec_eff, "CDmg"),
        efficiency: RunesFormat.getEfficiency(item.prefix_eff, item.sec_eff),
        efficiency_max: RunesFormat.getEfficiencyMax(item.prefix_eff, item.sec_eff, item.upgrade_curr),
      }
    })
    
    // Get file and read this
    setRunes(defaultRunes)

    // eslint-disable-next-line
  }, [defaultRunes]);
  
  return (
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
  )
}

TableEnchant.propTypes = {
  defaultRunes: PropTypes.array,
}

TableEnchant.defaultProps = {
  defaultRunes: [],
};

export default TableEnchant;

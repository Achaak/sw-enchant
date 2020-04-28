import React from 'react';

import { Table, Select } from './../../Components'

const SelectStats = ({...props}) => {
  return (
    <Select
      {...props}
      options={[
        { value: 'ATK%',     label: 'ATK%'     },
        { value: 'ATK flat', label: 'ATK flat' },
        { value: 'DEF%',     label: 'DEF%'     },
        { value: 'DEF flat', label: 'DEF flat' },
        { value: 'HP%',      label: 'HP%'      },
        { value: 'HP flat',  label: 'HP flat'  },
        { value: 'SPD',      label: 'SPD'      },
        { value: 'ACC',      label: 'ACC'      },
        { value: 'RES',      label: 'RES'      },
        { value: 'CRate',    label: 'CRate'    },
        { value: 'CDmg',     label: 'CDmg'     },
      ]}
      isMulti
    />
  )
}

const Utilities = ({ 
  setUtility, deleteUtility, utilities
}) => {

  const setUtilities = (item) => {
    setUtility({
      name: item.name,
      stats: (item.stats ? item.stats.map((o) => o.value) : []),
      nb_stats: item.nb_stats || 0
    })
  }

  const getStatsRender = (item) => {
    return (item.stats.join(", "))
  }

  return (
    <div>
      <Table
        columns={[
          { title: 'Id', field: 'rune_id', type: 'numeric', hidden: true },
          { title: 'Name', field: 'name',  type: 'string' },
          { title: 'Stats', field: 'stats',  type: 'string', editComponent: props => (<SelectStats {...props} />), render: getStatsRender},
          { title: 'Number of stats', field: 'nb_stats',  type: 'numeric' },
        ]}
        data={utilities}
        isLoading={false}
        title="Utilities list"
        pageSize={10}
        onRowAdd={setUtilities}
        onRowDelete={deleteUtility}
      />
    </div>
  )
}

export default Utilities;

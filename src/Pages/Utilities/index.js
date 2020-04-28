import React, { useRef, useState } from 'react';

import { Table, DrawerUtility, Select } from './../../Components'

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

const Utilities = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const drawerUtilityRef = useRef(null)

  const setUtilities = (item) => {
    console.log({
      name: item.name,
      stats: (item.stats ? item.stats.map((o) => o.value) : [])
    })
  }

  return (
    <div>
      <Table
        columns={[
          { title: 'Id', field: 'rune_id', type: 'numeric', hidden: true },
          { title: 'Name', field: 'name',  type: 'string' },
          { title: 'Stats', field: 'stats',  type: 'string', editComponent: props => (<SelectStats {...props} />) },
        ]}
        data={[]}
        title="Utilities list"
        isLoading={tableLoading}
        pageSize={10}
        onRowAdd={setUtilities}
      />

      <DrawerUtility
        ref={drawerUtilityRef}
      />
    </div>
  )
}

export default Utilities;

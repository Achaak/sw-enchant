import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';

import { Table, Select, DefaultPage } from './../../Components'

const SelectStats = ({
  setUtilities,
  ...props
}) => {
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
  setUtility, deleteUtility, utilities, setUtilities
}) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  useEffect(() => {
    // Get file and read this
    if(acceptedFiles.length) readFile(acceptedFiles[0])

    // eslint-disable-next-line
  }, [acceptedFiles]);

  const readFile = (file) => {
    const reader = new FileReader()

    reader.onload = async (e) => { 
      const _text = (e.target.result)

      const _json = JSON.parse(_text)

      console.log(_json)

      // Set json file
      setUtilities(_json)
    };
    reader.readAsText(file)
  }

  const getStatsRender = (item) => {
    return (item.stats.join(", "))
  }

  const exportCsv = async (item, b) => {
    const fileName = "file";
    const json = JSON.stringify(b);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <DefaultPage>
      <Grid item xs={12}>
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
          onRowAdd={(item) => {
            setUtility({
              name: item.name,
              stats: (item.stats ? item.stats.map((o) => o.value) : []),
              nb_stats: item.nb_stats || 0
            })
          }}
          onRowDelete={deleteUtility}
          exportButton
          exportCsv={exportCsv}
          exportName='Export as Json'
        />
      </Grid>

      <Grid item xs={6}>
        <div 
          {...getRootProps({className: 'dropzone'})}
        >
          <input
            {...getInputProps()} 
            multiple={false}
          />
          <p>Drop your json files here, or click to select this</p>
        </div>
      </Grid>
    </DefaultPage>
  )
}

export default Utilities;

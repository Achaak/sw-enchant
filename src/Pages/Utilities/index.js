import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';

import { Table, Select, DefaultPage } from './../../Components'

const SelectStats = ({
  setUtilities, value,
  ...props
}) => {
  return (
    <Select
      {...props}
      defaultValue={(value ? value : [])}
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
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [utilities, setUtilities] = useState(global.SWManager.getUtilities());

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

      // Set json file
      global.SWManager.setUtilities(_json)
        .then((values) => {
          setUtilities(values.utilities)
        })
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
            { title: 'Stats', field: 'stats_input',  type: 'string', editComponent: props => (<SelectStats {...props} />), render: getStatsRender},
            { title: 'Number of stats', field: 'nb_stats',  type: 'numeric' },
          ]}
          data={utilities}
          isLoading={false}
          title="Utilities list"
          pageSize={10}
          onRowAdd={(item) => {
            global.SWManager.setUtility({
              name: item.name,
              stats: (item.stats_input ? item.stats_input.map((o) => o.value) : []),
              stats_input: item.stats_input || [],
              nb_stats: item.nb_stats || 0,
              id: Date.now(),
            })
              .then((values) => {
                setUtilities(values.utilities)
              })
          }}
          onRowUpdate={
            (item) => {
              global.SWManager.updateUtility({
                name: item.name,
                stats: (item.stats_input ? item.stats_input.map((o) => o.value) : []),
                stats_input: item.stats_input || [],
                nb_stats: item.nb_stats || 0,
                id: item.id,
              }, item.id)
                .then((values) => {
                  setUtilities(values.utilities)
                })
            }
          }
          onRowDelete={
            (item) => {
              global.SWManager.deleteUtility(item.id)
                .then((values) => {
                  setUtilities(values.utilities)
                })
            }
          }
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

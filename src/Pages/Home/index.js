import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { DefaultPage } from './../../Components'
import { Grid } from '@material-ui/core';

import './Home.scss'

const Home = () => {
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

      // Set json file
      global.SWManager.setJson(_json)
    };
    reader.readAsText(file)
  }


  return (
    <DefaultPage className="home-screen">
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

export default Home;

import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import {  } from './../../Components'


const Home = ({ setJson }) => {
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
      setJson(_json)
    };
    reader.readAsText(file)
  }


  return (
    <div 
      {...getRootProps({className: 'dropzone'})}
    >
      <input
        {...getInputProps()} 
        multiple={false}
      />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

export default Home;

import React from 'react';
import { Grid } from '@material-ui/core';

import { DefaultPage, Slider } from './../../Components'

const Tools = ({ statsValue, setStatValue, resetStatValue }) => {

  const sliderRender = () => {
    let _sliderRender = []

    for (var key in statsValue) {
      _sliderRender.push(
        <Slider
          key={key}
          name={key}
          label={`${key.replace(" flat", "")}`}
          onChange={setStatValue}
          step={0.1}
          min={0}
          max={3}
          value={statsValue[key]}
        />
      )
    }

    return _sliderRender
  }

  return (
    <DefaultPage>
      <Grid item xs={12}>
        { sliderRender() }
      </Grid>
    </DefaultPage>
  )
}

export default Tools;

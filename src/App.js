import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { RunesEnchantPage, UtilitiesPage, HomePage } from './Pages'
import { Header } from './Components'
import { RunesFormat } from './Services'

import './App.scss'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


const App = () => {
  const [json, setJson] = useState({})

  const [runes, setRunes] = useState([])

  useEffect(() => {
    if(!json.runes) return false
    console.log(json.runes)

    const _runes = json.runes.map((item) => {
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
    setRunes(_runes)

    // eslint-disable-next-line
  }, [json]);

  return (
    <div className="App">
      <Router>
        <Header />
      
        <Switch>
          <Route exact path='/'>
            <HomePage setJson={setJson} />
          </Route>
          <Route exact path='/runes/management/enchant'>
            <RunesEnchantPage runes={runes} />
          </Route>
          <Route exact path='/utilities'>
            <UtilitiesPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

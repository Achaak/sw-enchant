import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { RunesEnchantPage, UtilitiesPage, HomePage } from './Pages'
import { Header } from './Components'
import { RunesFormat, RuneCraftFormat, LocalStorage } from './Services'

import './App.scss'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


const App = () => {
  const [json, setJson] = useState({})

  const [loaded, setLoaded] = useState(false)
  
  const [runes, setRunes] = useState([])
  const [runeCraft, setRuneCraft] = useState([])
  const [utilities, setUtilities] = useState([])

  useEffect(() => {
    // Init cookie utilities
    if(!LocalStorage.getItem("utilities")) LocalStorage.setItem('utilities', utilities)
    else setUtilities(LocalStorage.getItem("utilities"))

    // Init cookie runes
    if(!LocalStorage.getItem("runes")) LocalStorage.setItem('runes', runes)
    else setRunes(LocalStorage.getItem("runes"))

    // Init cookie rune craft
    if(!LocalStorage.getItem("runeCraft")) LocalStorage.setItem('runeCraft', runeCraft)
    else setRuneCraft(LocalStorage.getItem("runeCraft"))

    // Set is loaded
    setLoaded(true)

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(!json.runes) return;

    /* --- RUNE CRAFT --- */
    // Format rune craft
    const _runeCraft = RuneCraftFormat.formatRunes(json.rune_craft_item_list)
    
    // Set state
    setRuneCraft(_runeCraft)

    
    /* --- RUNE --- */
    // Get rune monster
    let _runesMonster = []
    json.unit_list.map((item) => {
      _runesMonster = _runesMonster.concat(item.runes); return item;
    })

    // Format runes
    const _runes = RunesFormat.formatRunes([...json.runes, ...json.rune_lock_list, ..._runesMonster], utilities)
    
    // Set state
    setRunes(_runes)
    

    // eslint-disable-next-line
  }, [json]);

  useEffect(() => {
    if(!loaded) return;

    // Set runes in cookies
    console.log(runes)
    LocalStorage.setItem('runes', runes)

    // eslint-disable-next-line
  }, [runes]);

  useEffect(() => {
    if(!loaded) return;

    // Set rune craft in cookies
    console.log(runeCraft)
    LocalStorage.setItem('runeCraft', runeCraft)

    // eslint-disable-next-line
  }, [runeCraft]);

  useEffect(() => {
    if(!loaded) return;

    // Set utilities in cookies
    LocalStorage.setItem('utilities', utilities)
    
    // Format and set state
    setRunes(RunesFormat.formatRunes(runes, utilities))

    // eslint-disable-next-line
  }, [utilities]);

  const setUtility = (_utility) => {
    setUtilities([
      ...utilities,
      _utility
    ])
  }

  const deleteUtility = (_utility) => {
    const _utilities = []
    utilities.map((item) => {
      if(item.name !== _utility.name) _utilities.push(item); return item;
    })

    setUtilities(_utilities)
  }

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
            <UtilitiesPage setUtility={setUtility} deleteUtility={deleteUtility} utilities={utilities}/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

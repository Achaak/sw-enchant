import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useDebounce } from 'use-debounce';

import { RunesEnchantPage, UtilitiesPage, HomePage, ToolsPage } from './Pages'
import { Header } from './Components'
import { RunesFormat, RuneCraftFormat, LocalStorage } from './Services'

import './App.scss'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const statsValueDefault = {
  'ATK%':1,
  'ATK flat': 0.5,
  'DEF%': 1,
  'DEF flat': 0.5,
  'HP%': 1,
  'HP flat': 0.5,
  'SPD': 1,
  'ACC': 1,
  'RES': 1,
  'CRate': 1,
  'CDmg': 1,
 }

const App = () => {
  const [json, setJson] = useState({})

  const [loaded, setLoaded] = useState(false)
  
  const [runes, setRunes] = useState(LocalStorage.getItem("runes"))
  const [runesLoading, setRunesLoading] = useState(false)
  const [runeCraft, setRuneCraft] = useState(LocalStorage.getItem("runeCraft") || [])
  const [utilities, setUtilities] = useState(LocalStorage.getItem("utilities") || [])
  const [statsValue, setStatsValue] = useState(LocalStorage.getItem("statsValue") || statsValueDefault)
  const [debounceStatsValue] = useDebounce(statsValue, 1000);

  let formatRunesFlag = useRef(false)
  let formatRuneCraftFlag = useRef(false)

  useEffect(() => {
    setLoaded(true)

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(!json.runes) return;

    /* --- RUNE CRAFT --- */
    // Format and set state
    formatRuneCraft(json.rune_craft_item_list)

    
    /* --- RUNE --- */
    // Get rune monster
    let _runesMonster = []
    json.unit_list.map((item) => {
      _runesMonster = _runesMonster.concat(item.runes); return item;
    })

    // Format runes
    formatRunes([...json.runes, ...json.rune_lock_list, ..._runesMonster])
    

    // eslint-disable-next-line
  }, [json]);

  useEffect(() => {
    if(!loaded) return;

    // Set utilities in cookies
    LocalStorage.setItem('statsValue', debounceStatsValue)

    // Format runes
    formatRunes(runes)

    // eslint-disable-next-line
  }, [debounceStatsValue]);

  useEffect(() => {
    if(!loaded) return;

    // Set runes in cookies
    LocalStorage.setItem('runes', runes)

    // eslint-disable-next-line
  }, [runes]);

  useEffect(() => {
    if(!loaded) return;

    // Set rune craft in cookies
    LocalStorage.setItem('runeCraft', runeCraft)

    // eslint-disable-next-line
  }, [runeCraft]);

  useEffect(() => {
    if(!loaded) return;

    // Set utilities in cookies
    LocalStorage.setItem('utilities', utilities)

    // Format runes
    formatRunes(runes)

    // eslint-disable-next-line
  }, [utilities]);

  const setUtility = (_utility) => {
    setUtilities([
      ...utilities,
      _utility
    ])
  }

  const setUtilitiesJson = (_utilities) => {
    setUtilities(_utilities)
  }

  const deleteUtility = (_utility) => {
    const _utilities = []
    utilities.map((item) => {
      if(item.name !== _utility.name) _utilities.push(item); return item;
    })

    setUtilities(_utilities)
  }

  const formatRunes = async (_runes) => {
    // Verif flag
    if(formatRunesFlag.current) return false
    formatRunesFlag.current = true

    console.log("FORMATING RUNES...")
    setRunesLoading(true)
    
    // Format and set state
    setTimeout(async () => {
      const _runeFormated = await RunesFormat.formatRunes(_runes, utilities, debounceStatsValue, runeCraft)
      setRunes(_runeFormated)
      setRunesLoading(false)

      // Reset flag
      formatRunesFlag.current = false
      
      console.log("FORMATING RUNES END !")
    },0);
  }

  const formatRuneCraft = async (_runeCraft) => {
    // Verif flag
    if(formatRuneCraftFlag.current) return false
    formatRuneCraftFlag.current = true

    console.log("FORMATING RUNES CRAFT...")
    setRunesLoading(true)
    
    // Format and set state
    setTimeout(async () => {
      const _runeCraftFormated = await RuneCraftFormat.formatRuneCraft(_runeCraft)
      setRuneCraft(_runeCraftFormated)

      console.log(_runeCraftFormated)
      // Reset flag
      formatRuneCraftFlag.current = false

      console.log("FORMATING RUNES CRAFT END !")
    },0);
  }

  const setStatValue = (value, label) => {
    let _statsValue = Object.assign({}, statsValue);
    _statsValue[label] = value;

    setStatsValue(_statsValue)
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
            <RunesEnchantPage runes={runes} runesLoading={runesLoading} />
          </Route>
          <Route exact path='/utilities'>
            <UtilitiesPage setUtility={setUtility} deleteUtility={deleteUtility} utilities={utilities} setUtilities={setUtilitiesJson} />
          </Route>
          <Route exact path='/tools'>
            <ToolsPage statsValue={debounceStatsValue} setStatValue={setStatValue} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

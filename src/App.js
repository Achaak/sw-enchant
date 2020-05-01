import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { RunesEnchantPage, UtilitiesPage, HomePage, ToolsPage } from './Pages'
import { Header } from './Components'
import { SWManager } from './Services'

import './App.scss'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const App = () => {  
  global.SWManager = new SWManager()

  return (
    <div className="App">
      <Router>
        <Header />
      
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/runes/management/enchant'>
            <RunesEnchantPage />
          </Route>
          <Route exact path='/utilities'>
            <UtilitiesPage />
          </Route>
          <Route exact path='/tools'>
            <ToolsPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

import React from 'react';
import { Link } from "react-router-dom";

import {  } from './../../Components'

import './Header.scss'


const Header = () => {

  return (
    <header>
      <Link to="/"><i className="fas fa-home"></i></Link>
      <Link to="/runes/management/enchant"><i className="fas fa-chart-line"></i></Link>
      <Link to="/utilities"><i className="fas fa-lightbulb"></i></Link>
      <Link to="/tools"><i className="fas fa-cog"></i></Link>
    </header>
  )
}

export default Header;
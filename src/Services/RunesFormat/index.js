const maxValue = {
  "SPD"      : 30,
  "ATK%"     : 40,
  "ATK flat" : 100,
  "DEF%"     : 40,
  "DEF flat" : 100,
  "HP%"      : 40,
  "HP flat"  : 1875,
  "CRate"    : 30,
  "CDmg"     : 35,
  "RES"      : 40,
  "ACC"      : 40
};

const getSetLabel = (idSet) => {
  let _setLabel;

  switch (idSet) {
    case 1 : _setLabel = "Energy";        break;
    case 2 : _setLabel = "Guard";         break;
    case 3 : _setLabel = "Swift";         break;
    case 4 : _setLabel = "Blade";         break;
    case 5 : _setLabel = "Rage";          break;
    case 6 : _setLabel = "Focus";         break;
    case 7 : _setLabel = "Endure";        break;
    case 8 : _setLabel = "Fatal";         break;
    case 10: _setLabel = "Despair";       break;
    case 11: _setLabel = "Vampire";       break;
    case 13: _setLabel = "Violent";       break;
    case 14: _setLabel = "Nemesis";       break;
    case 15: _setLabel = "Will";          break;
    case 16: _setLabel = "Shield";        break;
    case 17: _setLabel = "Revenge";       break;
    case 18: _setLabel = "Destroy";       break;
    case 19: _setLabel = "Fight";         break;
    case 20: _setLabel = "Determination"; break;
    case 21: _setLabel = "Enhance";       break;
    case 22: _setLabel = "Accuracy";      break;
    case 23: _setLabel = "Tolerance";     break;
  }

  return _setLabel
}

const getStatLabel = (idStat) => {
  let _statsLabel;

  switch (idStat) {
      case 1 : _statsLabel = "HP flat";  break;
      case 2 : _statsLabel = "HP%";      break;
      case 3 : _statsLabel = "ATK flat"; break;
      case 4 : _statsLabel = "ATK%";     break;
      case 5 : _statsLabel = "DEF flat"; break;
      case 6 : _statsLabel = "DEF%";     break;
      case 8 : _statsLabel = "SPD";      break;
      case 9 : _statsLabel = "CRate";    break;
      case 10: _statsLabel = "CDmg";     break;
      case 11: _statsLabel = "RES";      break;
      case 12: _statsLabel = "ACC";      break;
  }

  return _statsLabel;
}

const getQualityLabel = (idQuality) => {
  let qualitylabel;

  switch (idQuality) {
    case 1: qualitylabel = 'Normal';    break;
    case 2: qualitylabel = 'Magic';     break;
    case 3: qualitylabel = 'Rare';      break;
    case 4: qualitylabel = 'Hero';      break;
    case 5: qualitylabel = 'Legendary'; break;
    default: qualitylabel = 'Unknown';   break;
  }

  return qualitylabel
}

const getSubstatValue = (substats, substatsLabel) => {
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];
    
    console.log()
    if(getStatLabel(substat[0]) === substatsLabel) return substat[1]+substat[3]
  }
  return undefined
}

const getEfficiency = (prefix_eff, substats) => {
  let _value = 0;

  // Get percentage innet stat
  if(prefix_eff[0]) {
    _value += prefix_eff[1] / maxValue[getStatLabel(prefix_eff[0])]
  }

  // Get percentage substats
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];

    _value += (substat[1]+substat[3]) / maxValue[getStatLabel(substat[0])]    
  }

  let _efficiency = (_value+1)/2.8;

  // Format efficiency
  _efficiency = Math.round((_efficiency*100)*100)/100

  return _efficiency;
}

const getEfficiencyMax = (prefix_eff, substats, level) => {
  let _value = 0;

  // Get percentage innet stat
  if(prefix_eff[0]) {
    _value += prefix_eff[1] / maxValue[getStatLabel(prefix_eff[0])]
  }

  // Get percentage substats
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];

    _value += (substat[1]+substat[3]) / maxValue[getStatLabel(substat[0])]    
  }

  console.log(level)
  if(level < 12) _value += Math.ceil(((12-level)/3)) * 0.2

  let _efficiency = (_value+1)/2.8;

  // Format efficiency
  _efficiency = Math.round((_efficiency*100)*100)/100

  return _efficiency;
}

export default {
  getSetLabel,
  getStatLabel,
  getQualityLabel,
  getSubstatValue,
  maxValue,
  getEfficiency,
  getEfficiencyMax,
}
const getStatLabel = (idStat, withFlat = true) => {
  let _statsLabel;

  switch (idStat) {
      case 1 : _statsLabel = (withFlat ? "HP flat" : "HP"); break;
      case 2 : _statsLabel = "HP%";      break;
      case 3 : _statsLabel = (withFlat ? "ATK flat" : "ATK"); break;
      case 4 : _statsLabel = "ATK%";     break;
      case 5 : _statsLabel = (withFlat ? "DEF flat" : "DEF"); break;
      case 6 : _statsLabel = "DEF%";     break;
      case 8 : _statsLabel = "SPD";      break;
      case 9 : _statsLabel = "CRate";    break;
      case 10: _statsLabel = "CDmg";     break;
      case 11: _statsLabel = "RES";      break;
      case 12: _statsLabel = "ACC";      break;
      default:  _statsLabel = "Null"; break;
  }

  return _statsLabel;
}

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
    default:  _setLabel = "Null"; break;
  }

  return _setLabel
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

export default {
  getStatLabel,
  getSetLabel,
  getQualityLabel,
}
// Return stat label of the id
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

// Return stat id of the label
const getStatId = (labelStat) => {
  let _statsId;

  switch (labelStat) {
      case "HP flat" : _statsId = 1;  break;
      case "HP%"     : _statsId = 2;  break;
      case "ATK flat": _statsId = 3;  break;
      case "ATK%"    : _statsId = 4;  break;
      case "DEF flat": _statsId = 5;  break;
      case "DEF%"    : _statsId = 6;  break;
      case "SPD"     : _statsId = 8;  break;
      case "CRate"   : _statsId = 9;  break;
      case "CDmg"    : _statsId = 10; break;
      case "RES"     : _statsId = 11; break;
      case "ACC"     : _statsId = 12; break;
      default:  _statsId = "Null"; break;
  }

  return _statsId;
}

// Return set label of the id
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

// Return quality label of the id
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

// Return rune craft type label of the id
const getRuneCraftTypeLabel = (idType) => {
  let typeLabel;

  switch (idType) {
    case 0: typeLabel="Grindstone"; break;
    case 1: typeLabel="Enchantment"; break;
    default: break;
  }

  return typeLabel
}

// Format the craft type id
const getRuneCraftCraftTypeIdFormat = (craft_type_id) => {
  const craftTypeIdRegex = new RegExp(/^([0-9][0-9]|[0-9])([0-9][0-9])([0-9])([0-9])$/); 
  const craftTypeIdRegexRes = craft_type_id.toString().match(craftTypeIdRegex)

  return {
    set_label: getSetLabel(parseInt(craftTypeIdRegexRes[1])),
    stat_label: getStatLabel(parseInt(craftTypeIdRegexRes[2])),
    type_craft: getRuneCraftTypeLabel(parseInt(craftTypeIdRegexRes[3])),
    quality_label: getQualityLabel(parseInt(craftTypeIdRegexRes[4])),
    craft_type_id: craft_type_id,
  }
}

// Return susbstat value of the label in the list of substat
const getRuneSubstatValue = (substats, substatsLabel) => {
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];
    
    if(getStatLabel(substat[0]) === substatsLabel) return substat[1]+substat[3]
  }
  return undefined
}

// Return all stats of the rune
const getRuneStatsLabel = (pri_eff, prefix_eff, substats) => {
  let statsLabel = []

  // Primary stats
  if(pri_eff) statsLabel.push(getStatLabel(pri_eff[0]))

  // Prefix stats
  if(prefix_eff && prefix_eff[0]) statsLabel.push(getStatLabel(prefix_eff[0]))

  // Substat
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];

    statsLabel.push(getStatLabel(substat[0]))
  }

  return statsLabel
}

// Return the string of the substat
const getRuneSubstatString = (substats) => {
  let _substatsString = []

  for (let i = 0; i < substats.length; i++) {
    const _substat = substats[i];
    
    _substatsString.push(`${getStatLabel(_substat[0], false)} +${_substat[1]+_substat[3]}`)
  }

  return _substatsString
}

// Return the stat enchanted is has this
const getRuneIsEnchant = (substats) => {
  let _enchant = null

  for (let i = 0; i < substats.length; i++) {
    const _substat = substats[i];
    
    if(_substat[2]) _enchant = {
      label:  getStatLabel(_substat[0]),
      value: _substat[1],
      valueGrind: _substat[1]+_substat[3]
    }
  }

  return _enchant
}

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

const runeStatExceptions = {
  1: ["DEF%", "DEF flat"],
  3: ["ATK%", "ATK flat"],
}

export default {
  getStatLabel,
  getStatId,
  getSetLabel,
  getQualityLabel,
  
  getRuneCraftCraftTypeIdFormat,
  getRuneCraftTypeLabel,

  getRuneSubstatValue,
  getRuneStatsLabel,
  getRuneSubstatString,
  getRuneIsEnchant,
  
  maxValue,
  runeStatExceptions,
}
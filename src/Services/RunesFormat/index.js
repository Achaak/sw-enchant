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
    default:  _setLabel = "Null"; break;
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
      default:  _statsLabel = "Null"; break;
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
  
  if(level < 12) _value += Math.ceil(((12-level)/3)) * 0.2

  let _efficiency = (_value+1)/2.8;

  // Format efficiency
  _efficiency = Math.round((_efficiency*100)*100)/100

  return _efficiency;
}

const getStatsLabel = (pri_eff, prefix_eff, substats) => {
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

const getMinStat = (substats) => {
  let _minStat = {
    label: 'none',
    value: 1
  };

  for (let i = 0; i < substats.length; i++) {
    const _substat = substats[i];

    const _statLabel = getStatLabel(_substat[0])
    const _perc = (_substat[1]+_substat[3]) / maxValue[_statLabel]

    if(_minStat.value > _perc) _minStat = {
      label: _statLabel,
      value: _perc
    }
  }

  return _minStat.label
}

const getIsEnchant = (substats) => {
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

const getUtilities = (statsLabel, utilities) => {

  // Get utilities
  let _runeUtilities = []
  for (let i = 0; i < utilities.length; i++) {
    const _utility = utilities[i];
    
    const _same_stats = _utility.stats.filter(x => statsLabel.includes(x));
    
    if(_same_stats.length >= _utility.nb_stats) _runeUtilities.push(_utility.name)
  }

  return _runeUtilities
}

const getEnchantAdvice = (pri_eff, prefix_eff, sec_eff, utilities, level) => {
  let _enchantsAdvice = []

  console.log('--------------')
  
  // Verif level
  if(level < 12) return false

  const _statsLabelWithoutPrefix = getStatsLabel(pri_eff, undefined, sec_eff)
  const _substatLabel = getStatsLabel(undefined, undefined, sec_eff)
  const _minStat = getMinStat(sec_eff)
  const _isEnchant = getIsEnchant(sec_eff)
  const _substatsFormat = getSubstatsFormat(sec_eff)

  for (let i = 0; i < utilities.length; i++) {
    const _utility = utilities[i];
    
    if(_isEnchant) {

    }
    else {
      // Verif has minimal number stats
      const _same_stats = _utility.stats.filter(x => _statsLabelWithoutPrefix.includes(x));
      
      let _oldStats = _substatLabel.filter(x => !_utility.stats.includes(x));
      let _newStats = _utility.stats.filter(x => !_substatLabel.includes(x));

      // Verif has old stats and new stats and nb stats
      if(
        _same_stats.length >= parseInt(_utility.nb_stats)-1 &&
        _oldStats.length &&
        _newStats.length
        ) {

        let _utilityEnchant = {
          name: _utility.name,
          enchants: []
        }

        // Set utility enchant
        _enchantsAdvice.push(_utilityEnchant)
        console.log(_substatLabel, _oldStats, _newStats)
      }
    }
    //console.log(statsLabel, _utility.stats.filter(x => !statsLabel.includes(x)))
  }

  console.log(_enchantsAdvice)
  return _enchantsAdvice
}

const getSubstatsFormat = (substats) => {
  let _substatsFormat = []

  for (let i = 0; i < substats.length; i++) {
    const _substat = substats[i];

    const _label = getStatLabel(_substat[0])
    
    _substatsFormat.push({
      label:  _label,
      value: _substat[1],
      value_perc: _substat[1] / maxValue[_label],
      valueGrind: _substat[1]+_substat[3],
      valueGrind_perc: (_substat[1]+_substat[3]) / maxValue[_label],
      isEnchant: _substat[2] === 1,
    })
  }

  return _substatsFormat;
}

const formatRunes = (runes, utilities) => {
  const _runes = runes.map((item) => {
    const _statsLabel = getStatsLabel(item.pri_eff, item.prefix_eff, item.sec_eff)

    return {
      ...item,
      set_label: getSetLabel(item.set_id),
      extra_label: getQualityLabel(item.extra),
      pri_eff_label: getStatLabel(item.pri_eff[0]),
      pri_eff_value: item.pri_eff[1],
      prefix_eff_label: (item.prefix_eff[0] ? getStatLabel(item.prefix_eff[0]) : undefined),
      prefix_eff_value: (item.prefix_eff[0] ? item.prefix_eff[1] : undefined),
      "ATK%":     getSubstatValue(item.sec_eff, "ATK%"),
      "ATK flat": getSubstatValue(item.sec_eff, "ATK flat"),
      "DEF%":     getSubstatValue(item.sec_eff, "DEF%"),
      "DEF flat": getSubstatValue(item.sec_eff, "DEF flat"),
      "HP%":      getSubstatValue(item.sec_eff, "HP%"),
      "HP flat":  getSubstatValue(item.sec_eff, "HP flat"),
      "SPD":      getSubstatValue(item.sec_eff, "SPD"),
      "ACC":      getSubstatValue(item.sec_eff, "ACC"),
      "RES":      getSubstatValue(item.sec_eff, "RES"),
      "CRate":    getSubstatValue(item.sec_eff, "CRate"),
      "CDmg":     getSubstatValue(item.sec_eff, "CDmg"),
      efficiency: getEfficiency(item.prefix_eff, item.sec_eff),
      efficiency_max: getEfficiencyMax(item.prefix_eff, item.sec_eff, item.upgrade_curr),
      utilities: getUtilities(_statsLabel, utilities),
      enchant_advice: getEnchantAdvice(item.pri_eff, item.prefix_eff, item.sec_eff, utilities, item.upgrade_curr)
    }
  })

  return _runes
}

export default {
  getSetLabel,
  getStatLabel,
  getQualityLabel,
  getSubstatValue,
  maxValue,
  getEfficiency,
  getEfficiencyMax,
  formatRunes,
}
import _ from 'lodash'
import RunesInfos from './../RunesInfos'

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

const runeExection = {
  1: ["DEF%", "DEF flat"],
  3: ["ATK%", "ATK flat"],
}

const susbstatString = (substats) => {
  let _substatsString = []

  for (let i = 0; i < substats.length; i++) {
    const _substat = substats[i];
    
    _substatsString.push(`${RunesInfos.getStatLabel(_substat[0], false)} +${_substat[1]+_substat[3]}`)
  }

  return _substatsString
}

const getSubstatValue = (substats, substatsLabel) => {
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];
    
    if(RunesInfos.getStatLabel(substat[0]) === substatsLabel) return substat[1]+substat[3]
  }
  return undefined
}

const getSubstatFormat = (substats, substatsLabel) => {
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];
    
    if(RunesInfos.getStatLabel(substat[0]) === substatsLabel) return {
      value: substat[1]+substat[3],
      label: substatsLabel,
      isEnchant: substat[2] === 1,
      isGrind: (substat[3] > 0),
    }
  }
  return undefined
}

const getEfficiency = (prefix_eff, substats, statsValue) => {
  let _value = 0;

  // Get percentage innet stat
  if(prefix_eff[0]) {
    _value += prefix_eff[1] / maxValue[RunesInfos.getStatLabel(prefix_eff[0])] * statsValue[RunesInfos.getStatLabel(prefix_eff[0])]
  }

  // Get percentage substats
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];

    _value += (substat[1]+substat[3]) / maxValue[RunesInfos.getStatLabel(substat[0])] * statsValue[RunesInfos.getStatLabel(substat[0])]
  }

  let _efficiency = (_value+1)/2.8;

  // Format efficiency
  _efficiency = Math.round((_efficiency*100)*100)/100

  return _efficiency;
}

const getEfficiencyMax = (prefix_eff, substats, level, statsValue) => {
  let _value = 0;

  // Get percentage innet stat
  if(prefix_eff[0]) {
    _value += prefix_eff[1] / maxValue[RunesInfos.getStatLabel(prefix_eff[0])] * statsValue[RunesInfos.getStatLabel(prefix_eff[0])]
  }

  // Get percentage substats
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];

    _value += (substat[1]+substat[3]) / maxValue[RunesInfos.getStatLabel(substat[0])] * statsValue[RunesInfos.getStatLabel(substat[0])] 
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
  if(pri_eff) statsLabel.push(RunesInfos.getStatLabel(pri_eff[0]))

  // Prefix stats
  if(prefix_eff && prefix_eff[0]) statsLabel.push(RunesInfos.getStatLabel(prefix_eff[0]))

  // Substat
  for (let i = 0; i < substats.length; i++) {
    const substat = substats[i];

    statsLabel.push(RunesInfos.getStatLabel(substat[0]))
  }

  return statsLabel
}

const getMinStat = (substats, statsValue) => {
  let _minStat = {
    label: 'none',
    value: 1
  };

  for (let i = 0; i < substats.length; i++) {
    const _substat = substats[i];

    const _statLabel = RunesInfos.getStatLabel(_substat[0])
    const _perc = (_substat[1]+_substat[3]) / maxValue[_statLabel] * statsValue[_statLabel]

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
      label:  RunesInfos.getStatLabel(_substat[0]),
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

const getEnchantAdvice = (pri_eff, prefix_eff, sec_eff, utilities, level, slot, statsValue) => {
  let _enchantsAdvice = []

  //console.log('--------------')
  
  // Verif level
  if(level < 12) return false

  const _statsLabelWithoutPrefix = getStatsLabel(pri_eff, prefix_eff, sec_eff)
  const _substatLabel = getStatsLabel(undefined, undefined, sec_eff)
  const _isEnchant = getIsEnchant(sec_eff)
  const _substatsFormat = getSubstatsFormat(sec_eff, statsValue)

  for (let i = 0; i < utilities.length; i++) {
    const _utility = utilities[i];
    
    // Verif has minimal number stats
    const _same_stats = _utility.stats.filter(x => _statsLabelWithoutPrefix.includes(x));
    
    let _oldStatsLabel;
    let _newStatsLabel;

    // Init old and new stats label
    if(_isEnchant) {
      _oldStatsLabel = (_utility.stats.includes(_isEnchant.label) ? [_isEnchant.label] : []);
      _newStatsLabel = _utility.stats.filter(x => !_statsLabelWithoutPrefix.includes(x));
      _newStatsLabel.push(_isEnchant.label)
    }
    else {
      _oldStatsLabel = _substatLabel.filter(x => !_utility.stats.includes(x));
      _newStatsLabel = _utility.stats.filter(x => !_statsLabelWithoutPrefix.includes(x));
    }
    
    // Remove stats execption in the new stats
    if(runeExection[slot]) _newStatsLabel = _newStatsLabel.filter(x => !runeExection[slot].includes(x));

    /*console.log('**************')
    console.log("_statsLabelWithoutPrefix", _statsLabelWithoutPrefix)
    console.log("_isEnchant", _isEnchant)
    console.log("_oldStatsLabel", _oldStatsLabel)
    console.log("_newStatsLabel", _newStatsLabel)
    console.log("slot", runeExection[slot])
    console.log('**************')*/

    // Verif has old stats and new stats and nb stats
    if(
      _same_stats.length >= parseInt(_utility.nb_stats)-1 &&
      _oldStatsLabel.length &&
      _newStatsLabel.length
    ) {

      // Init utility enchant
      let _utilityEnchant = {
        label: _utility.name,
        enchants: []
      }

      // Get old stats values
      let _oldStatsValues = _.filter(_substatsFormat, (o) => _oldStatsLabel.includes(o.label))

      // Sort stats
      _oldStatsValues = _.orderBy(_oldStatsValues, ['value_perc'], ['asc'])

      // Get min values
      let _minValue = (_oldStatsValues.length ? _.first(_oldStatsValues).value_perc : [])
      _oldStatsValues = _.filter(_oldStatsValues, {value_perc: _minValue})

      // Set enchant utility
      for (let i = 0; i < _oldStatsValues.length; i++) {
        const _oldStatsValue = _oldStatsValues[i];
        
        for (let j = 0; j < _newStatsLabel.length; j++) {
          const _newStatLabel = _newStatsLabel[j];
          
          _utilityEnchant.enchants.push({
            oldStat: _oldStatsValue.label,
            newStats: _newStatLabel
          })
        }
      }
      //console.log(_substatLabel, _oldStatsLabel, _newStatsLabel)

      // Set utility enchant
      _enchantsAdvice.push(_utilityEnchant)
    }
    
    //console.log(statsLabel, _utility.stats.filter(x => !statsLabel.includes(x)))
  }

  //console.log(_enchantsAdvice, _isEnchant)
  return _enchantsAdvice
}

const getSubstatsFormat = (substats, statsValue) => {
  let _substatsFormat = []

  for (let i = 0; i < substats.length; i++) {
    const _substat = substats[i];

    const _label = RunesInfos.getStatLabel(_substat[0])
    
    _substatsFormat.push({
      label:  _label,
      value: _substat[1],
      value_perc: _substat[1] / maxValue[_label],
      valueGrind: _substat[1]+_substat[3],
      valueGrind_perc: (_substat[1]+_substat[3]) / maxValue[_label] * statsValue[_label],
      isEnchant: _substat[2] === 1,
    })
  }

  return _substatsFormat;
}

const formatRunes = async (runes, utilities, statsValue) => {
  const _runes = runes.map((item) => {
    const _statsLabel = getStatsLabel(item.pri_eff, item.prefix_eff, item.sec_eff)

    return {
      ...item,
      set_label: RunesInfos.getSetLabel(item.set_id),
      extra_label: RunesInfos.getQualityLabel(item.extra),
      pri_eff_label: RunesInfos.getStatLabel(item.pri_eff[0]),
      pri_eff_format: `${RunesInfos.getStatLabel(item.pri_eff[0], false)} +${(item.pri_eff[1])}`,
      pri_eff_value: item.pri_eff[1],
      prefix_eff_label:  (item.prefix_eff[0] ? RunesInfos.getStatLabel(item.prefix_eff[0]) : undefined),
      prefix_eff_format: (item.prefix_eff[0] ? `${RunesInfos.getStatLabel(item.prefix_eff[0])} +${item.prefix_eff[1]}` : undefined),
      prefix_eff_value:  (item.prefix_eff[0] ? item.prefix_eff[1] : undefined),
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
      substat_1_format: susbstatString(item.sec_eff)[0],
      substat_2_format: susbstatString(item.sec_eff)[1],
      substat_3_format: susbstatString(item.sec_eff)[2],
      substat_4_format: susbstatString(item.sec_eff)[3],
      efficiency: getEfficiency(item.prefix_eff, item.sec_eff, statsValue),
      efficiency_max: getEfficiencyMax(item.prefix_eff, item.sec_eff, item.upgrade_curr, statsValue),
      utilities: getUtilities(_statsLabel, utilities),
      enchant_advice: getEnchantAdvice(item.pri_eff, item.prefix_eff, item.sec_eff, utilities, item.upgrade_curr, item.slot_no, statsValue)
    }
  })

  return _runes
}

export default {
  getSubstatValue,
  maxValue,
  getEfficiency,
  getEfficiencyMax,
  formatRunes,
  getSubstatFormat,
  getMinStat,
}
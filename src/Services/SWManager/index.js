import RunesInfos from './RunesInfos'
import Configs from './Configs'
import LocalStorage from './../LocalStorage'
import _ from 'lodash'

class SWManager {
  constructor() {
    this.runes      = LocalStorage.getItem("runes")      || []
    this.runeCraft  = LocalStorage.getItem("runeCraft")  || []
    this.utilities  = LocalStorage.getItem("utilities")  || []
    this.statsValue = LocalStorage.getItem("statsValue") || Configs.statsValueDefault

    // Debounce
    /*this.formatRunes      = _.debounce(this.formatRunes, 500)
    this.formatStatsValue = _.debounce(this.formatStatsValue, 500)
    this.formatUtilities  = _.debounce(this.formatUtilities, 500)
    this.formatRunesCraft = _.debounce(this.formatRunesCraft, 500)*/
    this.setStatValue = _.debounce(this.setStatValue, 500)
  }

  getUtilities() { return this.utilities }
  getStatsValue() { return this.statsValue }
  getRunes() { return this.runes }
  getRuneCraft() { return this.runeCraft }
  

  // Return all datas
  getDatas() {
    return {
      runes: this.runes,
      runeCraft: this.runeCraft,
      statsValue: this.statsValue,
      utilities: this.utilities,
    }
  }



  async setRunes(_runes) {
    // Set runes
    this.runes = _runes

    await this.formatRunes()

    return this.getDatas()
  }

  async setRuneCraft(_runeCraft) {
    // Set rune craft
    this.runeCraft = _runeCraft
    
    await this.formatRunesCraft()
    await this.formatRunes()

    return this.getDatas()
  }

  // UTILITIES
  async setUtilities(_utilities) {
    // Set runes
    this.utilities = _utilities

    await this.formatUtilities()
    await this.formatRunes()

    return this.getDatas()
  }

  async setUtility(_utility) {
    this.utilities = [
      ...this.utilities,
      _utility
    ]

    await this.formatUtilities()
    await this.formatRunes()

    return this.getDatas()
  }

  async updateUtility(_newUtility, _id) {  
    this.utilities = this.utilities.map((item) => {
      if(item.id === _id) item = _newUtility; 
      
      return item;
    })

    await this.formatUtilities()
    await this.formatRunes()

    return this.getDatas()
  }

  async deleteUtility(_id) {
    this.utilities = this.utilities.filter((item) => {
      if(item.id === _id) return false; 
      return true;
    })

    await this.formatUtilities()
    await this.formatRunes()

    return this.getDatas()
  }
  // UTILITIES END

  async setStatValue(value, label) {
    let _statsValue = Object.assign({}, this.statsValue);
    _statsValue[label] = value;

    this.statsValue = _statsValue

    await this.formatRunes()
    await this.formatStatsValue()

    return this.getDatas()
  }

  async setJson(_json) {
    // Format and set state
    this.runeCraft = _json.rune_craft_item_list

    
    // Get rune monster
    let _runesMonster = []
    _json.unit_list.map((item) => {
      _runesMonster = _runesMonster.concat(item.runes); return item;
    })
    this.runes = [..._json.runes, ..._json.rune_lock_list, ..._runesMonster]

    await this.formatRunesCraft()
    await this.formatRunes()

    return this.getDatas()
  }

  async setEnchant(rune_id, craft_type_id, oldStatLabel, newEnchantValue) {
    // Clone state
    let _runeCraft = _.cloneDeep(this.runeCraft)
    let _runes = _.cloneDeep(this.runes)

    // Get old stat id
    const _oldStatId = RunesInfos.getStatId(oldStatLabel)

    // Remove one enchant craft
    _.find(_runeCraft, {craft_type_id: craft_type_id}).amount--

    // Change the stat
    _runes.map((item) => {
      if(item.rune_id === rune_id) {
        for (let i = 0; i < item.sec_eff.length; i++) {
          
          if(item.sec_eff[i][0] === _oldStatId)
            item.sec_eff[i] = [_oldStatId, newEnchantValue, 1, 0]

        }
      }

      return item
    })
    
    this.runeCraft = _runeCraft
    this.runes = _runes
    
    await this.formatRunesCraft()
    await this.formatRunes()
    
    return this.getDatas()
  }



  // Format all utilities
  formatUtilities() {
    // Set utilities in the local storage
    LocalStorage.setItem('utilities', this.utilities)
    
    return this.utilities
  }

  // Format all stats values
  formatStatsValue() {
    // Set stats value in the local storage
    LocalStorage.setItem('statsValue', this.statsValue)
    
    return this.statsValue
  }

  // Format all runes
  formatRunes() {
    console.log("START RUNE FORMAT")

    const _runes = _.map(this.runes, (item) => {
      const _statsLabel = RunesInfos.getRuneStatsLabel(item.pri_eff, item.prefix_eff, item.sec_eff)
      const _setLabel = RunesInfos.getSetLabel(item.set_id)
  
      const _runeEnchantAdvice = this.getRuneEnchantAdvice(item.pri_eff, item.prefix_eff, item.sec_eff, item.upgrade_curr, item.slot_no, _setLabel)

      return {
        ...item,
        set_label: _setLabel,
        extra_label: RunesInfos.getQualityLabel(item.extra),
        pri_eff_label: RunesInfos.getStatLabel(item.pri_eff[0]),
        pri_eff_format: `${RunesInfos.getStatLabel(item.pri_eff[0], false)} +${(item.pri_eff[1])}`,
        pri_eff_value: item.pri_eff[1],
        prefix_eff_label:  (item.prefix_eff[0] ? RunesInfos.getStatLabel(item.prefix_eff[0]) : undefined),
        prefix_eff_format: (item.prefix_eff[0] ? `${RunesInfos.getStatLabel(item.prefix_eff[0])} +${item.prefix_eff[1]}` : undefined),
        prefix_eff_value:  (item.prefix_eff[0] ? item.prefix_eff[1] : undefined),
        "ATK%":     RunesInfos.getRuneSubstatValue(item.sec_eff, "ATK%"),
        "ATK flat": RunesInfos.getRuneSubstatValue(item.sec_eff, "ATK flat"),
        "DEF%":     RunesInfos.getRuneSubstatValue(item.sec_eff, "DEF%"),
        "DEF flat": RunesInfos.getRuneSubstatValue(item.sec_eff, "DEF flat"),
        "HP%":      RunesInfos.getRuneSubstatValue(item.sec_eff, "HP%"),
        "HP flat":  RunesInfos.getRuneSubstatValue(item.sec_eff, "HP flat"),
        "SPD":      RunesInfos.getRuneSubstatValue(item.sec_eff, "SPD"),
        "ACC":      RunesInfos.getRuneSubstatValue(item.sec_eff, "ACC"),
        "RES":      RunesInfos.getRuneSubstatValue(item.sec_eff, "RES"),
        "CRate":    RunesInfos.getRuneSubstatValue(item.sec_eff, "CRate"),
        "CDmg":     RunesInfos.getRuneSubstatValue(item.sec_eff, "CDmg"),
        substat_1_format: RunesInfos.getRuneSubstatString(item.sec_eff)[0],
        substat_2_format: RunesInfos.getRuneSubstatString(item.sec_eff)[1],
        substat_3_format: RunesInfos.getRuneSubstatString(item.sec_eff)[2],
        substat_4_format: RunesInfos.getRuneSubstatString(item.sec_eff)[3],
        efficiency: this.getEfficiency(item.prefix_eff, item.sec_eff),
        efficiency_max: this.getEfficiencyMax(item.prefix_eff, item.sec_eff, item.upgrade_curr),
        utilities: this.getStatsUtilities(_statsLabel),
        enchant_advice: _runeEnchantAdvice.enchantsAdvice,
        hasEnchantAvailable: _runeEnchantAdvice.hasEnchantAvailable,
      }
    })

    // Set runes
    this.runes = _runes

    // Set runes in the local storage
    LocalStorage.setItem('runes', this.runes)
  
    console.log("END RUNE FORMAT")

    return this.runes
  }

  // Format all rune craft
  formatRunesCraft() {
    const _runeCraft = this.runeCraft.map((item) => {
      return {
        ...item,
        ...RunesInfos.getRuneCraftCraftTypeIdFormat(item.craft_type_id)
      }
    })

    // Set rune craft
    this.runeCraft = _runeCraft

    // Set runes craft in the local storage
    LocalStorage.setItem('runeCraft', this.runeCraft)
  
    return _runeCraft
  }

  // Return the format of the substat
  getRuneSubstatsFormat(substats) {
    let _substatsFormat = []
  
    for (let i = 0; i < substats.length; i++) {
      const _substat = substats[i];
  
      const _label = RunesInfos.getStatLabel(_substat[0])
      
      _substatsFormat.push({
        label:  _label,
        value: _substat[1],
        value_perc: _substat[1] / RunesInfos.maxValue[_label],
        valueGrind: _substat[1]+_substat[3],
        valueGrind_perc: (_substat[1]+_substat[3]) / RunesInfos.maxValue[_label] * this.statsValue[_label],
        isEnchant: _substat[2] === 1,
      })
    }
  
    return _substatsFormat;
  }

  // Return the craft type id of the rune craft finded
  hasRuneCraft(setLabel, statLabel, type = "Enchantment") {
    const _enchantCraft = _.find(this.runeCraft, {set_label: setLabel, stat_label: statLabel, type_craft: type})
  
    return  (_enchantCraft && _enchantCraft.amount > 0 ? _enchantCraft.craft_type_id : undefined)
  }

  // Get efficiency of the rune
  getEfficiency(prefix_eff, substats) {
    let _value = 0;
  
    // Get percentage innet stat
    if(prefix_eff[0]) {
      _value += prefix_eff[1] / RunesInfos.maxValue[RunesInfos.getStatLabel(prefix_eff[0])] * this.statsValue[RunesInfos.getStatLabel(prefix_eff[0])]
    }
  
    // Get percentage substats
    for (let i = 0; i < substats.length; i++) {
      const substat = substats[i];
  
      _value += (substat[1]+substat[3]) / RunesInfos.maxValue[RunesInfos.getStatLabel(substat[0])] * this.statsValue[RunesInfos.getStatLabel(substat[0])]
    }
  
    let _efficiency = (_value+1)/2.8;
  
    // Format efficiency
    _efficiency = Math.round((_efficiency*100)*100)/100
  
    return _efficiency;
  }
  
  // Get max efficiency of the rune
  getEfficiencyMax(prefix_eff, substats, level) {
    let _value = 0;
  
    // Get percentage innet stat
    if(prefix_eff[0]) {
      _value += prefix_eff[1] / RunesInfos.maxValue[RunesInfos.getStatLabel(prefix_eff[0])] * this.statsValue[RunesInfos.getStatLabel(prefix_eff[0])]
    }
  
    // Get percentage substats
    for (let i = 0; i < substats.length; i++) {
      const substat = substats[i];
  
      _value += (substat[1]+substat[3]) / RunesInfos.maxValue[RunesInfos.getStatLabel(substat[0])] * this.statsValue[RunesInfos.getStatLabel(substat[0])] 
    }
    
    if(level < 12) _value += Math.ceil(((12-level)/3)) * 0.2
  
    let _efficiency = (_value+1)/2.8;
  
    // Format efficiency
    _efficiency = Math.round((_efficiency*100)*100)/100
  
    return _efficiency;
  }

  // Return all utilities of the stats
  getStatsUtilities(statsLabel) {

    // Get utilities
    let _runeUtilities = []
    for (let i = 0; i < this.utilities.length; i++) {
      const _utility = this.utilities[i];
      
      const _same_stats = _utility.stats.filter(x => statsLabel.includes(x));
      
      if(_same_stats.length >= _utility.nb_stats) _runeUtilities.push(_utility.name)
    }
  
    return _runeUtilities
  }

  // Return enchant advice
  getRuneEnchantAdvice(pri_eff, prefix_eff, sec_eff, level, slot, set) {
    let _enchantsAdvice = []
    let _hasEnchantAvailable = false
    
    // Verif level
    if(level >= 12) {  
      const _statsLabel     = RunesInfos.getRuneStatsLabel(pri_eff, prefix_eff, sec_eff)
      const _substatLabel   = RunesInfos.getRuneStatsLabel(undefined, undefined, sec_eff)
      const _isEnchant      = RunesInfos.getRuneIsEnchant(sec_eff)
      const _substatsFormat = this.getRuneSubstatsFormat(sec_eff)
    
      for (let i = 0; i < this.utilities.length; i++) {
        const _utility = this.utilities[i];
        
        // Verif has minimal number stats
        const _same_stats = _utility.stats.filter(x => _statsLabel.includes(x));
        
        let _oldStatsLabel;
        let _newStatsLabel;
    
        // Init old and new stats label
        if(_isEnchant) {
          _oldStatsLabel = (_utility.stats.includes(_isEnchant.label) ? [_isEnchant.label] : []);
          _newStatsLabel = _utility.stats.filter(x => !_statsLabel.includes(x));
          _newStatsLabel.push(_isEnchant.label)
        }
        else {
          _oldStatsLabel = _substatLabel.filter(x => !_utility.stats.includes(x));
          _newStatsLabel = _utility.stats.filter(x => !_statsLabel.includes(x));
        }
        
        // If not enchant and has utility
        if(!_oldStatsLabel.length && !_isEnchant) {
          _oldStatsLabel = _substatLabel;
          _newStatsLabel = _utility.stats;
        }
        
        // Remove stats execption in the new stats
        if(RunesInfos.runeStatExceptions[slot]) _newStatsLabel = _newStatsLabel.filter(x => !RunesInfos.runeStatExceptions[slot].includes(x));
    
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

              const _hasRuneCraft = this.hasRuneCraft(set, _newStatLabel, "Enchantment")
              
              _utilityEnchant.enchants.push({
                oldStat: _oldStatsValue.label,
                newStats: _newStatLabel,
                hasEnchant: _hasRuneCraft
              })

              if(_hasRuneCraft) _hasEnchantAvailable = true
            }
          }
    
          // Set utility enchant
          _enchantsAdvice.push(_utilityEnchant)
        }
        
      }
    }
    
    return {
      enchantsAdvice: _enchantsAdvice,
      hasEnchantAvailable: _hasEnchantAvailable,
    }
  }
}

export default SWManager

export {
  RunesInfos,
  Configs,
}
import RunesInfos from './../RunesInfos'

const getTypeLabel = (idType) => {
  let typeLabel;

  switch (idType) {
    case 0: typeLabel="Grindstone"; break;
    case 1: typeLabel="Enchantment"; break;
    default: break;
  }

  return typeLabel
}

const formatCraftTypeId = (craft_type_id) => {
  const craftTypeIdRegex = new RegExp(/^([0-9][0-9]|[0-9])([0-9][0-9])([0-9])([0-9])$/); 
  const craftTypeIdRegexRes = craft_type_id.toString().match(craftTypeIdRegex)

  return {
    set_label: RunesInfos.getSetLabel(parseInt(craftTypeIdRegexRes[1])),
    stat_label: RunesInfos.getStatLabel(parseInt(craftTypeIdRegexRes[2])),
    type_craft: getTypeLabel(parseInt(craftTypeIdRegexRes[3])),
    quality_label: RunesInfos.getQualityLabel(parseInt(craftTypeIdRegexRes[4])),
  }
}

const formatRuneCraft = (runeCraft) => {
  const _runeCraft = runeCraft.map((item) => {
    return {
      ...item,
      ...formatCraftTypeId(item.craft_type_id)
    }
  })

  return _runeCraft
}

export default {
  formatRuneCraft
}
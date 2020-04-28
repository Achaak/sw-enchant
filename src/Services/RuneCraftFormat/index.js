const formatRunes = (runeCraft) => {
  const _runeCraft = runeCraft.map((item) => {

    return {
      ...item
    }
  })

  return _runeCraft
}

export default {
  formatRunes
}
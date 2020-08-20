export default {
  getDictName: (state) => (id) => {
    if (state.dictMap.has(id)) {
      return state.dictMap.get(id)
    }
    return ''
  }
}

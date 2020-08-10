export default {
  getDictName: (state) => (id) => {
    if (id.length > 0) {
      return state.dictMap.get(id)
    }
    return ''
  }
}

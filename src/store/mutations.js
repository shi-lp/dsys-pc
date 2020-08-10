import { DICTLIST } from '@/store/mutations-types'
import { getDictMap } from '@/network/sysConfig/dictInfo/dictInfo.js'

export default {
  // 方法定义
  [DICTLIST] (state) {
    state.dictMap = new Map()
    getDictMap().then(res => {
      if (res.code === 200) {
        res.data.forEach(element => {
          state.dictMap.set(element.dictCode, element.dictName)
        })
      }
    })
  }
}

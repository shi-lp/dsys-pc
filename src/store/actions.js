import { DICTLIST } from '@/store/mutations-types'

// Vuex状态管理
// Vue Components --dispatch--> actions --commit--> mutations --mutate--> state --Render--> Vue Components
// Vue Components  --commit--> mutations --mutate--> state --Render--> Vue Components
// Action 类似于 mutation,Action 提交的是 mutation，而不是直接变更状态,Action 可以包含任意异步操作
export default {
  getDictMap (context, payLoad) {
    context.commit(DICTLIST)
  }
}

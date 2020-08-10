import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.config.productionTip = false

Vue.use(VXETable)

// 创建一个超链接渲染器,设置doFlag
VXETable.renderer.add('doFlag', {
  // 默认显示模板
  renderDefault (h, cellRender, params) {
    const { row } = params
    if (row.doFlag === '1') {
      return [<div>启用</div>]
    } else if (row.doFlag === '0') {
      return [<div>停用</div>]
    } else if (row.doFlag === '2') {
      return [<div>被删除</div>]
    }
    return [<div>未设置</div>]
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('getDictMap')
  }
}).$mount('#app')

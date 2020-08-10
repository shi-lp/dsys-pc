<template>
  <div>
    <h3><i class="fa fa-angle-right"></i>数据字典</h3>
    <div class="chat-room mt">
      <aside class="mid-side">
        <div class="row form-group">
          <button slot="button-default" class="btn btn-primary"  @click="updateDict">更新</button>
          <button slot="button-default" class="btn btn-primary"  @click="delDict">删除</button>
          <button slot="button-default" class="btn btn-primary"  @click="addDict('next')">新增下级</button>
          <button slot="button-default" class="btn btn-primary"  @click="addDict('current')">新增本级</button>
        </div>
        <v-tree :treeData='datas' ref='vtree' @clickNode ='clickNode'></v-tree>
      </aside>
      <aside class="right-side">
        <info :info="dictInfo" :editType="editType" @addDictInfoCpn="addDictInfoCpn"></info>
      </aside>
    </div>
  </div>
</template>

<script>
import VTree from '@/components/common/tree/VTree'
import Info from '@/components/content/sysConfig/dictInfo/Info'
import { getDictTree, getDictInfo, getDictCode, addDictInfo, updateDictInfo, delDictInfo } from '@/network/sysConfig/dictInfo/dictInfo.js'

export default {
  name: 'DictInfo',
  components: {
    VTree,
    Info
  },
  data () {
    return {
      datas: [],
      dictInfo: {
        type: Object,
        default: () => ({})
      },
      editType: 'show',
      currentId: '',
      saveictInfo: {
        type: Object,
        default: () => ({})
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.datas = []
      getDictTree().then(res => {
        if (res.code === 200) {
          this.datas = res.data
        }
      })
    },
    clickNode (data) {
      getDictInfo(data.id).then(res => {
        if (res.code === 200) {
          this.dictInfo = res.data
          this.editType = 'show'
          this.currentId = res.data.dictCode
        }
      })
    },
    updateDict () {
      this.editType = 'add'
    },
    delDict () {
      delDictInfo(this.currentId).then(res => {
        if (res.code === 200) {
          this.$options.methods.initData()
        }
      })
    },
    addDict (position) {
      // 重置data对象到初始化状态
      Object.assign(this.$data.dictInfo, this.$options.data().dictInfo)
      getDictCode(position, this.currentId).then(res => {
        if (res.code === 200) {
          this.editType = 'add'
          this.dictInfo = res.data
        }
      })
    },
    addDictInfoCpn (sId, dictCode, dictName, dictValue, note, orderCode, doFlag) {
      const renderFlag = doFlag ? '1' : '0'
      if (sId) {
        updateDictInfo(dictCode, dictName, dictValue, note, orderCode, renderFlag).then(res => {
          if (res.code === 200) {
            this.editType = 'show'
          }
        })
      } else {
        addDictInfo(dictCode, dictName, dictValue, note, orderCode, renderFlag).then(res => {
          if (res.code === 200) {
            this.editType = 'show'
          }
        })
      }
      this.initData()
    }
  }
}
</script>
<style>
</style>

<template>
  <div id="sysStetup">
    <div class="row">
      <ds-select>
        <label slot="select-text">分类等级</label>
        <select slot="select-box" v-model="cateSelected" @change="onSelect">
          <option v-for="(value, key, index) in cateType" :key="index" :value="key" >{{value}}</option>
        </select>
      </ds-select>
      <ds-select>
        <label slot="select-text">分类选择</label>
        <select slot="select-box" id="" name="">
          <option v-for="(value, key, index) in cateList" :key="index" :value="key" >{{value}}</option>
        </select>
      </ds-select>
    </div>
    <div class="row">
      <ds-input>
        <label slot="input-text">输入框</label>
        <input slot="input-box" type="text" value="" />
      </ds-input>
    </div>
    <ds-table>
      <table-thead slot="tab-head"></table-thead>
      <table-tbody slot="tab-body"></table-tbody>
      <page-contro slot="page-contro"></page-contro>
    </ds-table>
    <button @click="addCate">保存</button>
  </div>
</template>

<script>
import Input from '@/components/common/form/input/Input'
import { Table, TableTbody, TableThead, PageContro } from '@/components/common/table/index'
import Select from '@/components/common/form/select/Select'
import { addCategory, selectCategory } from '@/network/category/category'

export default {
  name: 'MainSysSetup',
  components: {
    DsInput: Input,
    DsTable: Table,
    TableTbody,
    TableThead,
    PageContro,
    DsSelect: Select
  },
  data () {
    return {
      cateType: { level_1: '一级分类', level_2: '二级分类', level_3: '三级分类' },
      cateList: {}, // 选择分类后查询所有列表
      cateSelected: '' // 分类选择值
    }
  },
  created () {
    this.cateSelected = this.cateType[0].key
  },
  methods: {
    onSelect () {
      console.log(this.cateSelected)
      selectCategory().then(res => {
        this.cateList = res
      })
    },
    addCate () {
      addCategory().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>

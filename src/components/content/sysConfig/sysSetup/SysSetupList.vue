<template>
  <div>
    <h3><i class="fa fa-angle-right"></i>系统配置</h3>
    <search-bar></search-bar>
    <ds-table>
      <table-thead slot="tab-head" :heads="headList"></table-thead>
      <table-tbody slot="tab-body" :bodys="bodyList"></table-tbody>
      <page-control slot="page-control"></page-control>
    </ds-table>
  </div>
</template>

<script>
import SearchBar from '@/components/common/search/SearchBar'
import { Table, TableTbody, TableThead, PageControl } from '@/components/common/table/index'

export default {
  name: 'SysSetupList',
  components: {
    SearchBar,
    DsTable: Table,
    TableTbody,
    TableThead,
    PageControl
  },
  data () {
    return {
      headList: [],
      bodyList: []
    }
  },
  created () {
    this.headList = { no: '编码', name: '名称', code: '代码', age: '年龄' }
    this.bodyList = [
      { no: '1', name: 'cobe' },
      { no: '2', name: 'ccc' },
      { no: '3', name: 'ss' }]
  }
}
</script>
<style>
</style>

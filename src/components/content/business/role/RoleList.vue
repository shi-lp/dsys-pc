<template>
  <div>
    <vxe-form :data="formData" title-align="right" title-width="100" prevent-submit title-colon>
      <vxe-form-item title="角色编号" field="roleCode" span="8" :item-render="{name: 'input', attrs: {placeholder: '请输入角色编码'}}"></vxe-form-item>
      <vxe-form-item title="角色名称" field="roleName" span="8" :item-render="{name: 'input', attrs: {placeholder: '请输入角色名称'}}"></vxe-form-item>
      <vxe-form-item title="启用状态" field="doFlag" span="8" :item-render="{name: '$select', options: doFlagList}"></vxe-form-item>
      <vxe-form-item title="所属部门" field="deptId" span="8" :item-render="{name: '$select', options: deptList}"></vxe-form-item>
    </vxe-form>
    <vxe-grid export-config :toolbar="tableToolbar" :show-header="true" :data="datas" :stripe="true"
     :border="border" :loading="loading" :align="align" :header-align="headerAlign"
     :highlight-current-row="true"
     :pager-config="tablePage"
     @page-change="handlePageChange"
     >
     <template v-slot:toolbar_buttons>
        <vxe-button size="mini" type="submit" status="primary" @click="submitEvent" >查询</vxe-button>
        <vxe-button size="mini" type="reset">重置</vxe-button>
        <vxe-button size="mini" status="primary" @click="add">新增</vxe-button>
      </template>
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column :visible="false" field="sId" title="主键"></vxe-table-column>
      <vxe-table-column title="操作" width="100" show-overflow>
        <template v-slot="{ row }">
          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="delEvent(row)"></vxe-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="roleCode" title="角色编码" ></vxe-table-column>
      <vxe-table-column field="roleName" title="角色名称" ></vxe-table-column>
      <vxe-table-column field="deptName" title="所属部门" ></vxe-table-column>
      <vxe-table-column field="belongSys" title="所属系统" >
        <template v-slot="{ row }">
          <div>{{$store.getters.getDictName(row.belongSys)}}</div>
        </template>
      </vxe-table-column>
      <vxe-table-column field="doFlag" title="启用状态" :cell-render="{name: 'doFlag'}"></vxe-table-column>
    </vxe-grid>
  </div>
</template>

<script>
import { getRoleList, getDeptOption } from '@/network/profile/role/role'
// 角色列表
export default {
  name: 'RoleList',
  data () {
    return {
      formData: {
        roleCode: '',
        roleName: '',
        belongSys: '',
        doFlag: 'ENABLED',
        deptId: '0'
      },
      datas: [],
      border: true,
      loading: false,
      align: 'center',
      headerAlign: 'center',
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: 'right',
        pageSizes: [10, 20, 50, 100, 200, 500],
        pagerCount: 6, // 显示页码按钮数量
        layouts: ['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total'],
        perfect: true
      },
      tableToolbar: {
        size: 'mini',
        perfect: true, // 配套样式
        export: true, // 导出按钮
        zoom: true,
        print: true,
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      doFlagList: [
        { value: 'DISABLED', label: '禁用' },
        { value: 'ENABLED', label: '启用' },
        { value: 'DELETED', label: '被删除' }
      ],
      deptList: []
    }
  },
  created () {
    this.loadOption()
    this.search()
  },
  methods: {
    loadOption () {
      getDeptOption().then(res => {
        if (res.code === 200) {
          this.deptList = res.data
          this.formData.deptId = res.data[0].value
        }
      })
    },
    search () {
      getRoleList(this.tablePage.pageSize, this.tablePage.currentPage, this.formData).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.datas = res.data.records
        }
      })
    },
    submitEvent () {
      this.search()
    },
    add () {
      this.$router.push('/profile/roleEdit/' + '-1')
    },
    editEvent (row) {
      console.log(row)
      this.$router.push('/profile/roleEdit/' + row.sId)
    },
    delEvent (row) {
      console.log(row)
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.search()
    }
  }
}
</script>
<style>
</style>

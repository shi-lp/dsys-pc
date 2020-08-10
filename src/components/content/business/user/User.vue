<template>
  <div>
    <!-- 查询模块 -->
    <vxe-form :data="formData" title-align="right" title-width="100" @submit="submitEvent">
      <vxe-form-item title="用户编号" field="account" span="8" :item-render="{name: 'input', attrs: {placeholder: '请输入账号'}}"></vxe-form-item>
      <vxe-form-item title="用户名称" field="userName" span="8" :item-render="{name: 'input', attrs: {placeholder: '请输入用户名'}}"></vxe-form-item>
      <vxe-form-item title="用户角色" field="roleId" span="8" :item-render="{name: '$select', options: roleList}"></vxe-form-item>
      <vxe-form-item title="启用状态" field="doFlag" span="8" :item-render="{name: '$select', options: doFlagList}"></vxe-form-item>
      <vxe-form-item title="所属部门" field="deptId" span="8" :item-render="{name: '$select', options: deptList}"></vxe-form-item>
      <vxe-form-item align="left" span="24">
        <vxe-button size="mini" type="submit" status="primary" >查询</vxe-button>
        <vxe-button size="mini" type="reset">重置</vxe-button>
        <vxe-button size="mini" status="primary" @click="add">新增</vxe-button>
      </vxe-form-item>
    </vxe-form>
    <!-- 用户列表 -->
    <vxe-grid export-config :toolbar="tableToolbar" :show-header="true" :data="datas" :stripe="true"
     :border="border" :loading="loading" :align="align" :header-align="headerAlign"
     :highlight-current-row="true"
     :pager-config="tablePage"
     @page-change="handlePageChange"
     >
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column :visible="false" field="sId" title="主键"></vxe-table-column>
      <vxe-table-column title="操作" width="100" show-overflow>
        <template v-slot="{ row }">
          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="delEvent(row)"></vxe-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="account" title="账号" ></vxe-table-column>
      <vxe-table-column field="userName" title="用户名称" ></vxe-table-column>
      <vxe-table-column field="roleName" title="用户角色" ></vxe-table-column>
      <vxe-table-column field="mobilePhone" title="手机号" ></vxe-table-column>
      <vxe-table-column field="eMail" title="邮箱" ></vxe-table-column>
      <vxe-table-column field="doFlag" title="用户状态" :cell-render="{name: 'doFlag'}"></vxe-table-column>
    </vxe-grid>
  </div>
</template>

<script>
import { getUserList, loadRoleOptions } from '@/network/profile/user/user'

export default {
  name: 'User',
  data () {
    return {
      datas: [],
      formData: {
        account: '',
        userName: '',
        roleId: '',
        doFlag: '1',
        deptId: ''
      },
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
        { value: '0', label: '禁用' },
        { value: '1', label: '启用' },
        { value: '2', label: '被删除' }
      ],
      roleList: [
        { value: '', label: '请选择状态' }
      ],
      deptList: [
        { value: '', label: '请选择状态' }
      ]
    }
  },
  created () {
    this.search()
    this.loadOptions()
  },
  methods: {
    search () {
      getUserList(this.tablePage.pageSize, this.tablePage.currentPage, this.formData).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.datas = res.data.records
        }
      })
    },
    loadOptions () {
      loadRoleOptions().then(res => {
        if (res.code === 200) {}
      })
    },
    submitEvent () {
      this.search()
    },
    add () {},
    editEvent (row) {},
    delEvent (row) {},
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

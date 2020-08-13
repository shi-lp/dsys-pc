<template>
  <div>
    <!-- 查询 -->
    <vxe-form :data="searchData" title-align="right" title-width="100" prevent-submit title-colon>
      <vxe-form-item title="部门编号" field="deptCode" span="8" :item-render="{name: 'input', attrs: {placeholder: '请输入部门编码'}}"></vxe-form-item>
      <vxe-form-item title="部门名称" field="deptName" span="8" :item-render="{name: 'input', attrs: {placeholder: '请输入部门名称'}}"></vxe-form-item>
      <vxe-form-item title="启用状态" field="doFlag" span="8" :item-render="{name: '$select', options: doFlagList}"></vxe-form-item>
    </vxe-form>
    <!-- 列表展示 -->
    <vxe-grid export-config :toolbar="tableToolbar" :show-header="true" :data="tableData" :stripe="true"
     :border="border" :loading="loading" :align="align" :header-align="headerAlign"
     :highlight-current-row="true"
     :pager-config="tablePage"
     @page-change="handlePageChange"
     >
     <template v-slot:toolbar_buttons>
        <vxe-button size="mini" status="primary" @click="search">查询</vxe-button>
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
      <vxe-table-column field="deptCode" title="部门编码" ></vxe-table-column>
      <vxe-table-column field="deptName" title="部门名称" ></vxe-table-column>
      <vxe-table-column field="deptContext" title="相关描述" ></vxe-table-column>
      <vxe-table-column field="doFlag" title="启用状态" :cell-render="{name: 'doFlag'}"></vxe-table-column>
    </vxe-grid>
<!-- 编辑查看 -->
    <vxe-modal ref="xModal" v-model="showEdit" title="编辑&保存" width="800" :loading="submitLoading" resize destroy-on-close>
      <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
        <vxe-form-item title="部门信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
        <vxe-form-item title="部门名称" field="deptName" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入部门名称'}}"></vxe-form-item>
        <vxe-form-item title="部门编码" field="deptCode" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入部门编码'}}"></vxe-form-item>
        <vxe-form-item title="部门等级" field="levelNo" span="12" :item-render="{name: 'input', attrs: {placeholder: '部门等级'}}"></vxe-form-item>
        <vxe-form-item title="启用状态" field="doFlag" span="12" :item-render="{name: 'switch', attrs: {onLabel: '启用', offLabel: '禁用'}}">
          <vxe-switch v-model="formDoFlag" on-label="启用" off-label="禁用"></vxe-switch>
        </vxe-form-item>
        <vxe-form-item title="描述" field="deptContext" span="24" :item-render="{name: 'textarea', attrs: {placeholder: '请输入部门描述'}}"></vxe-form-item>
        <vxe-form-item align="center" span="24">
          <vxe-button type="submit" status="primary" >保存</vxe-button>
          <vxe-button type="reset">重置</vxe-button>
          <vxe-button @click="$refs.xModal.close()">取消</vxe-button>
        </vxe-form-item>
      </vxe-form>
    </vxe-modal>
  </div>
</template>

<script>
import { getDeptList, addDept, getDeptOne, codeValidate } from '@/network/profile/dept/dept'

// 校验编码是否存在
const validatePass = (cellValue) => {
  const request = codeValidate(cellValue.itemValue)
  let isShow = false
  return new Promise((resolve, reject) => {
    request.then(res => {
      return new Promise((resolve, reject) => {
        if (!res.data.responseStatus) {
          isShow = !res.data.responseStatus
        }
        // 第er次网络请求
        resolve(isShow)
      })
    }).then(res => {
      if (res) {
        reject(new Error('部门编码已经存在'))
      } else {
        resolve()
      }
    })
  })
}

export default {
  name: 'DeptList',
  data () {
    return {
      searchData: {
        deptCode: '',
        deptName: '',
        doFlag: 'ENABLED'
      },
      formData: {
        deptCode: '',
        deptName: '',
        doFlag: false,
        deptContext: '',
        levelNo: ''
      },
      tableData: [],
      border: true,
      loading: false,
      align: 'center',
      headerAlign: 'center',
      submitLoading: false, // 提交加载
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
      formRules: { // 表单校验规则
        deptName: [
          { required: true, message: '请输入名称' },
          { min: 0, max: 5, message: '长度在 0 到 5 个字符' }
        ],
        deptCode: [
          { required: true, message: '请输入编码' },
          { validator: validatePass }
        ]
      },
      selectRow: null,
      formDoFlag: false,
      showEdit: false // 弹窗显示false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      getDeptList(this.tablePage.currentPage, this.tablePage.pageSize, this.searchData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records
          this.tablePage.total = res.data.total
          this.tablePage.pageSize = res.data.size
          this.tablePage.currentPage = res.data.current
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    search () {
      // 模拟后台接口
      this.loading = true
      this.init()
    },
    add () {
      this.formData = {
        deptCode: '',
        deptName: '',
        doFlag: false,
        deptContext: '',
        levelNo: ''
      }
      this.selectRow = null
      this.showEdit = true
      this.formDoFlag = false
    },
    editEvent (row) {
      this.add()
      getDeptOne(row.sId).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.formData = res.data
          this.formDoFlag = res.data.doFlag === 'ENABLED'
        }
      })
    },
    submitEvent () {
      this.submitLoading = true
      addDept(this.formData).then(res => {
        if (res.code === 200) {
          this.submitLoading = false
          this.showEdit = false
          this.init()
        }
      })
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.init()
    }
  }
}
</script>
<style>
</style>

<template>
  <div>
    <vxe-form :data="formData" :rules="rules" title-align="right" title-width="100" prevent-submit title-colon>
      <vxe-form-item title="角色编号" field="roleCode" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入角色编码'}}"></vxe-form-item>
      <vxe-form-item title="角色名称" field="roleName" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入角色名称'}}"></vxe-form-item>
      <vxe-form-item title="启用状态" field="doFlag" span="12" :item-render="{name: '$select', options: doFlagList}"></vxe-form-item>
      <vxe-form-item title="所属部门" field="deptId" span="12" :item-render="{name: '$select', options: deptList}"></vxe-form-item>
      <vxe-form-item align="right" span="24">
        <vxe-button size="mini" type="submit" status="primary" @click="submitEvent" >保存</vxe-button>
        <vxe-button size="mini" type="reset">重置</vxe-button>
      </vxe-form-item>
    </vxe-form>
    <vxe-table
          show-overflow
          :highlight-current-row="true"
          row-key
          ref="xTree3"
          border="inner"
          :show-header="false"
          :data="tableData"
          :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}">
          <!-- @cell-click="cellClickEvent" -->
          <vxe-table-column type="checkbox" tree-node>
            <template v-slot="{ row }">
              <span>
                <template v-if="row.children && row.children.length">
                  <i class="tree-node-icon fa" :class="$refs.xTree3.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'"></i>
                </template>
                <template v-else>
                  <i class="tree-node-icon fa fa-file-o"></i>
                </template>
                <span>{{ row.authName }}</span>
              </span>
            </template>
          </vxe-table-column>
        </vxe-table>
  </div>
</template>

<script>
import { getAuthList } from '@/network/profile/auth/auth'
import { addRole, validateCodeExist, getRoleOne } from '@/network/profile/role/role'

// 校验编码是否存在
const validatePass = (cellValue) => {
  validateCodeExist(cellValue.itemValue).then((res, reject) => {
    if (res.code === 200) {
      if (res.data) {
        reject('权限编码已经存在')
      }
    }
  }).catch(error => {
    return error
  })
}

export default {
  name: 'RoleEdit',
  data () {
    return {
      tableData: [],
      formData: {
        roleCode: '',
        roleName: '',
        doFlag: '0',
        deptId: '',
        authList: []
      },
      editFlag: false, // 编辑状态，默认非编辑
      doFlagList: [
        { value: '0', label: '禁用' },
        { value: '1', label: '启用' },
        { value: '2', label: '被删除' }
      ],
      deptList: [
        { value: '', label: '请选择部门' }
      ],
      rules: {
        roleCode: [
          { required: true, message: '请输入角色编码' },
          { validator: validatePass }
        ],
        roleName: [
          { required: true, message: '请输入角色名称' }
        ]
      }
    }
  },
  created () {
    // this.initData()
    this.loadTree()
  },
  computed: {
    roleId () {
      return this.$route.params.roleId
    }
  },
  methods: {
    loadTree () {
      getAuthList().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    },
    initData () {
      console.log(this.roleId())
      if (this.roleId()) {
        getRoleOne('').then(res => {
          console.log(res)
          if (res.code === 200) {
            this.formData = res.data
          }
        })
      }
    },
    submitEvent () {
      console.log(this.formData)
      addRole(this.formData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>

<template>
  <div>
    <vxe-form :data="formData" :rules="rules" title-align="right" title-width="100" @submit="submitEvent"  title-colon>
      <vxe-form-item title="角色编号" field="roleCode" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入角色编码'}}"></vxe-form-item>
      <vxe-form-item title="角色名称" field="roleName" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入角色名称'}}"></vxe-form-item>
      <vxe-form-item title="启用状态" field="doFlag" span="12" :item-render="{name: '$select', options: doFlagList}"></vxe-form-item>
      <vxe-form-item title="所属部门" field="deptId" span="12" :item-render="{name: '$select', options: deptList}"></vxe-form-item>
      <vxe-form-item align="right" span="24">
        <el-tree
          :data="tableData"
          show-checkbox
          ref="tree"
          node-key="authCode"
          :default-checked-keys="checked"
          :props="defaultProps">
        </el-tree>
      </vxe-form-item>
      <vxe-form-item align="right" span="24">
        <vxe-button size="mini" type="submit" status="primary" >保存</vxe-button>
        <vxe-button size="mini" type="reset">重置</vxe-button>
      </vxe-form-item>
    </vxe-form>
  </div>
</template>

<script>
import { getAuthList } from '@/network/profile/auth/auth'
import { addRole, validateCodeExist, getRoleOne, getDeptOption } from '@/network/profile/role/role'

// 校验编码是否存在
const validatePass = (cellValue) => {
  const vaildate = validateCodeExist(cellValue.itemValue)
  let isShow = false
  return new Promise((resolve, reject) => {
    vaildate.then(res => {
      return new Promise((resolve, reject) => {
        if (!res.responseStatus) {
          isShow = !res.responseStatus
        }
        // 第er次网络请求
        resolve(isShow)
      }).then(res => {
        if (res) {
          reject(new Error('权限编码已经存在'))
        } else {
          resolve()
        }
      })
    })
  })
}

export default {
  name: 'RoleEdit',
  data () {
    return {
      tableData: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      formData: {
        roleCode: '',
        roleName: '',
        doFlag: 'ENABLED',
        deptId: '',
        authList: []
      },
      editFlag: false, // 编辑状态，默认非编辑
      doFlagList: [
        { value: 'DISABLED', label: '禁用' },
        { value: 'ENABLED', label: '启用' },
        { value: 'DELETED', label: '被删除' }
      ],
      deptList: [],
      rules: {
        roleCode: [
          { required: true, message: '请输入角色编码' },
          { validator: validatePass }
        ],
        roleName: [
          { required: true, message: '请输入角色名称' }
        ]
      },
      roleId: '',
      checked: []
    }
  },
  created () {
    this.roleId = this.$route.params.roleId
    this.loadTree()
    this.loadOption()
    this.initData()
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
    loadTree () {
      getAuthList().then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    },
    initData () {
      if (this.roleId !== '-1') {
        getRoleOne(this.roleId).then(res => {
          if (res.code === 200) {
            this.formData = res.data
            this.checked = res.data.roleAuthList
          }
        })
      }
    },
    submitEvent () {
      this.getCheckedNodes()
      addRole(this.formData, this.checked).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message('保存成功')
          this.$router.go(-1)
        }
      })
    },
    getCheckedNodes () {
      this.checkedKeys = this.$refs.tree.getCheckedNodes()
      this.forMate()
    },
    forMate () {
      const defaultChecked = []
      this.checkedKeys.forEach((item, index, arr) => {
        defaultChecked.push({
          roleCode: this.formData.roleCode,
          authCode: item.authCode
        })
      })
      this.checked = defaultChecked
    }
  }
}
</script>
<style>
</style>

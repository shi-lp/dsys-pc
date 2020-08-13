<template>
  <div class="chat-room mt">
      <aside class="mid-side">
      <vxe-table
          show-overflow
          :highlight-current-row="true"
          row-key
          ref="xTree3"
          border="inner"
          :show-header="false"
          :data="tableData"
          @cell-click="cellClickEvent"
          :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}">
          <vxe-table-column tree-node>
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
          <vxe-table-column title="操作" width="140">
            <template v-slot="{ row }">
              <vxe-button v-if="row.doSide !== '1'" type="text" icon="fa fa-eye" @click="clickRowEvent(row)"></vxe-button>
              <vxe-button v-if="row.doSide !== '1'" type="text" icon="fa fa-edit" @click="editRowEvent(row)"></vxe-button>
              <!-- <vxe-button v-if="row.doSide !== '1'" type="text" icon="fa fa-trash-o" @click="removeRowEvent(row)"></vxe-button> -->
            </template>
          </vxe-table-column>
        </vxe-table>
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button size="mini" status="primary" @click="add" :disabled="addBtn">新增</vxe-button>
          </template>
        </vxe-toolbar>
    </aside>
    <aside class="right-side">
      <vxe-form :data="formData" :rules="rules" title-align="right" title-width="100" @submit="submitEvent">
        <vxe-form-item title="权限模块" field="modelName" span="12" :item-render="{name: 'input', attrs: {readOnly: true}}"></vxe-form-item>
        <vxe-form-item title="权限编号" field="authCode" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入权限编码', readOnly: formEdit}}"></vxe-form-item>
        <vxe-form-item title="权限名称" field="authName" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入权限名称', readOnly: formEdit}}"></vxe-form-item>
        <vxe-form-item title="启用状态" field="doFlag" span="12" :item-render="{name: '$select', options: doFlagList}"></vxe-form-item>
        <vxe-form-item title="权限描述" field="authContext" span="24" :item-render="{name: 'input', attrs: {placeholder: '请输入权限描述', readOnly: formEdit}}"></vxe-form-item>
        <!-- <vxe-form-item title="所属部门" field="deptId" span="12" :item-render="{name: '$select', options: deptList}"></vxe-form-item> -->
        <vxe-form-item align="right" span="24">
          <vxe-button size="mini" type="submit" status="primary" :disabled="saveBtn">保存</vxe-button>
        </vxe-form-item>
      </vxe-form>
    </aside>
    </div>
</template>

<script>
import { getAuthList, addAuth, codeValidate } from '@/network/profile/auth/auth'

// 校验编码是否存在
const validatePass = (cellValue) => {
  codeValidate(cellValue.itemValue).then((res, reject) => {
    if (res.code === 200) {
      if (res.data) {
        reject('权限编码已经存在')
      }
    }
  }).catch(error => {
    return error
  })
}

// 权限信息
export default {
  name: 'AuthInfo',
  data () {
    return {
      tableData: [],
      formEdit: true,
      selectRow: null,
      formData: {
        sId: '',
        authCode: '',
        authName: '',
        doFlag: 'ENABLED',
        modelId: '',
        authContext: '',
        doSide: '0'
      },
      doFlagList: [
        { value: 'DISABLED', label: '禁用' },
        { value: 'ENABLED', label: '启用' },
        { value: 'DELETED', label: '被删除' }
      ],
      rules: {
        authCode: [
          { required: true, message: '请输入权限编码' },
          { validator: validatePass }
        ],
        authName: [
          { required: true, message: '请输入权限名称' }
        ]
      },
      addBtn: true,
      saveBtn: true
    }
  },
  created () {
    this.search()
  },
  methods: {
    search () {
      getAuthList().then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    },
    editRowEvent (row) {
      this.formEdit = false
    },
    cellClickEvent (row) {
      this.selectRow = row.row
      this.formData = {
        authCode: this.selectRow.authCode,
        authName: this.selectRow.authName,
        doFlag: this.selectRow.doFlag,
        modelId: this.selectRow.modelId,
        parentModel: this.selectRow.parentModel,
        authContext: this.selectRow.authContext,
        modelName: this.selectRow.modelName
      }
      if (this.selectRow) {
        if (this.selectRow.doSide === '1' && this.selectRow.parentModel !== '-1') { // 不为顶级菜单
          this.addBtn = false
        } else if (this.selectRow.doSide === '0') { // 下级菜单可以新增
          this.addBtn = false
        } else {
          this.addBtn = true
        }
      } else {
        this.addBtn = true
      }
      this.formEdit = false
      this.saveBtn = true
    },
    add () {
      if (this.selectRow) {
        if (this.selectRow.doSide === '1') { // 为菜单，需要增加菜单下级
          if (this.selectRow.parentModel !== '-1') { // 不为主菜单
            this.formData = {
              authCode: '',
              authName: '',
              doFlag: '0',
              doSide: '0',
              authContext: '',
              modelId: this.selectRow.modelId,
              parentModel: this.selectRow.parentModel,
              modelName: this.selectRow.modelName
            }
            this.formEdit = false
            this.saveBtn = false
          } else {
            this.$XModal.message({ message: '请选择需要菜单', status: 'error' })
          }
        } else { // 增加同级
          this.formData = {
            authCode: '',
            authName: '',
            doFlag: '0',
            doSide: '0',
            authContext: '',
            modelId: this.selectRow.modelId,
            parentModel: this.selectRow.parentModel,
            modelName: this.selectRow.modelName
          }
          this.formEdit = false
          this.saveBtn = false
        }
      } else {
        this.$XModal.message({ message: '请选择需要新增的上级或同级', status: 'error' })
      }
    },
    submitEvent () {
      addAuth(this.formData).then(res => {
        if (res.code === 200) {
          this.$XModal.message({ message: '保存成功', status: 'success' })
        }
      })
      this.search()
    }
  }
}
</script>
<style>
.tree-node-icon {
  width: 24px;
  text-align: center;
}
</style>

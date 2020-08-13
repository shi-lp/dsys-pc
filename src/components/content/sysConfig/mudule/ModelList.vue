<template>
  <div>
    <vxe-grid export-config :toolbar="tableToolbar" :show-header="true" :data="datas" :stripe="stripe"
     :border="border" :loading="loading" :align="align" :header-align="headerAlign"
     :highlight-current-row="true"
     :pager-config="tablePage"
     @page-change="handlePageChange"
     @cell-click="cellClickEvent"
     > <!-- @cell-dblclick="cellDBLClickEvent"
      @cell-context-menu="cellContextMenuEvent"
       @cell-mouseenter="cellMouseenterEvent"
      @cell-mouseleave="cellMouseleaveEvent" -->
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
      <vxe-table-column field="modelName" title="模块名称" ></vxe-table-column>
      <vxe-table-column field="parentName" title="上级名称" ></vxe-table-column>
      <vxe-table-column field="clientType" title="链接类型" >
        <template v-slot="{ row }">
          <div name="clientType"  v-if="row.clientType !== '' || row.clientType !== '1'">{{$store.getters.getDictName(row.clientType)}}</div>
        </template>
      </vxe-table-column>
      <vxe-table-column field="modelUrl" title="地址" ></vxe-table-column>
      <vxe-table-column field="modelNote" title="备注" ></vxe-table-column>
      <vxe-table-column field="modelOrder" title="排序" ></vxe-table-column>
      <vxe-table-column field="doFlag" title="状态" :cell-render="{name: 'doFlag'}"></vxe-table-column>
    </vxe-grid>
<!-- 编辑查看弹窗 -->
    <vxe-modal ref="xModal" v-model="showEdit" title="编辑&保存" width="800" :loading="submitLoading" resize destroy-on-close>
      <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
        <vxe-form-item title="模块信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
        <vxe-form-item title="模块名称" field="modelName" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入模块名称'}}"></vxe-form-item>
        <vxe-form-item title="分类选择" field="parentId" span="12" :item-render="{name: '$select', options: parentList}"></vxe-form-item>
        <vxe-form-item title="链接类型" field="clientType" span="12" :item-render="{name: '$select', options: clientTypeList}"></vxe-form-item>
        <vxe-form-item title="链接地址" field="modelUrl" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入模块链接类型'}}"></vxe-form-item>
        <vxe-form-item title="排序" field="modelOrder" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入排序'}}"></vxe-form-item>
        <vxe-form-item title="启用状态" field="doFlag" span="12" :item-render="{name: 'switch', attrs: {onLabel: '启用', offLabel: '禁用'}}">
          <vxe-switch v-model="formDoFlag" on-label="启用" off-label="禁用"></vxe-switch>
        </vxe-form-item>
        <vxe-form-item title="备注" field="modelNote" span="24" :item-render="{name: 'textarea', attrs: {placeholder: '请输入模块备注'}}"></vxe-form-item>
        <!-- <vxe-form-item title="Date" field="date3" span="12" :item-render="{name: 'input', attrs: {type: 'date', placeholder: '请选择日期'}}"></vxe-form-item> -->
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
import { getModel, getParentOption, updateModel, addModel, delModel } from '@/network/sysConfig/module/model.js'

export default {
  name: 'ModelList',
  components: {
  },
  data () {
    return {
      datas: [],
      stripe: true, // 是否带有斑马纹
      border: true, // 是否有边框
      loading: false, // 表格是否显示加载中
      align: 'center', // 列对其方式
      headerAlign: 'center', // 表头对其方式
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
      selectRow: null,
      formData: null, // 表单数据
      formRules: { // 表单校验规则
        modelName: [
          { required: true, message: '请输入名称' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        parentId: [
          { required: true, message: '请选择上级分类' }
        ]
      },
      parentList: [], // 分类选择列表
      clientTypeList: [], // 链接类型列表
      formDoFlag: false,
      showEdit: false // 弹窗显示false
    }
  },
  created () {
    this.search()
    // 加载下拉
    this.loadOption()
  },
  mounted () {
    this.loading = false
  },
  methods: {
    loadOption () {
      getParentOption().then(res => {
        if (res.code === 200) {
          this.clientTypeList = res.data.clientTypeList
          this.parentList = res.data.parentList
        }
      })
    },
    initData () {
      this.formData = {
        modelName: '',
        parentId: '',
        clientType: '',
        modelUrl: '',
        modelNote: '',
        doFlag: false,
        modelOrder: ''
      }
    },
    search () {
      // 模拟后台接口
      this.loading = true
      getModel(this.tablePage.pageSize, this.tablePage.currentPage).then(res => {
        if (res.code === 200) {
          this.datas = res.data.records
          this.tablePage.total = res.data.total
          this.tablePage.pageSize = res.data.size
          this.tablePage.currentPage = res.data.current
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    add () {
      this.formData = {
        modelName: '',
        parentId: '',
        clientType: '',
        modelUrl: '',
        modelNote: '',
        doFlag: false,
        modelOrder: ''
      }
      this.selectRow = null
      this.showEdit = true
      this.formDoFlag = false
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.search()
    },
    cellClickEvent ({ column }) {
    },
    editEvent (row) {
      this.formData = {
        sId: row.sId,
        modelName: row.modelName,
        parentId: row.parentId,
        clientType: row.clientType,
        modelUrl: row.modelUrl,
        modelNote: row.modelNote,
        doFlag: row.doFlag,
        modelOrder: row.modelOrder
      }
      this.formDoFlag = row.doFlag === '1'
      this.selectRow = row
      this.showEdit = true
    },
    delEvent (row) {
      this.$XModal.confirm('您确定要删除该数据?').then(type => {
        if (type === 'confirm') {
          console.log(row.sId)
          delModel(row.sId).then(res => {
            if (res.code === 200) {
              this.$XModal.message({ message: '删除成功', status: 'success' })
            }
          })
          // 删除逻辑
          // this.$refs.xTable.remove(row)
          this.search()
        }
      })
    },
    submitEvent (row) {
      this.submitLoading = true
      row.data.doFlag = this.formDoFlag ? '1' : '0'
      if (this.selectRow) {
        updateModel(row.data).then(res => {
          if (res.code === 200) {
            this.$XModal.message({ message: '保存成功', status: 'success' })
            Object.assign(this.selectRow, this.formData)
            this.search()
          }
        })
      } else {
        addModel(row.data).then(res => {
          if (res.code === 200) {
            this.$XModal.message({ message: '新增成功', status: 'success' })
            this.search()
          }
        })
      }
      this.search()
      this.submitLoading = false
      this.showEdit = false
    }
  }
}
</script>
<style>
</style>

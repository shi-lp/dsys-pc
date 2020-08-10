<template>
  <div>
    <h4 v-if="editType === 'add'"><i class="fa fa-angle-right"></i>分类新增</h4>
    <h4 v-else-if="editType === 'show'"><i class="fa fa-angle-right"></i>分类查看</h4>
    <div class="row mt">
      <div class="form-group">
        <div class="row form-group">
          <ds-input>
            <label slot="input-text">字典名称</label>
            <input slot="input-box" type="text" class="form-control" v-model="dictName" value="" :disabled="editType === 'show'" />
          </ds-input>
          <ds-input>
            <label slot="input-text">字典编码</label>
            <input slot="input-box" type="text" class="form-control" v-model="dictCode" value="" disabled />
          </ds-input>
        </div>
        <div class="row form-group">
          <ds-input>
            <label slot="input-text">字典值</label>
            <input slot="input-box" type="text" class="form-control" v-model="dictValue" value="" :disabled="editType === 'show'" />
          </ds-input>
          <ds-input>
            <label slot="input-text">字典排序</label>
            <input slot="input-box" type="text" class="form-control" v-model="orderCode" value="" disabled />
          </ds-input>
        </div>
        <div class="row form-group">
          <ds-input>
            <label slot="input-text">备注</label>
          </ds-input>
          <div class="col-sm-10">
            <textarea style="width: 90%" class="form-control" name="message" id="contact-message" :disabled="editType === 'show'" placeholder="请输入备注" rows="5" v-model="note"></textarea>
          </div>
        </div>
        <div class="row form-group">
          <ds-switch :value="doFlag" :handle="editType === 'add'" @changeSwitch="changeSwitch" >
            <label slot="switch-text">启用状态</label>
          </ds-switch>
        </div>
        <div class="row form-group" v-if="editType === 'add'">
          <ds-button>
            <button slot="button-default" class="btn btn-primary" @click="addDictInfoBtn">提交</button>
          </ds-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Switch, Button } from '@/components/common/form/index'
export default {
  name: 'Info',
  components: {
    DsInput: Input,
    DsSwitch: Switch,
    DsButton: Button
  },
  props: {
    editType: {
      type: String,
      default: ''
    }, // 编辑状态 show查看；add新增或编辑
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      sId: '',
      dictName: '',
      dictCode: '',
      dictValue: '',
      orderCode: '',
      doFlag: false,
      note: ''
    }
  },
  watch: { // 初始化数据
    info () {
      this.doFlag = this.info.doFlag === '1'
      this.dictName = this.info.dictName
      this.dictCode = this.info.dictCode
      this.dictValue = this.info.dictValue
      this.orderCode = this.info.orderCode
      this.note = this.info.note
      this.sId = this.info.sId
    }
  },
  methods: {
    changeSwitch (checked) {
      this.doFlag = checked
    },
    addDictInfoBtn () {
      this.$emit('addDictInfoCpn', this.sId, this.dictCode, this.dictName, this.dictValue, this.note, this.orderCode, this.doFlag)
    }
  }
}
</script>
<style>
</style>

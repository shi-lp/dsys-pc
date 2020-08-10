<template>
    <div>
      <h3><i class="fa fa-angle-right"></i>分类新增</h3>
        <div class="row mt">
          <div class="form-group">
            <div class="row form-group">
              <ds-select>
                <label slot="select-text">分类等级</label>
                <select slot="select-box" class="form-control" v-model="cateSelected" @change="onSelect">
                  <option v-for="(item, index) in cateType" :key="index" :value="item.code" >{{item.name}}</option>
                </select>
              </ds-select>
            </div>
            <div class="row form-group level" v-if="levelStyle">
              <ds-select class="firstlevel" v-if="firstlevelStyle">
                <label slot="select-text">一级分类选择</label>
                <select slot="select-box" class="form-control" v-model="cateTypeInOne" @change="onSelectCate('level_1')">
                  <option v-for="(item, index) in cateList1" :key="index" :value="item.code" >{{item.name}}</option>
                </select>
              </ds-select>
              <ds-select class="secondlevel" v-if="secondlevelStyle">
                <label slot="select-text">二级分类选择</label>
                <select slot="select-box" class="form-control" v-model="cateTypeInTwo" @change="onSelectCate('level_2')">
                  <option v-for="(item, index) in cateList2" :key="index" :value="item.code" >{{item.name}}</option>
                </select>
              </ds-select>
            </div>
            <div class="row form-group">
              <ds-input>
                <label slot="input-text">分类编码</label>
                <input slot="input-box" type="text" class="form-control" v-model="cateCode" disabled />
              </ds-input>
              <ds-input>
                <label slot="input-text">分类名称</label>
                <input slot="input-box" type="text" class="form-control" v-model="cateName" value="" />
              </ds-input>
            </div>
            <div class="row form-group">
              <ds-switch :value="doFlag" :handle="false" @changeSwitch="changeSwitch">
                <label slot="switch-text">是否启用</label>
              </ds-switch>
            </div>
            <div class="row form-group">
              <ds-button>
                <button slot="button-default" class="btn btn-primary" type="submit" @click="addCate">提交</button>
              </ds-button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { Input, Button, Select, Switch } from '@/components/common/form/index'
import { addCategory, getCateCode, selectCategory } from '@/network/category/category'

export default {
  name: 'CategoryAdd',
  components: {
    DsInput: Input,
    DsButton: Button,
    DsSelect: Select,
    DsSwitch: Switch
  },
  data () {
    return {
      cateType: [{ code: '', name: '请选择' }, { code: 'level_1', name: '一级分类' }, { code: 'level_2', name: '二级分类' }, { code: 'level_3', name: '三级分类' }],
      cateList1: [], // 选择分类后查询所有列表
      cateList2: [], // 选择分类后查询所有列表
      cateTypeIn: '', // 分类等级选择
      cateTypeInOne: '', // 一级分类等级选择
      cateTypeInTwo: '', // 二级分类选择
      cateSelected: '', // 分类选择值
      parentCode: '', // 父类编码
      cateCode: '', // 分类编码
      cateName: '', // 分类名称
      doFlag: false,
      levelStyle: false, // 设置分类选择模块显示
      firstlevelStyle: false, // 设置一级分类模块显示
      secondlevelStyle: false // 设置二级分类模块显示
    }
  },
  created () {
    this.cateSelected = this.cateType[0].code
  },
  methods: {
    changeSwitch (checked) {
      this.doFlag = checked
    },
    onSelectCate (levelNo) {
      this.cateTypeIn = ''
      if (levelNo === 'level_1') { // 选择二级分类时需要填写父级的一级分类
        this.cateTypeIn = this.cateTypeInOne
        selectCategory('level_2', this.cateTypeIn).then(res => {
          this.cateList2 = res.data
        }).catch(err => {
          console.log(err)
        })
        // 生成分类编码
        if (this.cateSelected === 'level_2') {
          getCateCode(this.cateSelected, this.cateTypeIn).then(res => {
            if (res.code === 200) {
              this.cateCode = res.data
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.cateCode = ''
        }
      } else if (levelNo === 'level_2') { // 选择三级分类，只查询编码
        this.cateCode = ''
        this.cateTypeIn = this.cateTypeInTwo
        // 生成分类编码
        getCateCode(this.cateSelected, this.cateTypeIn).then(res => {
          if (res.code === 200) {
            this.cateCode = res.data
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    onSelect () {
      this.cateCode = ''
      this.cateTypeIn = ''
      if (this.cateSelected === '') {
        this.levelStyle = false
        return false
      }
      if (this.cateSelected === 'level_2') { // 选择二级分类，展示一级分类
        this.levelStyle = true
        this.firstlevelStyle = true
        this.secondlevelStyle = false
        this.parentCode = this.cateTypeInOne
        selectCategory('level_1', this.parentCode).then(res => {
          this.cateList1 = res.data
        }).catch(err => {
          console.log(err)
        })
      } else if (this.cateSelected === 'level_3') { // 选择三级分类，展示一级分类
        this.levelStyle = true
        this.firstlevelStyle = true
        this.secondlevelStyle = true
        // 加载所有的一级分类
        selectCategory('level_1', '').then(res => {
          this.cateList1 = res.data
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.levelStyle = false // 一级分类直接生成编码
        // 生成分类编码
        getCateCode(this.cateSelected, this.parentCode).then(res => {
          if (res.code === 200) {
            this.cateCode = res.data
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    addCate () {
      let state = 0
      if (this.doFlag) {
        state = 1
      }
      addCategory(this.cateTypeIn, this.cateSelected, this.cateCode, this.cateName, state).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style>
</style>

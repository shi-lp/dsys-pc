<template>
  <div class="cus_vtree_wrap" @click.capture="clickNodeWrap">
    <v-tree-item
      :treeDataItem="treeData"
      @clickNodeCom="clickNode"
      :checkBox="checkBox"
      :class="{tree_root_lonely:treeData.length === 1}"
      @toggleCheckBox="checkBoxFun">
    </v-tree-item>
  </div>
</template>
<script>
import VTreeItem from '@/components/common/tree/VTreeItem'

export default {
  name: 'VTree',
  props: {
    treeData: Array,
    checkedResult: Array,
    checkBox: Boolean,
    expandInit: { // 初始化展开
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // treeData: this.treeData
    }
  },
  mounted () {
    this.initData(this.expandInit, true, true)
  },
  updated () {
    this.initData(this.expandInit, true, true)
  },
  methods: {
    initData (expandInit, activeInit, checkedInit) {
      const self = this
      const modifyDataFun = function (datas) {
        if (datas) {
          datas.forEach((m, index) => {
            if (expandInit) {
              self.$set(m, 'expand', true)
            }
            if (activeInit) {
              self.$set(m, 'active', false)
            }
            if (checkedInit) {
              self.$set(m, 'checked', false)
              self.$set(m, 'partchecked', false)
            }
            if (index === datas.length - 1) {
              self.$set(m, 'last', true)
            }
            if (m.children) {
              modifyDataFun(m.children)
            }
          })
        }
      }
      modifyDataFun(this.treeData)
    },
    clickNode (data) {
      this.$emit('clickNode', data)
    },
    clickNodeWrap () {
      this.initData(false, true, false)
    },
    checkBoxFun (item) {},
    getCheckedNodes () {
      const resultArr = []
      const getCheckedNodesFun = (datas) => {
        if (datas) {
          datas.forEach((m) => {
            if (m.checked === true) {
              resultArr.push(m)
            }
            if (m.children) {
              getCheckedNodesFun(m.children)
            }
          })
        }
      }
      getCheckedNodesFun(this.treeData)
      return resultArr
    },
    getRoot () {
      return this.treeData[0]
    },
    findNode (selectedId) {
      let result
      const findNodeFun = (datas) => {
        if (datas) {
          try {
            datas.forEach((m) => {
              if (m.id === selectedId) {
                result = m
                throw new Error('stop')
              }
              if (m.children) {
                findNodeFun(m.children)
              }
            })
          } catch (e) {}
        }
      }
      findNodeFun(this.treeData)
      return result
    },
    setSelectedNode (node, clickDiv) {
      let select
      const setSelectedFun = (datas) => {
        if (datas) {
          datas.forEach((m) => {
            if (m.id === node.id) {
              m.active = true
              select = m
              if (clickDiv) {
                var dom = document.getElementById(m.id)
                if (dom && dom.className.indexOf('cus_item_content') > -1) {
                  dom.click()
                } else {
                  var doms = document.getElementsByClassName(
                    'cus_item_content'
                  )
                  for (let y = 0; y < doms.length; y++) {
                    if (doms[y].id === m.id) {
                      doms[y].click()
                      break
                    }
                  }
                }
              }
            } else {
              m.active = false
            }
            if (m.children) {
              setSelectedFun(m.children)
            }
          })
        }
      }
      setSelectedFun(this.treeData)
      return select
    },
    getSelectedNode () {
      let resultNode = null
      const getSelectedFun = (datas) => {
        if (datas) {
          datas.forEach((m) => {
            if (m.active === true) {
              resultNode = m
              return
            }
            if (m.children) {
              getSelectedFun(m.children)
            }
          })
        }
      }
      getSelectedFun(this.treeData)
      return resultNode
    },
    getParentNode (node) {
      let resultNode = null
      const getParentNode = (datas, parent) => {
        if (datas) {
          try {
            datas.forEach((m) => {
              if (node && m.id === node.id) {
                resultNode = parent
                throw new Error('Stop')
              }
              if (!resultNode && m.children) {
                getParentNode(m.children, m)
              }
            })
          } catch (e) {}
        }
      }
      getParentNode(this.treeData, null)
      return resultNode
    },
    getParentNodesArr (node) {
      const resultArr = []
      let parentNode
      const getParent = (target) => {
        parentNode = this.getParentNode(target)
        if (parentNode) {
          resultArr.push(parentNode)
          getParent(parentNode)
        }
      }
      getParent(node)
      return resultArr
    }
  },
  components: {
    VTreeItem
  }
}
</script>
<style>
.cus_vtree_wrap > ul:first-child {
  background-image: none;
}
ul.cus_tree_ul {
  padding-left: 16px;
  /* background-image: url('../images/index.gif'); */
  background-position: 4px 10px;
  background-repeat: repeat-y;
}
li:last-child > ul.cus_tree_ul:last-child {
  background-image: none;
}
ul.cus_tree_ul li {
  text-align: left;
  cursor: pointer;
  list-style: none;
}
.cus_item_content span.treeExpandBtn {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  background-image: url('../../../assets/img/zTreeStandard.png');
}

.cus_vtree_wrap
  > ul
  > li:first-child
  > .cus_item_content
  > span.treeExpandBtn.butopen {
  background-position: -92px 0px;
}
li .cus_item_content span.treeExpandBtn.butopen {
  background-position: -92px -18px;
}
li:last-child .cus_item_content span.treeExpandBtn.butopen {
  background-position: -92px -36px;
}
.cus_vtree_wrap
  ul.tree_root_lonely
  > li
  > .cus_item_content
  > span.treeExpandBtn.butopen {
  background-position: -92px -54px;
}
.cus_vtree_wrap
  > ul
  > li:first-child
  > .cus_item_content
  > span.treeExpandBtn.btnclose {
  background-position: -74px -0px;
}
li .cus_item_content span.treeExpandBtn.btnclose {
  background-position: -74px -18px;
}
li:last-child .cus_item_content span.treeExpandBtn.btnclose {
  background-position: -74px -36px;
}
.cus_vtree_wrap
  ul.tree_root_lonely
  > li
  > .cus_item_content
  > span.treeExpandBtn.btnclose {
  background-position: -74px -54px;
}
.cus_item_content span.treeExpandBtn.lastLine {
  background-position: -56px -36px;
}
.cus_item_content span.treeExpandBtn.line {
  background-position: -56px -18px;
}
.cus_item_content .cus_chekcbox {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 6px;
  background-image: url('../../../assets/img/zTreeStandard.png');
  background-position: -0px -0px;
}
.cus_item_content .cus_chekcbox.cus_chekcbox_checked {
  background-position: -14px -0px;
}
.cus_item_content .cus_chekcbox.cus_chekcbox_part_checked {
  background-position: 0px -42px;
}
ul.cus_tree_ul li .cus_item_content {
  padding: 4px;
  white-space: nowrap;
  overflow-x: hidden;
}
ul.cus_tree_ul li .cus_item_content:hover {
  background: #8f83e1;
  color: white;
}
ul.cus_tree_ul li .cus_item_content.active {
  background: #7663f8;
  color: white;
}
.folder {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  background-image: url('../../../assets/img/zTreeStandard.png');
  background-position: -110px -0px;
}
.file {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  background-image: url('../../../assets/img/zTreeStandard.png');
  background-position: -110px -30px;
}
</style>

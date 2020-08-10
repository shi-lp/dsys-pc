<template>
  <ul class="cus_tree_ul" :class="{cus_tree_ulLine:(treeDataItem && treeDataItem.length)}">
    <li v-for="(item, index) in treeDataItem" :key="index">
      <div
        class="cus_item_content"
        :title="item.tname"
        @click="clickNode(item)"
        :id="item.id"
        :class="{active:item.active}"
      >
        <span
          class="treeExpandBtn"
          @click.stop="toggleNode(item)"
          :class="{butopen:item.expand && item.children,btnclose:!item.expand && item.children,line: !item.last && !item.children,lastLine:item.last&&!item.children}"
        ></span>
        <span class="tree-icon" :class="item.icon"></span>
        <span
          v-if="checkBox"
          @click="checkBoxClick(item)"
          class="cus_chekcbox"
          :class="{cus_chekcbox_checked:item.checked,cus_chekcbox_part_checked:item.partchecked}"
        ></span>
        {{item.tname}}
      </div>
      <v-tree-item
        :treeDataItem="item.children"
        v-if="item.expand"
        @clickNodeCom="clickNodeCom"
        :checkBox="checkBox"
        :class="{cus_checkbox_allchecked:item.checked}"
        @toggleCheckBox="checkBoxFun(item)"
      ></v-tree-item>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'v-tree-item',
  props: {
    treeDataItem: Array,
    checkBox: Boolean
  },
  methods: {
    clickNode (item) {
      item.active = true
      this.$emit('clickNodeCom', item)
    },
    toggleNode (item) {
      item.expand = !item.expand
      item.active = true
    },
    clickNodeCom (data) {
      this.$emit('clickNodeCom', data)
    },
    checkBoxClick (item) {
      item.partchecked = false
      item.checked = !item.checked
      // 设置子元素是否勾选
      const checkChildFun = (childrenDatas) => {
        childrenDatas.forEach((m) => {
          m.checked = item.checked
          if (m.children) {
            checkChildFun(m.children)
          }
        })
      }
      if (item.children) {
        checkChildFun(item.children)
      }

      this.$emit('toggleCheckBox')
    },
    checkBoxFun (item) {
      let checkedNum = 0
      let partCheckedNum = 0
      item.children.forEach((li) => {
        if (li.checked === true) {
          checkedNum++
        } else if (li.partchecked === true) {
          partCheckedNum++
        }
      })
      if (checkedNum === item.children.length) {
        // 全选
        item.checked = true
        item.partchecked = false
      } else if (checkedNum > 0 || partCheckedNum > 0) {
        // 部分勾选
        item.checked = false
        item.partchecked = true
      } else {
        // 没有勾选
        item.checked = false
        item.partchecked = false
      }
      this.$emit('toggleCheckBox')
    }
  }
}
</script>

<style>
</style>

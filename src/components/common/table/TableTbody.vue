<template>
  <tbody>
    <tr v-for="(item, index) in bodys" :key="index">
      <template v-for="(value, key, tIndex) in item">
        <td v-if="tIndex === 0" :key="tIndex" >
          {{index+1}}
        </td>
        <td v-else :key="tIndex" :class="key">
            {{value}}
        </td>
      </template>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'TableTbody',
  props: {
    bodys: {
      type: Array
    }
  }
}
</script>
<style>
</style>

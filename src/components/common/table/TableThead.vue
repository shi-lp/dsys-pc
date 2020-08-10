<template>
  <thead>
    <tr>
      <template v-for="(value, key, tIndex) in heads">
        <th :key="tIndex" :class="key">
          {{value}}
        </th>
      </template>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'TableThead',
  props: {
    heads: []
  },
  data () {
    return {
    }
  }
}
</script>
<style>
</style>

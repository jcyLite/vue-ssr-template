<template>
  <li class="pot-index-list-group">
    <h2 class="pot-index-list-anchor" v-html="group.name"></h2>
    <ul>
      <slot>
        <pot-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem"></pot-index-list-item>
      </slot>
    </ul>
  </li>
</template>

<script type="text/ecmascript-6">
  import potIndexListItem from './index-list-item.vue'

  const COMPONENT_NAME = 'pot-index-list-group'
  const EVENT_SELECT = 'select'

  export default {
    name: COMPONENT_NAME,
    props: {
      group: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      selectItem(item) {
        this.$emit(EVENT_SELECT, item)
      }
    },
    components: {
      potIndexListItem
    }
  }
</script>

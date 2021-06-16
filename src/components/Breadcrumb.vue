<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in items" :key="item.path">
      <router-link v-if="index === 0" to="/">
        {{ item.meta.title }}
      </router-link>
      <span v-else> {{ item.meta.title }} </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()
    const items = computed(() => route.matched)

    return { items }
  }
}
</script>

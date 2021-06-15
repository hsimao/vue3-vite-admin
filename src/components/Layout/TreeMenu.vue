<template>
  <template v-for="menu in items">
    <el-submenu v-if="isPrimaryItem(menu)" :key="menu._id" :index="menu.path">
      <template #title>
        <i :class="menu.icon" />
        <span>{{ menu.menuName }}</span>
      </template>
      <TreeMenu :items="menu.children" />
    </el-submenu>

    <el-menu-item
      v-else-if="isSubItem(menu)"
      :index="menu.path"
      :key="menu._id"
    >
      {{ menu.menuName }}
    </el-menu-item>
  </template>
</template>

<script>
export default {
  name: 'TreeMenu',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const isPrimaryItem = (menu) => {
      return (
        menu.children &&
        menu.children.length &&
        menu.children[0].menuType === '1'
      )
    }
    const isSubItem = (menu) => menu.menuType === '1'

    return { isPrimaryItem, isSubItem }
  }
}
</script>

<style lang="scss" scoped></style>

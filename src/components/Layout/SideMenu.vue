<template>
  <div class="side" :class="collapseClass">
    <div class="side-logo">
      <img src="@/assets/images/logo.png" alt="Logo" />
      <span>Manager</span>
    </div>

    <el-menu
      class="side-menu"
      default-active="2"
      background-color="#001529"
      text-color="#ffffff"
      router
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-setting" />
          <span>系統管理</span>
        </template>
        <el-menu-item index="1-1">用戶管理</el-menu-item>
        <el-menu-item index="1-2">選單管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template #title>
          <i class="el-icon-setting" />
          <span>審核管理</span>
        </template>
        <el-menu-item index="2-1">休假申請</el-menu-item>
        <el-menu-item index="2-2">待我審核</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'SideMenu',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    console.log('props', props)

    const collapseClass = computed(() => (props.isCollapse ? 'collapse' : ''))

    return { collapseClass }
  }
}
</script>

<style lang="scss" scoped>
.side {
  position: fixed;
  overflow-y: hidden auto;
  width: 200px;
  height: 100vh;
  background-color: $colorBg;
  transition: width 0.5s;

  .side-logo {
    display: flex;
    overflow: hidden;
    align-items: center;
    height: 50px;
    color: $colorWhite;
    font-size: 18px;

    img {
      margin: 0 16px;
      width: 32px;
    }
  }

  .side-menu {
    height: calc(100vh - 50px);
    border-right: none;
  }

  &.collapse {
    width: 64px;
  }
}
</style>

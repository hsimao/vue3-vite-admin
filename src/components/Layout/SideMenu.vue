<template>
  <div class="side" :class="collapseClass">
    <div class="side-logo">
      <img src="@/assets/images/logo.png" alt="Logo" />
      <span>Manager</span>
    </div>

    <el-menu
      class="side-menu"
      :default-active="activeMenu"
      background-color="#001529"
      text-color="#ffffff"
      router
      :collapse="isCollapse"
    >
      <TreeMenu :items="userMenu" />
    </el-menu>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import $api from '@/api'

export default {
  name: 'SideMenu',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const userMenu = ref([])
    const activeMenu = ref(location.hash.slice(1))

    const collapseClass = computed(() => (props.isCollapse ? 'collapse' : ''))

    onMounted(() => {
      getMenuList()
    })
    const getMenuList = async () => {
      const { data } = await $api.getMenuList()
      if (data) {
        userMenu.value = data
      }
    }

    return { activeMenu, userMenu, collapseClass }
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

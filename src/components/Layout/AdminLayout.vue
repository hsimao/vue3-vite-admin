<template>
  <div class="basic-layout">
    <!-- 左側邊欄 -->
    <SideMenu :isCollapse="isCollapse" />

    <!-- 右側內容區 -->
    <div class="content-right" :class="collapseClass">
      <!-- 內容區上方 麵包屑導航、用戶資訊顯示 bar -->
      <Navbar @toggle="isCollapse = !isCollapse" />

      <!-- 每頁內容區 -->
      <div class="wrapper">
        <div class="main-page">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'AdminLayout',
  setup() {
    const isCollapse = ref(false)

    const collapseClass = computed(() => (isCollapse.value ? 'collapse' : ''))

    return { isCollapse, collapseClass }
  }
}
</script>

<style lang="scss" scoped>
.basic-layout {
  position: relative;

  .content-right {
    margin-left: 200px;

    &.collapse {
      margin-left: 64px;
    }

    .nav-top {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 50px;
      border-bottom: 1px solid $colorLine;
      line-height: 50px;
    }

    .wrapper {
      padding: 20px;
      //  50px(nav-side 高度)
      height: calc(100vh - 50px);
      background-color: $colorGray;

      .main-page {
        padding: 20px;
        height: 100%;
        background-color: $colorWhite;
      }
    }
  }
}
</style>

<template>
  <div class="basic-layout">
    <!-- 左側邊欄 -->
    <div class="nav-side"></div>

    <!-- 右側內容區 -->
    <div class="content-right">
      <!-- 內容區上方 麵包屑導航、用戶資訊顯示 bar -->
      <div class="nav-top">
        <div class="bread">麵包屑</div>
        <div class="user-info">用戶</div>
      </div>

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
export default {
  name: 'AdminLayout'
}
</script>

<style lang="scss" scoped>
.basic-layout {
  position: relative;

  .nav-side {
    position: fixed;
    overflow-y: hidden auto;
    width: 200px;
    height: 100vh;
    background-color: $colorPrimary;
    transition: width 0.5s;
  }

  .content-right {
    margin-left: 200px;

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

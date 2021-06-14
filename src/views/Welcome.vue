<template>
  <div class="welcome">
    <div class="content">
      <h2 class="subtitle">歡迎體驗</h2>
      <h1 class="title">通用後台管理系統</h1>
      <div class="desc">- Vue3.0 + ElementPlus + Node + Mongo</div>
    </div>
    <div class="img"></div>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="scss" scoped>
.welcome {
  height: 100%;

  @include flexCenter;

  .content {
    position: relative;
    bottom: 40px;

    .subtitle {
      color: $colorBlack;
      font-size: 30px;
      line-height: 42px;
    }

    .title {
      color: $colorPrimary;
      font-size: 40px;
      line-height: 62px;
    }

    .desc {
      color: $colorBlackLight;
      text-align: right;
      font-size: 14px;
    }
  }

  .img {
    margin-left: 100px;
    width: 371px;
    height: 438px;
    background-image: url('@/assets/images/welcome.png');
  }
}
</style>

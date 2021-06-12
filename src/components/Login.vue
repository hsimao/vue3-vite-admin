<template>
  <h1>Login</h1>
  <el-button @click="goHome">回首頁</el-button>
</template>

<script>
export default {
  name: 'Login',
  async mounted() {
    // const res = await this.$request({
    //   method: 'get',
    //   url: '/login',
    //   data: { username: 'mars' }
    // })
    const res = await this.$request.get('/login', { username: 'mars' })
    console.log(res)
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped></style>

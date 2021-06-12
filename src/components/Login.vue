<template>
  <h1>Login</h1>
  <el-button @click="goHome">回首頁</el-button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>

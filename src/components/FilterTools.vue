<template>
  <div class="filter-tools">
    <el-form :model="formData" inline>
      <!-- 用戶 ID -->
      <el-form-item>
        <el-input v-model="formData.userId" placeholder="請輸入用戶 ID" />
      </el-form-item>

      <!-- 用戶名稱 -->
      <el-form-item>
        <el-input v-model="formData.userName" placeholder="請輸入用戶名稱" />
      </el-form-item>

      <!-- 用戶狀態 -->
      <el-form-item>
        <el-select v-model="formData.state">
          <el-option :value="0" label="所有" />
          <el-option :value="1" label="在職" />
          <el-option :value="2" label="離職" />
          <el-option :value="3" label="適用期" />
        </el-select>
      </el-form-item>

      <!-- 按鈕 -->
      <el-form-item>
        <el-button type="primary">查詢</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'FilterTools',

  setup() {
    const formData = reactive({
      userId: '',
      userName: '',
      state: ''
    })

    return { formData }
  }
}
</script>

<style lang="scss" scoped>
.filter-tools {
  padding: 22px 20px 0;
  border-radius: 5px;
  background-color: #ffffff;
}
</style>

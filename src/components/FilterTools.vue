<template>
  <div class="filter-tools">
    <el-form ref="formRef" :model="query" inline>
      <!-- 用戶 ID -->
      <el-form-item label="用戶 ID" prop="userId">
        <el-input v-model="query.userId" placeholder="請輸入用戶 ID" />
      </el-form-item>

      <!-- 用戶名稱 -->
      <el-form-item label="用戶名稱" prop="userName">
        <el-input v-model="query.userName" placeholder="請輸入用戶名稱" />
      </el-form-item>

      <!-- 用戶狀態 -->
      <el-form-item label="用戶狀態" prop="state">
        <el-select v-model="query.state">
          <el-option :value="0" label="所有" />
          <el-option :value="1" label="在職" />
          <el-option :value="2" label="離職" />
          <el-option :value="3" label="適用期" />
        </el-select>
      </el-form-item>

      <!-- 按鈕 -->
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查詢</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  name: 'FilterTools',
  emits: ['query'],
  setup(props, { emit }) {
    const formRef = ref(null)
    const query = reactive({
      userId: '',
      userName: '',
      state: 0
    })

    const handleQuery = () => {
      emit('query', query)
    }

    const handleReset = () => {
      formRef.value.resetFields()
    }

    return { formRef, query, handleQuery, handleReset }
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

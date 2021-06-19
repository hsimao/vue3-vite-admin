<template>
  <div class="base-table">
    <div class="base-table-action">
      <el-button type="primary">新增</el-button>
      <el-button type="danger">批量刪除</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <!-- 單選複選 -->
      <el-table-column type="selection" />
      <el-table-column
        v-for="column in columns"
        :key="column.userId"
        :prop="column.prop"
        :label="column.label"
      />

      <!-- action -->
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope)">編輯</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope)">
            刪除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分頁 -->
    <el-pagination
      class="base-table-pagination"
      background
      layout="prev, pager, next"
      :page-size="pager.pageSize"
      :total="pager.total"
      :current-page="pager.pageNum"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'BaseTable',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    pager: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 1
        }
      }
    }
  },
  emits: ['pageChange'],
  setup(props, { emit }) {
    const columns = [
      { label: 'ID', prop: 'userId' },
      { label: '用戶名', prop: 'userName' },
      { label: 'Email', prop: 'userEmail' },
      { label: '角色', prop: 'role' },
      { label: '狀態', prop: 'state' },
      { label: '註冊時間', prop: 'createTime' },
      { label: '最後登入時間', prop: 'lastLoginTime' }
    ]

    const tableData = computed(() => props.items)

    const handlePageChange = (page) => {
      emit('pageChange', page)
    }

    return { tableData, columns, handlePageChange }
  }
}
</script>

<style lang="scss" scoped>
.base-table {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background: $colorWhite;

  .base-table-action {
    padding: 20px;
    border-bottom: 1px solid $colorLineLight;
    border-radius: 5px 5px 0px 0px;
    background: $colorWhite;
  }

  .base-table-pagination {
    padding: 10px;
    text-align: right;
  }
}
</style>

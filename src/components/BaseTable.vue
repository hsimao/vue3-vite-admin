<template>
  <div class="base-table">
    <div class="base-table-action">
      <el-button type="primary" @click="$emit('showDialog')">新增</el-button>
      <el-button type="danger" @click="handleDeletePatch">批量刪除</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 單選複選 -->
      <el-table-column type="selection" />
      <el-table-column
        v-for="column in columns"
        :key="column.userId"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :formatter="column.formatter"
      />

      <!-- action -->
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">編輯</el-button>
          <el-button
            v-if="showDelete(scope.row)"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)"
          >
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
import { ref, computed } from 'vue'
import { USER_ROLE_MAP, USER_STATE_MAP } from '@/utils/constant'
import { formatDate } from '@/utils'

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
  emits: ['pageChange', 'delete', 'edit', 'showDialog'],
  setup(props, { emit }) {
    const columns = [
      { label: 'ID', prop: 'userId', width: 100 },
      { label: '用戶名', prop: 'userName', width: 150 },
      { label: 'Email', prop: 'userEmail' },
      { label: '角色', prop: 'role', formatter: formatRole },
      { label: '狀態', prop: 'state', formatter: formatState },
      {
        label: '註冊時間',
        prop: 'createTime',
        width: '150',
        formatter: formatTime
      },
      {
        label: '最後登入時間',
        prop: 'lastLoginTime',
        width: '150',
        formatter: formatTime
      }
    ]
    const selectedUserIds = ref([])

    const tableData = computed(() => props.items)

    function formatRole(row, column, val) {
      return USER_ROLE_MAP[val]
    }

    function formatState(row, column, val) {
      return USER_STATE_MAP[val]
    }

    function formatTime(row, column, val) {
      if (!val) return ''
      return formatDate(val)
    }

    const handlePageChange = (page) => {
      emit('pageChange', page)
    }

    const handleDelete = (item) => {
      emit('delete', [item.userId])
    }

    const showDelete = (item) => {
      return item.state !== 2
    }

    const handleSelectionChange = (selections) => {
      selectedUserIds.value = selections.map((userInfo) => userInfo.userId)
    }

    // 批量刪除
    const handleDeletePatch = () => {
      if (selectedUserIds.value.length === 0) return
      emit('delete', selectedUserIds.value)
    }

    const handleEdit = (item) => {
      emit('edit', item)
    }

    return {
      tableData,
      columns,
      handlePageChange,
      handleSelectionChange,
      showDelete,
      handleDelete,
      handleDeletePatch,
      handleEdit
    }
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

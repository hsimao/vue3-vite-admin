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
          <el-button size="mini" @click="handleEdit(scope)"> 編輯 </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope)">
            刪除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'BaseTable',
  setup() {
    const tableData = ref([
      {
        state: 1,
        role: '0',
        roleList: [
          '60180b07b1eaed6c45fbebdb',
          '60150cb764de99631b2c3cd3',
          '60180b59b1eaed6c45fbebdc'
        ],
        deptId: ['60167059c9027b7d2c520a61', '60167345c6a4417f2d27506f'],
        userId: 1000002,
        userName: 'admin',
        userEmail: 'admin@imooc.com',
        createTime: '2021-01-17T13:32:06.381Z',
        lastLoginTime: '2021-01-17T13:32:06.381Z',
        __v: 0,
        job: '前端架构师',
        mobile: '17611020000'
      }
    ])
    const columns = [
      { label: 'ID', prop: 'userId' },
      { label: '用戶名', prop: 'userName' },
      { label: 'Email', prop: 'userEmail' },
      { label: '角色', prop: 'role' },
      { label: '狀態', prop: 'state' },
      { label: '註冊時間', prop: 'createTime' },
      { label: '最後登入時間', prop: 'lastLoginTime' }
    ]

    return { tableData, columns }
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

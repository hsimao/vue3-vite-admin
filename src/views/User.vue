<template>
  <div class="user">
    <!-- filter tools area -->
    <FilterTools @query="handleQuery" />

    <!-- table list -->
    <BaseTable
      :items="userList"
      :pager="pager"
      @pageChange="updatePage"
      @delete="deleteUsers"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import $api from '@/api'
import { PAGE_SIZE } from '@/utils/constant.js'
import { ElMessage } from 'element-plus'

export default {
  name: 'User',
  setup() {
    const userList = ref([])
    let cacheParams = reactive({})
    const pager = reactive({
      pageNum: 1,
      pageSize: PAGE_SIZE
    })

    onMounted(() => {
      getUserList()
    })

    const getUserList = async (query = false) => {
      let params = {
        pageNum: pager.pageNum,
        pageSize: pager.pageSize
      }

      if (query) {
        params = { ...query, ...params }
      }

      const { data } = await $api.getUserList(params)
      if (data) {
        cacheParams = params

        userList.value = data.list
        pager.total = data.page.total
      }
    }

    const handleQuery = (query) => {
      initPager()
      getUserList(query)
    }

    const initPager = () => {
      pager.pageNum = 1
      pager.pageSize = PAGE_SIZE
    }

    const updatePage = (page) => {
      pager.pageNum = page
      getUserList({ ...cacheParams, pageNum: page })
    }

    const deleteUsers = async (userIds) => {
      const { data, msg } = await $api.deleteUsers(userIds)

      if (data?.modified >= 1) {
        ElMessage.success(msg)
        handleQuery(cacheParams)
      } else {
        ElMessage.error(msg)
      }
    }

    return { userList, pager, handleQuery, updatePage, deleteUsers }
  }
}
</script>

<style lang="scss" scoped></style>

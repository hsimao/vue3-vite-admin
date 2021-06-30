<template>
  <div class="user">
    <!-- filter tools area -->
    <FilterTools @query="handleQuery" />

    <!-- table list -->
    <BaseTable
      :items="userList"
      :pager="pager"
      @pageChange="updatePage"
      @showDialog="updateShowDialog(true)"
      @edit="updateSelectUser"
      @delete="deleteUsers"
    />
    <UserDialog
      :active="showDialog"
      :userData="selectedUser"
      @success="getUserListByCache"
      @close="updateShowDialog(false)"
    />
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import $api from '@/api'
import { PAGE_SIZE } from '@/utils/constant.js'
import { ElMessage } from 'element-plus'

export default {
  name: 'User',
  setup() {
    const userList = ref([])
    const selectedUser = ref({})
    const showDialog = ref(false)
    let cacheParams = reactive({})
    const pager = reactive({
      pageNum: 1,
      pageSize: PAGE_SIZE
    })

    watch(showDialog, (val) => {
      if (!val) {
        initSelectUser()
      }
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

    const getUserListByCache = () => {
      getUserList({ ...cacheParams })
    }

    const deleteUsers = async (userIds) => {
      const { data, msg } = await $api.deleteUsers(userIds)

      if (data?.nModified >= 1) {
        ElMessage.success(msg)
        getUserListByCache()
        handleQuery(cacheParams)
      }
    }

    const updateShowDialog = (status) => {
      showDialog.value = status
    }

    const updateSelectUser = (userData) => {
      selectedUser.value = userData
      updateShowDialog(true)
    }

    const initSelectUser = () => {
      selectedUser.value = {}
    }

    return {
      showDialog,
      selectedUser,
      userList,
      pager,
      handleQuery,
      updatePage,
      deleteUsers,
      updateShowDialog,
      updateSelectUser,
      getUserListByCache
    }
  }
}
</script>

<style lang="scss" scoped></style>

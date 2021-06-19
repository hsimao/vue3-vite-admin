<template>
  <div class="user">
    <!-- filter tools area -->
    <FilterTools @query="handleQuery" />

    <!-- table list -->
    <BaseTable :items="userList" :pager="pager" @pageChange="updatePage" />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import $api from '@/api'
import { PAGE_SIZE } from '@/utils/constant.js'

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

    return { userList, pager, handleQuery, updatePage }
  }
}
</script>

<style lang="scss" scoped></style>

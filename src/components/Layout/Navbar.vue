<template>
  <div class="navbar">
    <div class="navbar-bread">
      <i class="el-icon-s-fold" @click="$emit('toggle')" />
      <Breadcrumb />
    </div>
    <div class="navbar-user-info">
      <el-badge class="navbar-notice" type="danger" :value="noticeCount">
        <i class="el-icon-bell" />
      </el-badge>

      <el-dropdown @command="handlLogout" v-if="userInfo">
        <span class="navbar-user-link">
          {{ userInfo.userName }}
          <i class="el-icon--right" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="email"
              >Eamil: {{ userInfo.userEmail }}</el-dropdown-item
            >
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import $api from '@/api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const userInfo = ref(null)
    const noticeCount = ref(0)

    const store = useStore()
    const router = useRouter()

    onMounted(() => {
      userInfo.value = store.state.userInfo
      getNoticeCount()
    })

    const getNoticeCount = async () => {
      const { data } = await $api.getNoticeCount()
      if (data) {
        noticeCount.value = data
      }
    }

    const handlLogout = (command) => {
      if (command === 'logout') {
        store.commit('setUserInfo', '')
        userInfo.value = null
        router.push('/login')
      }
    }

    return {
      userInfo,
      handlLogout,
      noticeCount
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  height: 50px;
  border-bottom: 1px solid $colorLine;
  line-height: 50px;

  .navbar-bread {
    display: flex;
    align-items: center;

    i {
      margin-right: 16px;
      font-size: 18px;
    }
  }

  .navbar-user-info {
    .navbar-notice {
      margin-right: 16px;
      line-height: 30px;
    }
  }

  .navbar-user-link {
    color: $colorPrimary;
    cursor: pointer;
  }
}
</style>

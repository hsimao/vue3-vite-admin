<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="formRef" :model="user" status-icon :rules="rules">
        <h1 class="title">管理系統</h1>

        <el-form-item prop="userName">
          <el-input
            v-model="user.userName"
            type="text"
            prefix-icon="el-icon-user"
          />
        </el-form-item>

        <el-form-item prop="userPassword">
          <el-input
            v-model="user.userPassword"
            type="password"
            prefix-icon="el-icon-view"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="submit"
            >登錄</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import $api from '../api'
import { ElMessage } from 'element-plus'

export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()
    const formRef = ref(null)
    const user = reactive({
      userName: '',
      userPassword: ''
    })

    const rules = {
      userName: [
        {
          required: true,
          message: '請輸入用戶名',
          trigger: 'blur'
        }
      ],
      userPassword: [
        {
          required: true,
          message: '請輸入密碼',
          trigger: 'blur'
        }
      ]
    }

    const submit = () => {
      formRef.value.validate(async (valid) => {
        if (!valid) return

        const { data } = await $api.login(user)

        if (data) {
          store.commit('setUserInfo', data)
          ElMessage.success('登入成功！')
          router.push('/welcome')
        } else {
          ElMessage.error('帳號或密碼錯誤！')
        }
      })
    }

    return { formRef, user, rules, submit }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: $colorGray;

  @include flexCenter;

  .modal {
    padding: 50px;
    width: 500px;
    border-radius: 4px;
    background-color: $colorWhite;
    box-shadow: 0px 0px 8px 3px rgba(black, 0.05);

    .title {
      margin-bottom: 30px;
      text-align: center;
      font-size: 50px;
      line-height: 1.5;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>

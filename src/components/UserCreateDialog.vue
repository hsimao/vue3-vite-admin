<template>
  <el-dialog :model-value="active" title="新增用戶" @close="$emit('close')">
    <el-form ref="formRef" :model="userForm" :rules="rules" label-width="100px">
      <el-form-item label="用戶名" prop="userName">
        <el-input v-model="userForm.userName" placeholder="請輸入用戶名稱" />
      </el-form-item>

      <el-form-item label="信箱" prop="userEmail">
        <el-input v-model="userForm.userEmail" placeholder="請輸入信箱">
          <template #append>@gmail.com</template>
        </el-input>
      </el-form-item>

      <el-form-item label="手機" prop="mobile">
        <el-input v-model="userForm.mobile" placeholder="請輸入手機" />
      </el-form-item>

      <el-form-item label="職務名稱" prop="job">
        <el-input v-model="userForm.job" placeholder="請輸入職務名稱" />
      </el-form-item>

      <el-form-item label="狀態" prop="state">
        <el-select v-model="userForm.state">
          <el-option
            v-for="state in stateList"
            :key="state.id"
            :value="state.id"
            :label="state.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="系統角色" prop="ruleList">
        <el-select
          v-model="userForm.ruleList"
          multiple
          placeholder="請選擇用戶的系統角色"
          style="width: 100%"
        >
          <el-option
            v-for="rule in ruleList"
            :key="rule._id"
            :value="rule._id"
            :label="rule.roleName"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="部門" prop="deptId">
        <el-cascader
          v-model="userForm.deptId"
          placeholder="請選擇所屬部門"
          :options="deptList"
          :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
          clearable
          style="width: 100%"
        />
      </el-form-item>

      <pre>{{ userForm }}</pre>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubbmit">
          確定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { USER_STATE_MAP, EMAIL_SUFFIX } from '@/utils/constant'
import { ref, reactive, computed, onMounted, toRaw } from 'vue'
import $api from '@/api'
import { ElMessage } from 'element-plus'

export default {
  name: 'UserCreateDialog',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const formRef = ref(null)
    const loading = ref(false)
    const stateList = computed(() => {
      return Object.keys(USER_STATE_MAP).map((key) => ({
        id: key,
        value: USER_STATE_MAP[key]
      }))
    })

    const deptList = ref([])
    const ruleList = ref([])
    const userForm = reactive({
      userName: '',
      userEmail: '',
      mobile: '',
      job: '',
      state: stateList.value[2].id,
      ruleList: [],
      deptId: []
    })

    const rules = {
      userName: [
        {
          required: true,
          message: '請輸入用戶名',
          trigger: 'blur'
        }
      ],
      userEmail: [
        {
          required: true,
          message: '請輸入用戶信箱',
          trigger: 'blur'
        }
      ],
      mobile: [
        {
          pattern: /^09\d{8}$/,
          message: '手機格式錯誤',
          trigger: 'blur'
        }
      ],
      deptId: [
        {
          required: true,
          message: '請選擇所屬部門',
          trigger: 'blur'
        }
      ]
    }

    const getDeptList = async () => {
      const { data } = await $api.getDeptList()
      if (data && data.length) {
        deptList.value = data
      }
    }

    const getRoleList = async () => {
      const { data } = await $api.getRoleList()
      if (data && data.length) {
        ruleList.value = data
      }
    }

    const handleCancel = () => {
      formRef.value.resetFields()
      emit('close')
    }

    const getParams = () => {
      // toRaw 將 userForm 變成普通的物件
      const params = JSON.parse(JSON.stringify(toRaw(userForm)))
      params.userEmail += EMAIL_SUFFIX
      return params
    }

    const handleSubbmit = () => {
      formRef.value.validate(async (valid) => {
        if (!valid) return
        loading.value = true
        const res = await $api.createUser(getParams())
        loading.value = false
        if (res.data) {
          ElMessage.success('成功新增用戶')
          handleCancel()
          emit('success')
        }
      })
    }

    onMounted(() => {
      getDeptList()
      getRoleList()
    })

    return {
      formRef,
      loading,
      userForm,
      stateList,
      deptList,
      ruleList,
      rules,
      handleCancel,
      handleSubbmit,
      EMAIL_SUFFIX
    }
  }
}
</script>

<style lang="scss" scoped></style>

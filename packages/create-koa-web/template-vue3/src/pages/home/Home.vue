<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center bg-blue-50"
  >
    <h1 class="font-bold text-3xl -mt-32 mb-8">主页Home</h1>
    <el-form class="w-96 bg-white px-8 py-10">
      <el-form-item>
        <el-input
          v-model.trim="username"
          placeholder="请输入用户名"
          class="h-10"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model.trim="password"
          placeholder="请输入密码"
          class="h-10"
        />
      </el-form-item>
      <el-button
        type="primary"
        class="w-full h-10"
        @click="userLogin"
        v-loading="loading"
        >登 录</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let username = ref<string>()
let password = ref<string>()
let loading = ref<boolean>(false)

let userLogin = () => {
  console.log('用户登录')
}
</script>

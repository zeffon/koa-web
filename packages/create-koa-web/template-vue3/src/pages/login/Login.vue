<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center bg-blue-50"
  >
    <h1 class="font-bold text-3xl -mt-32 mb-8 tracking-wider">欢迎登录</h1>
    <a-form class="w-96 bg-white px-8 py-10">
      <a-form-item>
        <a-input
          v-model.trim="username"
          placeholder="请输入用户名"
          class="h-10"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          v-model.trim="password"
          placeholder="请输入密码"
          class="h-10"
        />
      </a-form-item>
      <a-button
        @click="userLogin"
        :loading="loading"
        type="primary"
        size="large"
        class="w-full"
        >登 录</a-button
      >
    </a-form>
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

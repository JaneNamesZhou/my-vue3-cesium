<template>
  <n-message-provider>
    <div class="login-container">
      <div class="login-card">
        <h2 class="login-title">欢迎登陆</h2>
        <n-form :model="form" class="login-form">
          <n-form-item path="username">
            <n-input v-model:value="form.username" placeholder="请输入您的用户名" />
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="form.password"
              type="password"
              placeholder="请输入您的密码"
              show-password-on="click"
            />
          </n-form-item>
          <div class="form-options">
            <n-checkbox v-model:checked="remember">记住密码</n-checkbox>
            <a class="forgot-password" href="#">忘记密码？</a>
          </div>
          <n-button type="primary" block class="login-button" @click="handleLogin">
            安全登录
          </n-button>
          <div class="register-text">还没有账号？<a href="#">立即注册</a></div>
        </n-form>
      </div>
    </div>
  </n-message-provider>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router"; // ✅ 引入路由

const router = useRouter(); // ✅ 获取 router 实例

const form = ref({
  username: "",
  password: "",
});
const remember = ref(false);

const message = useMessage();

const handleLogin = () => {
  if (!form.value.username || !form.value.password) {
    message.warning("请输入用户名和密码");
    return;
  }

  message.success(`欢迎，${form.value.username}`);

  // ✅ 跳转到指定路由，比如 "/home"
  setTimeout(() => {
    router.push({ name: "ServicePlatformDashboard" });
  }, 800); // 等提示动画显示完再跳转
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a0080, #0b40b3);
}

.login-card {
  background-color: #0a0938;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  width: 350px;
  color: #fff;
}

.login-title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #ffffff;
}

.login-form :deep(.n-input) {
  background-color: #116b9f;
  color: white;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 20px;
  font-size: 14px;
}

.forgot-password {
  color: #88c7ff;
  text-decoration: none;
}

.login-button {
  background-color: #3bc1f4;
  font-weight: bold;
  margin-bottom: 10px;
}

.register-text {
  text-align: center;
  font-size: 13px;
  margin-top: 10px;
  color: #ccc;
}

.register-text a {
  color: #00bfff;
  text-decoration: none;
}
</style>

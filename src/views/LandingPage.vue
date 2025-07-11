<template>
  <div class="background">
    <div class="overlay" />
    <div class="center-buttons">
      <router-link :to="{ name: 'LoginPage' }" class="nav-button">
        某某服务平台大屏
      </router-link>
      <router-link :to="{ name: 'DocsLayout' }" class="nav-button">文档说明</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需逻辑
</script>

<style scoped>
.background {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 可选：背景遮罩，提升按钮对比度 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 0;
}

/* 按钮容器 */
.center-buttons {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

/* 路由按钮 */
.nav-button {
  padding: 12px 28px;
  background-color: #007acc;
  color: white;
  text-decoration: none;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-button:hover {
  background-color: #005f99;
  transform: translateY(-2px);
}

/* 小屏支持 */
@media (max-width: 600px) {
  .nav-button {
    font-size: 16px;
    padding: 10px 20px;
  }
}
</style>

<template>
  <div>
    <!-- 顶部导航 -->
    <div class="header">
      <div class="logo-area">
        <img src="@/assets/logo.png" alt="Logo" />
        <span>某某服务平台大屏</span>
      </div>
      <ul class="menu">
        <li><a href="#">首页</a></li>
        <li><a href="#">平台中心</a></li>
        <li><a href="#">系统设置</a></li>
      </ul>
    </div>

    <!-- 主体区域 -->
    <div class="container">
      <div class="sidebar">
        <ul>
          <li><a href="#">子菜单1</a></li>
          <li><a href="#">子菜单2</a></li>
          <li><a href="#">子菜单3</a></li>
        </ul>
      </div>
      <div class="content">
        <h2>正文内容区域</h2>
        <p>这里是内容展示区。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需 JS 逻辑
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

/* 顶部 header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004080;
  color: white;
  padding: 15px 30px;
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo-area img {
  height: 40px;
  margin-right: 10px;
}

.logo-area span {
  font-size: 20px;
  font-weight: bold;
}

.menu {
  display: flex;
  list-style: none;
}

.menu li {
  margin-left: 30px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.menu a:hover {
  text-decoration: underline;
}

/* 页面主体部分 */
.container {
  display: flex;
  height: calc(100vh - 70px); /* header 高度 */
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
}

.content {
  flex: 1;
  padding: 20px;
}

.sidebar ul {
  list-style: none;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a {
  text-decoration: none;
  color: #333;
}

.sidebar a:hover {
  color: #007acc;
}
</style>

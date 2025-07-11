<template>
  <n-layout has-sider style="height: 100vh">
    <n-layout-sider width="200" bordered>
      <n-menu :options="menuOptions" :value="activeKey" @update:value="handleMenuClick" />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <MarkdownViewer :page="activeKey" />
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { NMenu, NLayout, NLayoutSider, NLayoutContent } from "naive-ui";
import MarkdownViewer from "@/components/MarkdownViewer.vue";

const router = useRouter();
const route = useRoute();

const menuOptions = [
//   { label: "简介", key: "intro" },
  { label: "大屏系统说明", key: "dashboardIntro" },
  { label: "Cesium优化", key: "cesiumOptimize" },
  { label: "待实现功能", key: "toDo" }, 
];

const activeKey = ref(route.params.page || "intro");

// 跳转路由
const handleMenuClick = (key) => {
  activeKey.value = key;
  router.push({ name: "DocsLayout", params: { page: key } });
};

// 同步 URL 路由变化
watch(
  () => route.params.page,
  (val) => {
    activeKey.value = val || "intro";
  }
);
</script>

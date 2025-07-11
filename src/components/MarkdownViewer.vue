<template>
  <div v-if="loading">加载中...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else v-html="renderedHtml" class="markdown-body"></div>
</template>

<script setup>
import { ref, watch, computed, defineProps } from "vue";
import { marked } from "marked";

const props = defineProps({
  page: {
    type: String,
    default: "intro",
  },
});

const markdown = ref("");
const loading = ref(false);
const error = ref("");

const loadMarkdown = async (page) => {
  loading.value = true;
  error.value = "";
  if (!page) page = "intro";
  try {
    const file = await import(`../docs/${page}.md?raw`);
    markdown.value = typeof file === "string" ? file : file.default || "";
  } catch (err) {
    error.value = "文档加载失败";
    markdown.value = "# 文档更新中...";
  } finally {
    loading.value = false;
  }
};

const renderedHtml = computed(() => marked.parse(markdown.value));

watch(
  () => props.page,
  (val) => {
    loadMarkdown(val);
  },
  { immediate: true }
);
</script>

<style scoped>
.markdown-body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", sans-serif;
  line-height: 1.7;
  padding: 16px;
  background-color: #fff;
  border-radius: 6px;
}

.error {
  color: red;
  padding: 16px;
  background-color: #fee;
  border-radius: 6px;
}
</style>

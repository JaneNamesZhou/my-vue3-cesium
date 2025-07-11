<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-xl font-bold text-center">音频路径检测工具</h2>

    <n-input
      v-model:value="audioPath"
      placeholder="请输入音频路径，如 /audio/kunjiao.mp3"
    />

    <div class="flex justify-center gap-4">
      <n-button @click="testAudio" type="primary">测试播放</n-button>
      <n-button @click="resetAudio" secondary>重置</n-button>
    </div>

    <audio
      ref="audioRef"
      :src="audioPath"
      @error="onAudioError"
      @canplay="onAudioSuccess"
      hidden
    />

    <div class="text-center mt-4">
      <span v-if="status === 'success'" class="text-green-600"
        >✅ 音频加载成功，可以播放！</span
      >
      <span v-else-if="status === 'error'" class="text-red-600"
        >❌ 音频加载失败，请检查路径或文件</span
      >
      <span v-else class="text-gray-500">📂 等待测试</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NInput, NButton } from "naive-ui";

const audioPath = ref("");
const audioRef = ref(null);
const status = ref("idle"); // idle, success, error

function testAudio() {
  status.value = "idle";
  if (audioRef.value) {
    audioRef.value.pause();
    audioRef.value.currentTime = 0;
    // 强制重新加载
    audioRef.value.load();
    // 尝试播放
    audioRef.value.play().catch(() => {
      // 某些浏览器必须用户交互后才能播放
    });
  }
}

function resetAudio() {
  status.value = "idle";
  audioPath.value = "";
  if (audioRef.value) {
    audioRef.value.pause();
    audioRef.value.src = "";
  }
}

function onAudioSuccess() {
  status.value = "success";
}

function onAudioError() {
  status.value = "error";
}
</script>

<style scoped></style>

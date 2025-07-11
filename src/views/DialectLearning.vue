<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <n-card class="w-[320px] shadow-xl rounded-2xl" :title="`卡片 ${currentIndex + 1}`">
      <!-- 显示问题 -->
      <div class="text-lg font-semibold text-center min-h-[60px]">
        {{ currentCard.question }}
      </div>

      <!-- 音频播放按钮 -->
      <div class="mt-4 text-center">
        <n-button @click="playAudio" secondary type="success">
          播放音频
        </n-button>
      </div>

      <!-- 显示答案 -->
      <div v-if="showAnswer" class="text-green-600 mt-4 text-center">
        答案：{{ currentCard.answer }}
      </div>

      <!-- 控制按钮 -->
      <div class="mt-6 flex justify-between">
        <n-button @click="toggleAnswer" secondary type="info">
          {{ showAnswer ? '隐藏答案' : '显示答案' }}
        </n-button>
        <n-button @click="nextCard" secondary type="primary">
          下一个
        </n-button>
      </div>
      <!-- 隐藏的 audio 元素 -->
      <audio ref="audioRef" :src="currentCard.audio" preload="auto"></audio>
    </n-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NCard, NButton } from 'naive-ui'

// 👉 只维护 mp3 文件名（无需写问题、答案）
const filenames = [
  'hello.mp3',
  'pantou.mp3',
  'anun.mp3',
  'buxing.mp3'
]

// 自动根据文件名生成卡片
function filenameToCard(name) {
  const displayName = name.replace('.mp3', '')
  return {
    question: `兴化方言：${displayName}`, // 你也可以把这里替换成中文注释或字典映射
    answer: '', // 可留空或以后加入字典映射
    audio: `/audio/${name}`
  }
}

const cards = ref(filenames.map(filenameToCard))

// 当前播放的索引和状态
const currentIndex = ref(Math.floor(Math.random() * cards.value.length))
const showAnswer = ref(false)
const audioRef = ref(null)

const currentCard = computed(() => cards.value[currentIndex.value])

function toggleAnswer() {
  showAnswer.value = !showAnswer.value
}

function nextCard() {
  const randomIndex = Math.floor(Math.random() * cards.value.length)
  currentIndex.value = randomIndex
  showAnswer.value = false
}

function playAudio() {
  if (audioRef.value) {
    audioRef.value.currentTime = 0
    audioRef.value.play()
  }
}
</script>

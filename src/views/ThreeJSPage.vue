<template>
  <canvas ref="canvasRef" class="webgl"></canvas>
</template>

<script setup>
/* eslint-disable */
import { onMounted, ref } from "vue";
import * as THREE from "three";

const canvasRef = ref(null);

onMounted(() => {
  // 1. 创建场景
  const scene = new THREE.Scene();

  // 2. 创建立方体（几何体 + 材质 + 网格模型）
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 单位立方体
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 3. 创建相机（fov, aspect, near, far）
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(3, 3, 3); // 远一点，能看到整个原点区域
  camera.lookAt(0, 0, 0); // 看向原点

  // 4. 坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  // 光源设置

  // 5. 创建渲染器
  const canvas = canvasRef.value;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 抗锯齿
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x222222); // 设置为深灰背景

  renderer.render(scene, camera); // 渲染一次
});
</script>

<style scoped>
.webgl {
  width: 100vw;
  height: 100vh;
  display: block;
}
</style>

<template>
  <div>
    <div style="position: absolute; top: 10px; left: 10px; z-index: 999">
      <router-link to="/home"><button>首页</button></router-link>
      <router-link to="/map"><button>地图</button></router-link>
      <router-link to="/about"><button>关于</button></router-link>
    </div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from "cesium";
import "./Widgets/widgets.css";
import { onMounted } from "vue";

window.CESIUM_BASE_URL = "/";

onMounted(() => {
  new Cesium.Viewer("cesiumContainer");
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
button {
  margin-right: 10px;
  padding: 6px 12px;
  border: none;
  background-color: #007acc;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background-color: #005f99;
}
</style>

<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
  import * as Cesium from 'cesium'
  import "./Widgets/widgets.css"
  import { onMounted } from 'vue';

  window.CESIUM_BASE_URL = "/";

  onMounted(()=>{
    new Cesium.Viewer("cesiumContainer");
  })
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
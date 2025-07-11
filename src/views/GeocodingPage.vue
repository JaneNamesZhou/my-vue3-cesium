<template>
  <div class="geo-map">
    <h2>📍 地理编码 + 高德地图展示</h2>

    <div class="search-bar">
      <input v-model="address" placeholder="请输入地址（例如：上海市徐汇区）" />
      <button @click="search" :disabled="loading">
        {{ loading ? "查询中..." : "查询" }}
      </button>
    </div>
    <!-- 新增的坐标显示框 -->
    <div class="coordinate-display">
      <label>坐标：</label>
      <input type="text" v-model="coordinates" readonly placeholder="查询后显示经纬度" />
    </div>

    <div id="mapContainer" class="map"></div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { ref, onMounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

declare const AMap: any;

const address = ref("上海市");
const loading = ref(false);

let map: AMap.Map | null = null;
let marker: AMap.Marker | null = null;

const key = "55323284f877424135064979b3c3718b"; // 高德 Key

onMounted(async () => {
  await AMapLoader.load({
    key,
    version: "2.0",
    plugins: ["AMap.Geocoder"],
  });

  map = new AMap.Map("mapContainer", {
    viewMode: "3D",
    zoom: 10,
    center: [121.4737, 31.2304],
  });

  marker = new AMap.Marker({
    map,
    position: [121.4737, 31.2304],
    title: "默认位置",
  });
});

const search = async () => {
  if (!address.value.trim()) {
    alert("请输入有效地址～");
    return;
  }

  loading.value = true;
  console.log("address:", address.value);
  try {
    const res = await fetch(
      `https://restapi.amap.com/v3/geocode/geo?key=${key}&address=${encodeURIComponent(
        address.value
      )}`
    );

    const data = await res.json();
    console.log("data:", data);
    if (data.status === "1" && data.geocodes.length > 0) {
      const [lng, lat] = data.geocodes[0].location.split(",");
      const location = new AMap.LngLat(lng, lat);
      map?.setCenter(location);
      marker.setPosition(location);
      map.add(marker);
      map.setFitView(marker);
    } else {
      alert("地址解析失败，请输入更详细地址（如省市区街道）");
    }
  } catch (err) {
    console.error("地理编码失败:", err);
    alert("地理编码请求失败，请检查网络或API Key");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.geo-map {
  padding: 20px;
  max-width: 100%;
}

.search-bar {
  margin-bottom: 10px;
}

input {
  padding: 8px;
  width: 250px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 14px;
  background-color: #007acc;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.map {
  width: 100%;
  height: 790px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>

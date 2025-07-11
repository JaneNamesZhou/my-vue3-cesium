# 🌍 Cesium 介绍

Cesium 是一个开源的 JavaScript 三维地球和地图引擎，基于 WebGL 实现，广泛应用于数字孪生、虚拟仿真、智慧城市等领域。

---

## 🧭 基本信息

- **名称**：CesiumJS
- **官网**：[https://cesium.com](https://cesium.com)
- **GitHub**：[https://github.com/CesiumGS/cesium](https://github.com/CesiumGS/cesium)
- **许可证**：Apache 2.0 开源协议
- **平台**：Web（支持主流浏览器）

---

## 🧩 核心特点

| 特性                 | 描述                                                                 |
|----------------------|----------------------------------------------------------------------|
| 🌐 三维地球渲染       | 可视化全球地形、影像、3D Tiles 模型等                                 |
| 🗺️ 多源地图数据支持   | 支持 WMS、WMTS、GeoJSON、CZML、KML、3D Tiles、glTF 等                  |
| 📦 大规模模型加载     | 使用 3D Tiles 格式高效加载 BIM/倾斜摄影等大模型                        |
| 📍 空间定位与坐标转换 | 支持 WGS84、Cartographic 等坐标系统                                   |
| 🛰️ 实时数据接入       | 支持动态实体、卫星轨道模拟、实时传感器数据接入                         |
| 🎮 丰富交互           | 支持相机控制、鼠标拾取、测量工具、点击弹窗等                           |
| 🧱 可扩展性强         | 支持自定义材质、Shader、图层、实体样式等                              |

---

## 🚀 Cesium 应用场景

- 🌆 **数字孪生平台**
- 🌉 **城市三维可视化**
- 🛰️ **卫星轨道仿真**
- 🚧 **BIM 建筑可视化**
- 🚗 **车联网与智能交通**
- 📡 **地理信息系统（GIS）**
- 🌪️ **灾害监测与应急演练**

---

## 📦 如何使用 Cesium

### 1. 安装方式

```bash
npm install cesium
```

# 优化

在 Cesium 中，除了使用 Shader 实现程序化天空以外，还有很多**技术优化点**可以帮助你提升性能、渲染效果和用户体验。以下是按功能模块整理的 **Cesium 技术优化方向**，适合实际项目中的性能调优与开发优化参考：

---

## 🚀 一、渲染性能优化

### ✅ 1. 限制视图范围（设置视锥体裁剪）

避免加载用户当前看不到的区域，减少地形、模型、影像数据的渲染压力。

```js
viewer.scene.globe.maximumScreenSpaceError = 4; // 越大越模糊，但性能提升
viewer.scene.globe.tileCacheSize = 100;         // 控制瓦片缓存数量
```

### ✅ 2. 降低图层分辨率或刷新频率

对于不需要频繁刷新的图层（如影像底图），可以设定低分辨率。

```js
imageryLayer.maximumTerrainLevel = 12;  // 只加载到12级别
```

### ✅ 3. 控制地形精度（ScreenSpaceError）

```js
viewer.scene.globe.maximumScreenSpaceError = 8; // 默认是 2，越高越模糊越省性能
```

---

## 🧱 二、模型与数据加载优化

### ✅ 4. 使用 3D Tiles 格式

这是 Cesium 推荐的**大模型格式**，支持 LOD（层级加载），用于倾斜摄影、BIM、城市模型非常高效。

```js
const tileset = new Cesium.Cesium3DTileset({
  url: 'xxx/tileset.json',
  maximumScreenSpaceError: 16,
  maximumMemoryUsage: 512
});
viewer.scene.primitives.add(tileset);
```

### ✅ 5. 分片加载大模型 / 分区域加载

把大的 glTF 模型拆成多个 tiles 或实体组，根据相机位置加载。

---

## 🎨 三、图形渲染优化（含 Shader 应用）

### ✅ 6. 自定义材质减少纹理依赖

减少使用大图纹理，使用 Shader 或渐变色材质代替贴图。

### ✅ 7. 启用 `FastApproximateAtmosphere` 替代真实大气散射

```js
viewer.scene.skyAtmosphere.show = true;
viewer.scene.skyAtmosphere.atmosphereShaderSet = Cesium.AtmosphereShaderSet.FAST;
```

---

## 🌐 四、影像图层优化

### ✅ 8. 影像图层压缩与裁剪

* 使用裁剪后的小范围图层（GeoServer/WMS）
* 选择更合适的图层格式（比如 JPEG 比 PNG 小很多）

### ✅ 9. 只加载必要图层

* 避免一次性加载太多影像图层
* 设置 `minimumLevel` 和 `maximumLevel` 限制瓦片层级

---

## 📦 五、实体和图形优化

### ✅ 10. 批量添加实体 vs 使用 Primitive

* 实体（Entity）更方便但性能较差
* 多图元时建议改用 Primitive 或 GeometryInstance 批量处理

```js
const instance = new Cesium.GeometryInstance({
  geometry: new Cesium.RectangleGeometry({ ... }),
  attributes: { color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED) }
});
```

---

## 💡 六、其他推荐技巧

### ✅ 11. 禁用不必要特效

```js
viewer.scene.skyAtmosphere.show = false;
viewer.scene.fog.enabled = false;
viewer.scene.globe.depthTestAgainstTerrain = false;
```

### ✅ 12. 使用 `requestRenderMode` 节省资源

当场景内容静止时，自动暂停渲染，可大幅降低 CPU/GPU 占用：

```js
const viewer = new Cesium.Viewer('cesiumContainer', {
  requestRenderMode: true,
  maximumRenderTimeChange: Infinity
});
```

### ✅ 13. 限制帧率（适合资源受限场景）

```js
Cesium.requestAnimationFrame = window.setInterval(() => {
  viewer.scene.requestRender();
}, 1000 / 15); // 限制为15帧
```

---

## 📈 七、调试与监控工具推荐

| 工具                                                               | 用途               |
| ---------------------------------------------------------------- | ---------------- |
| `viewer.scene.debugShowFramesPerSecond = true;`                  | 显示实时 FPS         |
| [Cesium Inspector](https://github.com/CesiumGS/cesium-inspector) | 分析渲染问题           |
| Chrome DevTools + Performance                                    | 查看 WebGL 渲染和内存占用 |
| 使用 `tileset._statistics`                                         | 查看模型加载情况         |

---

## 🧠 总结优化清单

| 优化点       | 推荐操作                      |
| --------- | ------------------------- |
| 地形/影像加载   | 控制精度和层级                   |
| 模型渲染      | 使用 3D Tiles 和批量加载         |
| Shader 优化 | 程序化材质替代贴图，动态天空、云雾等        |
| 实体渲染      | 优先 Primitive，减少 DOM 更新    |
| 系统资源      | 启用 requestRenderMode，降低帧率 |

--- 

# 🧠 Cesium 项目级性能优化方案清单

## 🗂 一、资源加载与管理优化

| 优化点           | 说明           | 推荐操作                       |
| ------------- | ------------ | -------------------------- |
| ✅ 使用 3D Tiles | 大模型/倾斜摄影加载必备 | 拆分 glTF → 3D Tiles，并支持 LOD |
| ✅ 划分区域加载      | 按区域分层加载模型    | 根据经纬度/建筑分组控制显示             |
| ✅ 控制模型内存      | 模型太大会拖慢性能    | 使用 `maximumMemoryUsage` 限制 |
| ✅ 瓦片缓存管理      | 防止占用太多内存     | 设置 `tileCacheSize` 限制图块数量  |

---

## 🎨 二、渲染性能优化

| 优化点                      | 说明        | 推荐操作                          |
| ------------------------ | --------- | ----------------------------- |
| ✅ 地形精度控制                 | 影响渲染负载    | `maximumScreenSpaceError = 8` |
| ✅ 禁用不必要特效                | 降低 GPU 压力 | 关闭天空、大气、雾效等                   |
| ✅ 限制视锥范围                 | 减少后台加载    | 使用 `camera.frustum` 或遮罩裁剪     |
| ✅ 使用 `requestRenderMode` | 减少空转渲染    | 设置为按需渲染模式，节省 CPU/GPU          |

---

## 📦 三、数据与实体优化

| 优化点       | 说明           | 推荐操作                              |
| --------- | ------------ | --------------------------------- |
| ✅ 批量绘制图形  | `Entity` 性能低 | 使用 `Primitive + GeometryInstance` |
| ✅ 降低矢量复杂度 | GeoJSON 面积过大 | 简化线/面边界点数量                        |
| ✅ 异步数据加载  | 防止首屏卡顿       | 使用懒加载、分页加载、按视角加载等方式               |
| ✅ 动态数据去重  | 实时点/轨迹等需优化   | 后端限频 or 合并重复点位                    |

---

## 🧪 四、Shader 与视觉效果优化

| 优化点          | 说明       | 推荐操作                   |
| ------------ | -------- | ---------------------- |
| ✅ 程序化天空替代贴图  | 贴图大且无变化  | 自定义 Shader 渲染天空、星空、云层等 |
| ✅ 使用渐变色代替大纹理 | 模拟材质贴图   | 用材质属性与 shader 实现渐变或光照  |
| ✅ 动画与粒子限制    | 粒子、光晕开销大 | 粒子数控制在 2000 以内，并动态销毁   |

---

## 🧭 五、摄像机与视图优化

| 优化点       | 说明          | 推荐操作                                                  |
| --------- | ----------- | ----------------------------------------------------- |
| ✅ 限制相机范围  | 防止用户拉远全加载地球 | 设置 `viewer.scene.screenSpaceCameraController` 限制缩放/旋转 |
| ✅ 初始视角优化  | 首屏加载时间最关键   | 使用 `camera.setView` 定位只展示重要区域                         |
| ✅ 视锥内加载模型 | 提高感知性能      | 可通过 `camera.getPickRay` 判断是否在视野内再加载对象                 |

---

## 📈 六、项目部署与加载优化

| 优化点             | 说明        | 推荐操作                                 |
| --------------- | --------- | ------------------------------------ |
| ✅ 模型压缩          | 减少初始加载时间  | glTF 使用 Draco 压缩，GeoJSON 使用 TopoJSON |
| ✅ CDN 静态资源      | 提高访问速度    | CesiumJS、贴图、模型资源部署至 CDN              |
| ✅ 延迟加载非关键资源     | 首屏快，后续慢加载 | 如帮助图层、辅助 UI 等，延后加载                   |
| ✅ Web Worker 利用 | 加速数据解析    | 例如 Cesium 自带地形解码器使用 Web Worker       |

---

## 🛠 七、调试与诊断建议

| 工具/手段                                           | 用途                 |
| ----------------------------------------------- | ------------------ |
| `viewer.scene.debugShowFramesPerSecond = true;` | 查看实时帧率             |
| `tileset._statistics`                           | 查看 tiles 加载数量、内存使用 |
| Chrome DevTools Performance                     | 分析渲染主线程、内存瓶颈       |
| 使用 Cesium Inspector 插件                          | 分析瓦片加载、视锥裁剪等逻辑     |

---

## 🎯 推荐组合优化方案（按项目类型）

| 项目类型        | 推荐重点优化方向                             |
| ----------- | ------------------------------------ |
| 🌆 城市数字孪生   | 3D Tiles + LOD、区域加载、相机裁剪、动态数据限频      |
| 🏗️ BIM 场景  | 分模型加载、Primitive 替代 Entity、自定义材质      |
| 🚦 智慧交通平台   | 实时数据聚合、图层分组开关、粒子数限制                  |
| 🛰️ 地理测绘/遥感 | 地形/影像精度控制、图层分级加载、GPU 压力管控            |
| 🖥️ 大屏展示    | requestRenderMode、只展示固定视角、禁用交互与阴影等特效 |

---

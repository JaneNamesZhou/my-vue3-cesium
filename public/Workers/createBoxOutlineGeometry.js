/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.130.1-splats
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as d}from"./chunk-PNLCKBV3.js";import{a as l}from"./chunk-QTVK23H4.js";import{b as O,c as h,d as p}from"./chunk-42IHVGRP.js";import{d as A}from"./chunk-UQHOJ37D.js";import"./chunk-WSE2T7BE.js";import{a}from"./chunk-PFADO7ZR.js";import{a as m,f as s}from"./chunk-R4GPPE6K.js";import"./chunk-UHDP5CSO.js";import"./chunk-7K5Z2WZP.js";import"./chunk-UP4H5KWV.js";import{a as b,b as r}from"./chunk-HSTHF5CC.js";import{e as c}from"./chunk-25SJ7A2H.js";var g=new m;function f(e){e=e??s.EMPTY_OBJECT;let t=e.minimum,n=e.maximum;if(r.typeOf.object("min",t),r.typeOf.object("max",n),c(e.offsetAttribute)&&e.offsetAttribute===d.TOP)throw new b("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._min=m.clone(t),this._max=m.clone(n),this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxOutlineGeometry"}f.fromDimensions=function(e){e=e??s.EMPTY_OBJECT;let t=e.dimensions;r.typeOf.object("dimensions",t),r.typeOf.number.greaterThanOrEquals("dimensions.x",t.x,0),r.typeOf.number.greaterThanOrEquals("dimensions.y",t.y,0),r.typeOf.number.greaterThanOrEquals("dimensions.z",t.z,0);let n=m.multiplyByScalar(t,.5,new m);return new f({minimum:m.negate(n,new m),maximum:n,offsetAttribute:e.offsetAttribute})};f.fromAxisAlignedBoundingBox=function(e){return r.typeOf.object("boundindBox",e),new f({minimum:e.minimum,maximum:e.maximum})};f.packedLength=2*m.packedLength+1;f.pack=function(e,t,n){return r.typeOf.object("value",e),r.defined("array",t),n=n??0,m.pack(e._min,t,n),m.pack(e._max,t,n+m.packedLength),t[n+m.packedLength*2]=e._offsetAttribute??-1,t};var w=new m,x=new m,_={minimum:w,maximum:x,offsetAttribute:void 0};f.unpack=function(e,t,n){r.defined("array",e),t=t??0;let u=m.unpack(e,t,w),o=m.unpack(e,t+m.packedLength,x),i=e[t+m.packedLength*2];return c(n)?(n._min=m.clone(u,n._min),n._max=m.clone(o,n._max),n._offsetAttribute=i===-1?void 0:i,n):(_.offsetAttribute=i===-1?void 0:i,new f(_))};f.createGeometry=function(e){let t=e._min,n=e._max;if(m.equals(t,n))return;let u=new l,o=new Uint16Array(12*2),i=new Float64Array(8*3);i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=n.x,i[4]=t.y,i[5]=t.z,i[6]=n.x,i[7]=n.y,i[8]=t.z,i[9]=t.x,i[10]=n.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=n.z,i[15]=n.x,i[16]=t.y,i[17]=n.z,i[18]=n.x,i[19]=n.y,i[20]=n.z,i[21]=t.x,i[22]=n.y,i[23]=n.z,u.position=new p({componentDatatype:a.DOUBLE,componentsPerAttribute:3,values:i}),o[0]=4,o[1]=5,o[2]=5,o[3]=6,o[4]=6,o[5]=7,o[6]=7,o[7]=4,o[8]=0,o[9]=1,o[10]=1,o[11]=2,o[12]=2,o[13]=3,o[14]=3,o[15]=0,o[16]=0,o[17]=4,o[18]=1,o[19]=5,o[20]=2,o[21]=6,o[22]=3,o[23]=7;let k=m.subtract(n,t,g),E=m.magnitude(k)*.5;if(c(e._offsetAttribute)){let T=i.length,z=e._offsetAttribute===d.NONE?0:1,B=new Uint8Array(T/3).fill(z);u.applyOffset=new p({componentDatatype:a.UNSIGNED_BYTE,componentsPerAttribute:1,values:B})}return new h({attributes:u,indices:o,primitiveType:O.LINES,boundingSphere:new A(m.ZERO,E),offsetAttribute:e._offsetAttribute})};var y=f;function L(e,t){return c(t)&&(e=y.unpack(e,t)),y.createGeometry(e)}var V=L;export{V as default};

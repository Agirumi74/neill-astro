import{j as e}from"./jsx-runtime.2X-s0L5T.js";import{r as t}from"./index.DeEakWXg.js";import{B as l}from"./button.vIxyeFGN.js";import{c as a}from"./createLucideIcon.C-4EQX0J.js";/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],d=a("ArrowUp",c),w=()=>{const[r,s]=t.useState(!1);t.useEffect(()=>{const o=()=>{const i=window.pageYOffset;s(i>300)};return window.addEventListener("scroll",o),()=>window.removeEventListener("scroll",o)},[]);const n=()=>{window.scrollTo({top:0,behavior:"smooth"})};return r?e.jsx(l,{onClick:n,className:"fixed bottom-6 right-6 z-40 p-3 bg-gradient-luxury text-white rounded-full shadow-lg hover-glow animate-fade-in",size:"icon",children:e.jsx(d,{className:"w-5 h-5"})}):null};export{w as default};

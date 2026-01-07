import{r as w,u as fs,O as ys}from"./router-CINeAvhf.js";var Ae={exports:{}},te={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var et;function gs(){if(et)return te;et=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function s(r,a,o){var n=null;if(o!==void 0&&(n=""+o),a.key!==void 0&&(n=""+a.key),"key"in a){o={};for(var c in a)c!=="key"&&(o[c]=a[c])}else o=a;return a=o.ref,{$$typeof:e,type:r,key:n,ref:a!==void 0?a:null,props:o}}return te.Fragment=t,te.jsx=s,te.jsxs=s,te}var tt;function xs(){return tt||(tt=1,Ae.exports=gs()),Ae.exports}var i=xs();function At(e,t){return function(){return e.apply(t,arguments)}}const{toString:bs}=Object.prototype,{getPrototypeOf:Ve}=Object,{iterator:we,toStringTag:Ct}=Symbol,ke=(e=>t=>{const s=bs.call(t);return e[s]||(e[s]=s.slice(8,-1).toLowerCase())})(Object.create(null)),P=e=>(e=e.toLowerCase(),t=>ke(t)===e),ve=e=>t=>typeof t===e,{isArray:Q}=Array,G=ve("undefined");function re(e){return e!==null&&!G(e)&&e.constructor!==null&&!G(e.constructor)&&R(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Mt=P("ArrayBuffer");function ws(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Mt(e.buffer),t}const ks=ve("string"),R=ve("function"),Rt=ve("number"),ne=e=>e!==null&&typeof e=="object",vs=e=>e===!0||e===!1,me=e=>{if(ke(e)!=="object")return!1;const t=Ve(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Ct in e)&&!(we in e)},Ns=e=>{if(!ne(e)||re(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},js=P("Date"),$s=P("File"),Ss=P("Blob"),Es=P("FileList"),_s=e=>ne(e)&&R(e.pipe),As=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||R(e.append)&&((t=ke(e))==="formdata"||t==="object"&&R(e.toString)&&e.toString()==="[object FormData]"))},Cs=P("URLSearchParams"),[Ms,Rs,Ts,Os]=["ReadableStream","Request","Response","Headers"].map(P),Ps=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function ae(e,t,{allOwnKeys:s=!1}={}){if(e===null||typeof e>"u")return;let r,a;if(typeof e!="object"&&(e=[e]),Q(e))for(r=0,a=e.length;r<a;r++)t.call(null,e[r],r,e);else{if(re(e))return;const o=s?Object.getOwnPropertyNames(e):Object.keys(e),n=o.length;let c;for(r=0;r<n;r++)c=o[r],t.call(null,e[c],c,e)}}function Tt(e,t){if(re(e))return null;t=t.toLowerCase();const s=Object.keys(e);let r=s.length,a;for(;r-- >0;)if(a=s[r],t===a.toLowerCase())return a;return null}const W=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Ot=e=>!G(e)&&e!==W;function Pe(){const{caseless:e,skipUndefined:t}=Ot(this)&&this||{},s={},r=(a,o)=>{const n=e&&Tt(s,o)||o;me(s[n])&&me(a)?s[n]=Pe(s[n],a):me(a)?s[n]=Pe({},a):Q(a)?s[n]=a.slice():(!t||!G(a))&&(s[n]=a)};for(let a=0,o=arguments.length;a<o;a++)arguments[a]&&ae(arguments[a],r);return s}const Fs=(e,t,s,{allOwnKeys:r}={})=>(ae(t,(a,o)=>{s&&R(a)?e[o]=At(a,s):e[o]=a},{allOwnKeys:r}),e),Bs=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Ds=(e,t,s,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),s&&Object.assign(e.prototype,s)},Ls=(e,t,s,r)=>{let a,o,n;const c={};if(t=t||{},e==null)return t;do{for(a=Object.getOwnPropertyNames(e),o=a.length;o-- >0;)n=a[o],(!r||r(n,e,t))&&!c[n]&&(t[n]=e[n],c[n]=!0);e=s!==!1&&Ve(e)}while(e&&(!s||s(e,t))&&e!==Object.prototype);return t},Us=(e,t,s)=>{e=String(e),(s===void 0||s>e.length)&&(s=e.length),s-=t.length;const r=e.indexOf(t,s);return r!==-1&&r===s},zs=e=>{if(!e)return null;if(Q(e))return e;let t=e.length;if(!Rt(t))return null;const s=new Array(t);for(;t-- >0;)s[t]=e[t];return s},qs=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Ve(Uint8Array)),Hs=(e,t)=>{const r=(e&&e[we]).call(e);let a;for(;(a=r.next())&&!a.done;){const o=a.value;t.call(e,o[0],o[1])}},Is=(e,t)=>{let s;const r=[];for(;(s=e.exec(t))!==null;)r.push(s);return r},Vs=P("HTMLFormElement"),Js=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(s,r,a){return r.toUpperCase()+a}),st=(({hasOwnProperty:e})=>(t,s)=>e.call(t,s))(Object.prototype),Ws=P("RegExp"),Pt=(e,t)=>{const s=Object.getOwnPropertyDescriptors(e),r={};ae(s,(a,o)=>{let n;(n=t(a,o,e))!==!1&&(r[o]=n||a)}),Object.defineProperties(e,r)},Ks=e=>{Pt(e,(t,s)=>{if(R(e)&&["arguments","caller","callee"].indexOf(s)!==-1)return!1;const r=e[s];if(R(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+s+"'")})}})},Xs=(e,t)=>{const s={},r=a=>{a.forEach(o=>{s[o]=!0})};return Q(e)?r(e):r(String(e).split(t)),s},Zs=()=>{},Gs=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Qs(e){return!!(e&&R(e.append)&&e[Ct]==="FormData"&&e[we])}const Ys=e=>{const t=new Array(10),s=(r,a)=>{if(ne(r)){if(t.indexOf(r)>=0)return;if(re(r))return r;if(!("toJSON"in r)){t[a]=r;const o=Q(r)?[]:{};return ae(r,(n,c)=>{const l=s(n,a+1);!G(l)&&(o[c]=l)}),t[a]=void 0,o}}return r};return s(e,0)},er=P("AsyncFunction"),tr=e=>e&&(ne(e)||R(e))&&R(e.then)&&R(e.catch),Ft=((e,t)=>e?setImmediate:t?((s,r)=>(W.addEventListener("message",({source:a,data:o})=>{a===W&&o===s&&r.length&&r.shift()()},!1),a=>{r.push(a),W.postMessage(s,"*")}))(`axios@${Math.random()}`,[]):s=>setTimeout(s))(typeof setImmediate=="function",R(W.postMessage)),sr=typeof queueMicrotask<"u"?queueMicrotask.bind(W):typeof process<"u"&&process.nextTick||Ft,rr=e=>e!=null&&R(e[we]),d={isArray:Q,isArrayBuffer:Mt,isBuffer:re,isFormData:As,isArrayBufferView:ws,isString:ks,isNumber:Rt,isBoolean:vs,isObject:ne,isPlainObject:me,isEmptyObject:Ns,isReadableStream:Ms,isRequest:Rs,isResponse:Ts,isHeaders:Os,isUndefined:G,isDate:js,isFile:$s,isBlob:Ss,isRegExp:Ws,isFunction:R,isStream:_s,isURLSearchParams:Cs,isTypedArray:qs,isFileList:Es,forEach:ae,merge:Pe,extend:Fs,trim:Ps,stripBOM:Bs,inherits:Ds,toFlatObject:Ls,kindOf:ke,kindOfTest:P,endsWith:Us,toArray:zs,forEachEntry:Hs,matchAll:Is,isHTMLForm:Vs,hasOwnProperty:st,hasOwnProp:st,reduceDescriptors:Pt,freezeMethods:Ks,toObjectSet:Xs,toCamelCase:Js,noop:Zs,toFiniteNumber:Gs,findKey:Tt,global:W,isContextDefined:Ot,isSpecCompliantForm:Qs,toJSONObject:Ys,isAsyncFn:er,isThenable:tr,setImmediate:Ft,asap:sr,isIterable:rr};function k(e,t,s,r,a){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),s&&(this.config=s),r&&(this.request=r),a&&(this.response=a,this.status=a.status?a.status:null)}d.inherits(k,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:d.toJSONObject(this.config),code:this.code,status:this.status}}});const Bt=k.prototype,Dt={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Dt[e]={value:e}});Object.defineProperties(k,Dt);Object.defineProperty(Bt,"isAxiosError",{value:!0});k.from=(e,t,s,r,a,o)=>{const n=Object.create(Bt);d.toFlatObject(e,n,function(u){return u!==Error.prototype},h=>h!=="isAxiosError");const c=e&&e.message?e.message:"Error",l=t==null&&e?e.code:t;return k.call(n,c,l,s,r,a),e&&n.cause==null&&Object.defineProperty(n,"cause",{value:e,configurable:!0}),n.name=e&&e.name||"Error",o&&Object.assign(n,o),n};const nr=null;function Fe(e){return d.isPlainObject(e)||d.isArray(e)}function Lt(e){return d.endsWith(e,"[]")?e.slice(0,-2):e}function rt(e,t,s){return e?e.concat(t).map(function(a,o){return a=Lt(a),!s&&o?"["+a+"]":a}).join(s?".":""):t}function ar(e){return d.isArray(e)&&!e.some(Fe)}const or=d.toFlatObject(d,{},null,function(t){return/^is[A-Z]/.test(t)});function Ne(e,t,s){if(!d.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,s=d.toFlatObject(s,{metaTokens:!0,dots:!1,indexes:!1},!1,function(g,y){return!d.isUndefined(y[g])});const r=s.metaTokens,a=s.visitor||u,o=s.dots,n=s.indexes,l=(s.Blob||typeof Blob<"u"&&Blob)&&d.isSpecCompliantForm(t);if(!d.isFunction(a))throw new TypeError("visitor must be a function");function h(p){if(p===null)return"";if(d.isDate(p))return p.toISOString();if(d.isBoolean(p))return p.toString();if(!l&&d.isBlob(p))throw new k("Blob is not supported. Use a Buffer instead.");return d.isArrayBuffer(p)||d.isTypedArray(p)?l&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function u(p,g,y){let $=p;if(p&&!y&&typeof p=="object"){if(d.endsWith(g,"{}"))g=r?g:g.slice(0,-2),p=JSON.stringify(p);else if(d.isArray(p)&&ar(p)||(d.isFileList(p)||d.endsWith(g,"[]"))&&($=d.toArray(p)))return g=Lt(g),$.forEach(function(N,b){!(d.isUndefined(N)||N===null)&&t.append(n===!0?rt([g],b,o):n===null?g:g+"[]",h(N))}),!1}return Fe(p)?!0:(t.append(rt(y,g,o),h(p)),!1)}const f=[],x=Object.assign(or,{defaultVisitor:u,convertValue:h,isVisitable:Fe});function v(p,g){if(!d.isUndefined(p)){if(f.indexOf(p)!==-1)throw Error("Circular reference detected in "+g.join("."));f.push(p),d.forEach(p,function($,A){(!(d.isUndefined($)||$===null)&&a.call(t,$,d.isString(A)?A.trim():A,g,x))===!0&&v($,g?g.concat(A):[A])}),f.pop()}}if(!d.isObject(e))throw new TypeError("data must be an object");return v(e),t}function nt(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function Je(e,t){this._pairs=[],e&&Ne(e,this,t)}const Ut=Je.prototype;Ut.append=function(t,s){this._pairs.push([t,s])};Ut.toString=function(t){const s=t?function(r){return t.call(this,r,nt)}:nt;return this._pairs.map(function(a){return s(a[0])+"="+s(a[1])},"").join("&")};function ir(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function zt(e,t,s){if(!t)return e;const r=s&&s.encode||ir;d.isFunction(s)&&(s={serialize:s});const a=s&&s.serialize;let o;if(a?o=a(t,s):o=d.isURLSearchParams(t)?t.toString():new Je(t,s).toString(r),o){const n=e.indexOf("#");n!==-1&&(e=e.slice(0,n)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class at{constructor(){this.handlers=[]}use(t,s,r){return this.handlers.push({fulfilled:t,rejected:s,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){d.forEach(this.handlers,function(r){r!==null&&t(r)})}}const qt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},cr=typeof URLSearchParams<"u"?URLSearchParams:Je,lr=typeof FormData<"u"?FormData:null,dr=typeof Blob<"u"?Blob:null,ur={isBrowser:!0,classes:{URLSearchParams:cr,FormData:lr,Blob:dr},protocols:["http","https","file","blob","url","data"]},We=typeof window<"u"&&typeof document<"u",Be=typeof navigator=="object"&&navigator||void 0,hr=We&&(!Be||["ReactNative","NativeScript","NS"].indexOf(Be.product)<0),pr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",mr=We&&window.location.href||"http://localhost",fr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:We,hasStandardBrowserEnv:hr,hasStandardBrowserWebWorkerEnv:pr,navigator:Be,origin:mr},Symbol.toStringTag,{value:"Module"})),C={...fr,...ur};function yr(e,t){return Ne(e,new C.classes.URLSearchParams,{visitor:function(s,r,a,o){return C.isNode&&d.isBuffer(s)?(this.append(r,s.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function gr(e){return d.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function xr(e){const t={},s=Object.keys(e);let r;const a=s.length;let o;for(r=0;r<a;r++)o=s[r],t[o]=e[o];return t}function Ht(e){function t(s,r,a,o){let n=s[o++];if(n==="__proto__")return!0;const c=Number.isFinite(+n),l=o>=s.length;return n=!n&&d.isArray(a)?a.length:n,l?(d.hasOwnProp(a,n)?a[n]=[a[n],r]:a[n]=r,!c):((!a[n]||!d.isObject(a[n]))&&(a[n]=[]),t(s,r,a[n],o)&&d.isArray(a[n])&&(a[n]=xr(a[n])),!c)}if(d.isFormData(e)&&d.isFunction(e.entries)){const s={};return d.forEachEntry(e,(r,a)=>{t(gr(r),a,s,0)}),s}return null}function br(e,t,s){if(d.isString(e))try{return(t||JSON.parse)(e),d.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(s||JSON.stringify)(e)}const oe={transitional:qt,adapter:["xhr","http","fetch"],transformRequest:[function(t,s){const r=s.getContentType()||"",a=r.indexOf("application/json")>-1,o=d.isObject(t);if(o&&d.isHTMLForm(t)&&(t=new FormData(t)),d.isFormData(t))return a?JSON.stringify(Ht(t)):t;if(d.isArrayBuffer(t)||d.isBuffer(t)||d.isStream(t)||d.isFile(t)||d.isBlob(t)||d.isReadableStream(t))return t;if(d.isArrayBufferView(t))return t.buffer;if(d.isURLSearchParams(t))return s.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return yr(t,this.formSerializer).toString();if((c=d.isFileList(t))||r.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return Ne(c?{"files[]":t}:t,l&&new l,this.formSerializer)}}return o||a?(s.setContentType("application/json",!1),br(t)):t}],transformResponse:[function(t){const s=this.transitional||oe.transitional,r=s&&s.forcedJSONParsing,a=this.responseType==="json";if(d.isResponse(t)||d.isReadableStream(t))return t;if(t&&d.isString(t)&&(r&&!this.responseType||a)){const n=!(s&&s.silentJSONParsing)&&a;try{return JSON.parse(t,this.parseReviver)}catch(c){if(n)throw c.name==="SyntaxError"?k.from(c,k.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:C.classes.FormData,Blob:C.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};d.forEach(["delete","get","head","post","put","patch"],e=>{oe.headers[e]={}});const wr=d.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),kr=e=>{const t={};let s,r,a;return e&&e.split(`
`).forEach(function(n){a=n.indexOf(":"),s=n.substring(0,a).trim().toLowerCase(),r=n.substring(a+1).trim(),!(!s||t[s]&&wr[s])&&(s==="set-cookie"?t[s]?t[s].push(r):t[s]=[r]:t[s]=t[s]?t[s]+", "+r:r)}),t},ot=Symbol("internals");function se(e){return e&&String(e).trim().toLowerCase()}function fe(e){return e===!1||e==null?e:d.isArray(e)?e.map(fe):String(e)}function vr(e){const t=Object.create(null),s=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=s.exec(e);)t[r[1]]=r[2];return t}const Nr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ce(e,t,s,r,a){if(d.isFunction(r))return r.call(this,t,s);if(a&&(t=s),!!d.isString(t)){if(d.isString(r))return t.indexOf(r)!==-1;if(d.isRegExp(r))return r.test(t)}}function jr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,s,r)=>s.toUpperCase()+r)}function $r(e,t){const s=d.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+s,{value:function(a,o,n){return this[r].call(this,t,a,o,n)},configurable:!0})})}let T=class{constructor(t){t&&this.set(t)}set(t,s,r){const a=this;function o(c,l,h){const u=se(l);if(!u)throw new Error("header name must be a non-empty string");const f=d.findKey(a,u);(!f||a[f]===void 0||h===!0||h===void 0&&a[f]!==!1)&&(a[f||l]=fe(c))}const n=(c,l)=>d.forEach(c,(h,u)=>o(h,u,l));if(d.isPlainObject(t)||t instanceof this.constructor)n(t,s);else if(d.isString(t)&&(t=t.trim())&&!Nr(t))n(kr(t),s);else if(d.isObject(t)&&d.isIterable(t)){let c={},l,h;for(const u of t){if(!d.isArray(u))throw TypeError("Object iterator must return a key-value pair");c[h=u[0]]=(l=c[h])?d.isArray(l)?[...l,u[1]]:[l,u[1]]:u[1]}n(c,s)}else t!=null&&o(s,t,r);return this}get(t,s){if(t=se(t),t){const r=d.findKey(this,t);if(r){const a=this[r];if(!s)return a;if(s===!0)return vr(a);if(d.isFunction(s))return s.call(this,a,r);if(d.isRegExp(s))return s.exec(a);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,s){if(t=se(t),t){const r=d.findKey(this,t);return!!(r&&this[r]!==void 0&&(!s||Ce(this,this[r],r,s)))}return!1}delete(t,s){const r=this;let a=!1;function o(n){if(n=se(n),n){const c=d.findKey(r,n);c&&(!s||Ce(r,r[c],c,s))&&(delete r[c],a=!0)}}return d.isArray(t)?t.forEach(o):o(t),a}clear(t){const s=Object.keys(this);let r=s.length,a=!1;for(;r--;){const o=s[r];(!t||Ce(this,this[o],o,t,!0))&&(delete this[o],a=!0)}return a}normalize(t){const s=this,r={};return d.forEach(this,(a,o)=>{const n=d.findKey(r,o);if(n){s[n]=fe(a),delete s[o];return}const c=t?jr(o):String(o).trim();c!==o&&delete s[o],s[c]=fe(a),r[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const s=Object.create(null);return d.forEach(this,(r,a)=>{r!=null&&r!==!1&&(s[a]=t&&d.isArray(r)?r.join(", "):r)}),s}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,s])=>t+": "+s).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...s){const r=new this(t);return s.forEach(a=>r.set(a)),r}static accessor(t){const r=(this[ot]=this[ot]={accessors:{}}).accessors,a=this.prototype;function o(n){const c=se(n);r[c]||($r(a,n),r[c]=!0)}return d.isArray(t)?t.forEach(o):o(t),this}};T.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);d.reduceDescriptors(T.prototype,({value:e},t)=>{let s=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[s]=r}}});d.freezeMethods(T);function Me(e,t){const s=this||oe,r=t||s,a=T.from(r.headers);let o=r.data;return d.forEach(e,function(c){o=c.call(s,o,a.normalize(),t?t.status:void 0)}),a.normalize(),o}function It(e){return!!(e&&e.__CANCEL__)}function Y(e,t,s){k.call(this,e??"canceled",k.ERR_CANCELED,t,s),this.name="CanceledError"}d.inherits(Y,k,{__CANCEL__:!0});function Vt(e,t,s){const r=s.config.validateStatus;!s.status||!r||r(s.status)?e(s):t(new k("Request failed with status code "+s.status,[k.ERR_BAD_REQUEST,k.ERR_BAD_RESPONSE][Math.floor(s.status/100)-4],s.config,s.request,s))}function Sr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Er(e,t){e=e||10;const s=new Array(e),r=new Array(e);let a=0,o=0,n;return t=t!==void 0?t:1e3,function(l){const h=Date.now(),u=r[o];n||(n=h),s[a]=l,r[a]=h;let f=o,x=0;for(;f!==a;)x+=s[f++],f=f%e;if(a=(a+1)%e,a===o&&(o=(o+1)%e),h-n<t)return;const v=u&&h-u;return v?Math.round(x*1e3/v):void 0}}function _r(e,t){let s=0,r=1e3/t,a,o;const n=(h,u=Date.now())=>{s=u,a=null,o&&(clearTimeout(o),o=null),e(...h)};return[(...h)=>{const u=Date.now(),f=u-s;f>=r?n(h,u):(a=h,o||(o=setTimeout(()=>{o=null,n(a)},r-f)))},()=>a&&n(a)]}const xe=(e,t,s=3)=>{let r=0;const a=Er(50,250);return _r(o=>{const n=o.loaded,c=o.lengthComputable?o.total:void 0,l=n-r,h=a(l),u=n<=c;r=n;const f={loaded:n,total:c,progress:c?n/c:void 0,bytes:l,rate:h||void 0,estimated:h&&c&&u?(c-n)/h:void 0,event:o,lengthComputable:c!=null,[t?"download":"upload"]:!0};e(f)},s)},it=(e,t)=>{const s=e!=null;return[r=>t[0]({lengthComputable:s,total:e,loaded:r}),t[1]]},ct=e=>(...t)=>d.asap(()=>e(...t)),Ar=C.hasStandardBrowserEnv?((e,t)=>s=>(s=new URL(s,C.origin),e.protocol===s.protocol&&e.host===s.host&&(t||e.port===s.port)))(new URL(C.origin),C.navigator&&/(msie|trident)/i.test(C.navigator.userAgent)):()=>!0,Cr=C.hasStandardBrowserEnv?{write(e,t,s,r,a,o){const n=[e+"="+encodeURIComponent(t)];d.isNumber(s)&&n.push("expires="+new Date(s).toGMTString()),d.isString(r)&&n.push("path="+r),d.isString(a)&&n.push("domain="+a),o===!0&&n.push("secure"),document.cookie=n.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Mr(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Rr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Jt(e,t,s){let r=!Mr(t);return e&&(r||s==!1)?Rr(e,t):t}const lt=e=>e instanceof T?{...e}:e;function X(e,t){t=t||{};const s={};function r(h,u,f,x){return d.isPlainObject(h)&&d.isPlainObject(u)?d.merge.call({caseless:x},h,u):d.isPlainObject(u)?d.merge({},u):d.isArray(u)?u.slice():u}function a(h,u,f,x){if(d.isUndefined(u)){if(!d.isUndefined(h))return r(void 0,h,f,x)}else return r(h,u,f,x)}function o(h,u){if(!d.isUndefined(u))return r(void 0,u)}function n(h,u){if(d.isUndefined(u)){if(!d.isUndefined(h))return r(void 0,h)}else return r(void 0,u)}function c(h,u,f){if(f in t)return r(h,u);if(f in e)return r(void 0,h)}const l={url:o,method:o,data:o,baseURL:n,transformRequest:n,transformResponse:n,paramsSerializer:n,timeout:n,timeoutMessage:n,withCredentials:n,withXSRFToken:n,adapter:n,responseType:n,xsrfCookieName:n,xsrfHeaderName:n,onUploadProgress:n,onDownloadProgress:n,decompress:n,maxContentLength:n,maxBodyLength:n,beforeRedirect:n,transport:n,httpAgent:n,httpsAgent:n,cancelToken:n,socketPath:n,responseEncoding:n,validateStatus:c,headers:(h,u,f)=>a(lt(h),lt(u),f,!0)};return d.forEach(Object.keys({...e,...t}),function(u){const f=l[u]||a,x=f(e[u],t[u],u);d.isUndefined(x)&&f!==c||(s[u]=x)}),s}const Wt=e=>{const t=X({},e);let{data:s,withXSRFToken:r,xsrfHeaderName:a,xsrfCookieName:o,headers:n,auth:c}=t;if(t.headers=n=T.from(n),t.url=zt(Jt(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),c&&n.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):""))),d.isFormData(s)){if(C.hasStandardBrowserEnv||C.hasStandardBrowserWebWorkerEnv)n.setContentType(void 0);else if(d.isFunction(s.getHeaders)){const l=s.getHeaders(),h=["content-type","content-length"];Object.entries(l).forEach(([u,f])=>{h.includes(u.toLowerCase())&&n.set(u,f)})}}if(C.hasStandardBrowserEnv&&(r&&d.isFunction(r)&&(r=r(t)),r||r!==!1&&Ar(t.url))){const l=a&&o&&Cr.read(o);l&&n.set(a,l)}return t},Tr=typeof XMLHttpRequest<"u",Or=Tr&&function(e){return new Promise(function(s,r){const a=Wt(e);let o=a.data;const n=T.from(a.headers).normalize();let{responseType:c,onUploadProgress:l,onDownloadProgress:h}=a,u,f,x,v,p;function g(){v&&v(),p&&p(),a.cancelToken&&a.cancelToken.unsubscribe(u),a.signal&&a.signal.removeEventListener("abort",u)}let y=new XMLHttpRequest;y.open(a.method.toUpperCase(),a.url,!0),y.timeout=a.timeout;function $(){if(!y)return;const N=T.from("getAllResponseHeaders"in y&&y.getAllResponseHeaders()),S={data:!c||c==="text"||c==="json"?y.responseText:y.response,status:y.status,statusText:y.statusText,headers:N,config:e,request:y};Vt(function(M){s(M),g()},function(M){r(M),g()},S),y=null}"onloadend"in y?y.onloadend=$:y.onreadystatechange=function(){!y||y.readyState!==4||y.status===0&&!(y.responseURL&&y.responseURL.indexOf("file:")===0)||setTimeout($)},y.onabort=function(){y&&(r(new k("Request aborted",k.ECONNABORTED,e,y)),y=null)},y.onerror=function(b){const S=b&&b.message?b.message:"Network Error",O=new k(S,k.ERR_NETWORK,e,y);O.event=b||null,r(O),y=null},y.ontimeout=function(){let b=a.timeout?"timeout of "+a.timeout+"ms exceeded":"timeout exceeded";const S=a.transitional||qt;a.timeoutErrorMessage&&(b=a.timeoutErrorMessage),r(new k(b,S.clarifyTimeoutError?k.ETIMEDOUT:k.ECONNABORTED,e,y)),y=null},o===void 0&&n.setContentType(null),"setRequestHeader"in y&&d.forEach(n.toJSON(),function(b,S){y.setRequestHeader(S,b)}),d.isUndefined(a.withCredentials)||(y.withCredentials=!!a.withCredentials),c&&c!=="json"&&(y.responseType=a.responseType),h&&([x,p]=xe(h,!0),y.addEventListener("progress",x)),l&&y.upload&&([f,v]=xe(l),y.upload.addEventListener("progress",f),y.upload.addEventListener("loadend",v)),(a.cancelToken||a.signal)&&(u=N=>{y&&(r(!N||N.type?new Y(null,e,y):N),y.abort(),y=null)},a.cancelToken&&a.cancelToken.subscribe(u),a.signal&&(a.signal.aborted?u():a.signal.addEventListener("abort",u)));const A=Sr(a.url);if(A&&C.protocols.indexOf(A)===-1){r(new k("Unsupported protocol "+A+":",k.ERR_BAD_REQUEST,e));return}y.send(o||null)})},Pr=(e,t)=>{const{length:s}=e=e?e.filter(Boolean):[];if(t||s){let r=new AbortController,a;const o=function(h){if(!a){a=!0,c();const u=h instanceof Error?h:this.reason;r.abort(u instanceof k?u:new Y(u instanceof Error?u.message:u))}};let n=t&&setTimeout(()=>{n=null,o(new k(`timeout ${t} of ms exceeded`,k.ETIMEDOUT))},t);const c=()=>{e&&(n&&clearTimeout(n),n=null,e.forEach(h=>{h.unsubscribe?h.unsubscribe(o):h.removeEventListener("abort",o)}),e=null)};e.forEach(h=>h.addEventListener("abort",o));const{signal:l}=r;return l.unsubscribe=()=>d.asap(c),l}},Fr=function*(e,t){let s=e.byteLength;if(s<t){yield e;return}let r=0,a;for(;r<s;)a=r+t,yield e.slice(r,a),r=a},Br=async function*(e,t){for await(const s of Dr(e))yield*Fr(s,t)},Dr=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:s,value:r}=await t.read();if(s)break;yield r}}finally{await t.cancel()}},dt=(e,t,s,r)=>{const a=Br(e,t);let o=0,n,c=l=>{n||(n=!0,r&&r(l))};return new ReadableStream({async pull(l){try{const{done:h,value:u}=await a.next();if(h){c(),l.close();return}let f=u.byteLength;if(s){let x=o+=f;s(x)}l.enqueue(new Uint8Array(u))}catch(h){throw c(h),h}},cancel(l){return c(l),a.return()}},{highWaterMark:2})},ut=64*1024,{isFunction:he}=d,Kt=(({fetch:e,Request:t,Response:s})=>({fetch:e,Request:t,Response:s}))(d.global),{ReadableStream:ht,TextEncoder:pt}=d.global,mt=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Lr=e=>{const{fetch:t,Request:s,Response:r}=Object.assign({},Kt,e),a=he(t),o=he(s),n=he(r);if(!a)return!1;const c=a&&he(ht),l=a&&(typeof pt=="function"?(p=>g=>p.encode(g))(new pt):async p=>new Uint8Array(await new s(p).arrayBuffer())),h=o&&c&&mt(()=>{let p=!1;const g=new s(C.origin,{body:new ht,method:"POST",get duplex(){return p=!0,"half"}}).headers.has("Content-Type");return p&&!g}),u=n&&c&&mt(()=>d.isReadableStream(new r("").body)),f={stream:u&&(p=>p.body)};a&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!f[p]&&(f[p]=(g,y)=>{let $=g&&g[p];if($)return $.call(g);throw new k(`Response type '${p}' is not supported`,k.ERR_NOT_SUPPORT,y)})});const x=async p=>{if(p==null)return 0;if(d.isBlob(p))return p.size;if(d.isSpecCompliantForm(p))return(await new s(C.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(d.isArrayBufferView(p)||d.isArrayBuffer(p))return p.byteLength;if(d.isURLSearchParams(p)&&(p=p+""),d.isString(p))return(await l(p)).byteLength},v=async(p,g)=>{const y=d.toFiniteNumber(p.getContentLength());return y??x(g)};return async p=>{let{url:g,method:y,data:$,signal:A,cancelToken:N,timeout:b,onDownloadProgress:S,onUploadProgress:O,responseType:M,headers:Ee,withCredentials:le="same-origin",fetchOptions:Xe}=Wt(p);M=M?(M+"").toLowerCase():"text";let de=Pr([A,N&&N.toAbortSignal()],b),ee=null;const V=de&&de.unsubscribe&&(()=>{de.unsubscribe()});let Ze;try{if(O&&h&&y!=="get"&&y!=="head"&&(Ze=await v(Ee,$))!==0){let q=new s(g,{method:"POST",body:$,duplex:"half"}),Z;if(d.isFormData($)&&(Z=q.headers.get("content-type"))&&Ee.setContentType(Z),q.body){const[_e,ue]=it(Ze,xe(ct(O)));$=dt(q.body,ut,_e,ue)}}d.isString(le)||(le=le?"include":"omit");const F=o&&"credentials"in s.prototype,Ge={...Xe,signal:de,method:y.toUpperCase(),headers:Ee.normalize().toJSON(),body:$,duplex:"half",credentials:F?le:void 0};ee=o&&new s(g,Ge);let z=await(o?t(ee,Xe):t(g,Ge));const Qe=u&&(M==="stream"||M==="response");if(u&&(S||Qe&&V)){const q={};["status","statusText","headers"].forEach(Ye=>{q[Ye]=z[Ye]});const Z=d.toFiniteNumber(z.headers.get("content-length")),[_e,ue]=S&&it(Z,xe(ct(S),!0))||[];z=new r(dt(z.body,ut,_e,()=>{ue&&ue(),V&&V()}),q)}M=M||"text";let ms=await f[d.findKey(f,M)||"text"](z,p);return!Qe&&V&&V(),await new Promise((q,Z)=>{Vt(q,Z,{data:ms,headers:T.from(z.headers),status:z.status,statusText:z.statusText,config:p,request:ee})})}catch(F){throw V&&V(),F&&F.name==="TypeError"&&/Load failed|fetch/i.test(F.message)?Object.assign(new k("Network Error",k.ERR_NETWORK,p,ee),{cause:F.cause||F}):k.from(F,F&&F.code,p,ee)}}},Ur=new Map,Xt=e=>{let t=d.merge.call({skipUndefined:!0},Kt,e?e.env:null);const{fetch:s,Request:r,Response:a}=t,o=[r,a,s];let n=o.length,c=n,l,h,u=Ur;for(;c--;)l=o[c],h=u.get(l),h===void 0&&u.set(l,h=c?new Map:Lr(t)),u=h;return h};Xt();const De={http:nr,xhr:Or,fetch:{get:Xt}};d.forEach(De,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const ft=e=>`- ${e}`,zr=e=>d.isFunction(e)||e===null||e===!1,Zt={getAdapter:(e,t)=>{e=d.isArray(e)?e:[e];const{length:s}=e;let r,a;const o={};for(let n=0;n<s;n++){r=e[n];let c;if(a=r,!zr(r)&&(a=De[(c=String(r)).toLowerCase()],a===void 0))throw new k(`Unknown adapter '${c}'`);if(a&&(d.isFunction(a)||(a=a.get(t))))break;o[c||"#"+n]=a}if(!a){const n=Object.entries(o).map(([l,h])=>`adapter ${l} `+(h===!1?"is not supported by the environment":"is not available in the build"));let c=s?n.length>1?`since :
`+n.map(ft).join(`
`):" "+ft(n[0]):"as no adapter specified";throw new k("There is no suitable adapter to dispatch the request "+c,"ERR_NOT_SUPPORT")}return a},adapters:De};function Re(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Y(null,e)}function yt(e){return Re(e),e.headers=T.from(e.headers),e.data=Me.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Zt.getAdapter(e.adapter||oe.adapter,e)(e).then(function(r){return Re(e),r.data=Me.call(e,e.transformResponse,r),r.headers=T.from(r.headers),r},function(r){return It(r)||(Re(e),r&&r.response&&(r.response.data=Me.call(e,e.transformResponse,r.response),r.response.headers=T.from(r.response.headers))),Promise.reject(r)})}const Gt="1.12.1",je={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{je[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const gt={};je.transitional=function(t,s,r){function a(o,n){return"[Axios v"+Gt+"] Transitional option '"+o+"'"+n+(r?". "+r:"")}return(o,n,c)=>{if(t===!1)throw new k(a(n," has been removed"+(s?" in "+s:"")),k.ERR_DEPRECATED);return s&&!gt[n]&&(gt[n]=!0,console.warn(a(n," has been deprecated since v"+s+" and will be removed in the near future"))),t?t(o,n,c):!0}};je.spelling=function(t){return(s,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function qr(e,t,s){if(typeof e!="object")throw new k("options must be an object",k.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let a=r.length;for(;a-- >0;){const o=r[a],n=t[o];if(n){const c=e[o],l=c===void 0||n(c,o,e);if(l!==!0)throw new k("option "+o+" must be "+l,k.ERR_BAD_OPTION_VALUE);continue}if(s!==!0)throw new k("Unknown option "+o,k.ERR_BAD_OPTION)}}const ye={assertOptions:qr,validators:je},B=ye.validators;let K=class{constructor(t){this.defaults=t||{},this.interceptors={request:new at,response:new at}}async request(t,s){try{return await this._request(t,s)}catch(r){if(r instanceof Error){let a={};Error.captureStackTrace?Error.captureStackTrace(a):a=new Error;const o=a.stack?a.stack.replace(/^.+\n/,""):"";try{r.stack?o&&!String(r.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+o):r.stack=o}catch{}}throw r}}_request(t,s){typeof t=="string"?(s=s||{},s.url=t):s=t||{},s=X(this.defaults,s);const{transitional:r,paramsSerializer:a,headers:o}=s;r!==void 0&&ye.assertOptions(r,{silentJSONParsing:B.transitional(B.boolean),forcedJSONParsing:B.transitional(B.boolean),clarifyTimeoutError:B.transitional(B.boolean)},!1),a!=null&&(d.isFunction(a)?s.paramsSerializer={serialize:a}:ye.assertOptions(a,{encode:B.function,serialize:B.function},!0)),s.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?s.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:s.allowAbsoluteUrls=!0),ye.assertOptions(s,{baseUrl:B.spelling("baseURL"),withXsrfToken:B.spelling("withXSRFToken")},!0),s.method=(s.method||this.defaults.method||"get").toLowerCase();let n=o&&d.merge(o.common,o[s.method]);o&&d.forEach(["delete","get","head","post","put","patch","common"],p=>{delete o[p]}),s.headers=T.concat(n,o);const c=[];let l=!0;this.interceptors.request.forEach(function(g){typeof g.runWhen=="function"&&g.runWhen(s)===!1||(l=l&&g.synchronous,c.unshift(g.fulfilled,g.rejected))});const h=[];this.interceptors.response.forEach(function(g){h.push(g.fulfilled,g.rejected)});let u,f=0,x;if(!l){const p=[yt.bind(this),void 0];for(p.unshift(...c),p.push(...h),x=p.length,u=Promise.resolve(s);f<x;)u=u.then(p[f++],p[f++]);return u}x=c.length;let v=s;for(f=0;f<x;){const p=c[f++],g=c[f++];try{v=p(v)}catch(y){g.call(this,y);break}}try{u=yt.call(this,v)}catch(p){return Promise.reject(p)}for(f=0,x=h.length;f<x;)u=u.then(h[f++],h[f++]);return u}getUri(t){t=X(this.defaults,t);const s=Jt(t.baseURL,t.url,t.allowAbsoluteUrls);return zt(s,t.params,t.paramsSerializer)}};d.forEach(["delete","get","head","options"],function(t){K.prototype[t]=function(s,r){return this.request(X(r||{},{method:t,url:s,data:(r||{}).data}))}});d.forEach(["post","put","patch"],function(t){function s(r){return function(o,n,c){return this.request(X(c||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:n}))}}K.prototype[t]=s(),K.prototype[t+"Form"]=s(!0)});let Hr=class Qt{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let s;this.promise=new Promise(function(o){s=o});const r=this;this.promise.then(a=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](a);r._listeners=null}),this.promise.then=a=>{let o;const n=new Promise(c=>{r.subscribe(c),o=c}).then(a);return n.cancel=function(){r.unsubscribe(o)},n},t(function(o,n,c){r.reason||(r.reason=new Y(o,n,c),s(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const s=this._listeners.indexOf(t);s!==-1&&this._listeners.splice(s,1)}toAbortSignal(){const t=new AbortController,s=r=>{t.abort(r)};return this.subscribe(s),t.signal.unsubscribe=()=>this.unsubscribe(s),t.signal}static source(){let t;return{token:new Qt(function(a){t=a}),cancel:t}}};function Ir(e){return function(s){return e.apply(null,s)}}function Vr(e){return d.isObject(e)&&e.isAxiosError===!0}const Le={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Le).forEach(([e,t])=>{Le[t]=e});function Yt(e){const t=new K(e),s=At(K.prototype.request,t);return d.extend(s,K.prototype,t,{allOwnKeys:!0}),d.extend(s,t,null,{allOwnKeys:!0}),s.create=function(a){return Yt(X(e,a))},s}const E=Yt(oe);E.Axios=K;E.CanceledError=Y;E.CancelToken=Hr;E.isCancel=It;E.VERSION=Gt;E.toFormData=Ne;E.AxiosError=k;E.Cancel=E.CanceledError;E.all=function(t){return Promise.all(t)};E.spread=Ir;E.isAxiosError=Vr;E.mergeConfig=X;E.AxiosHeaders=T;E.formToJSON=e=>Ht(d.isHTMLForm(e)?new FormData(e):e);E.getAdapter=Zt.getAdapter;E.HttpStatusCode=Le;E.default=E;const{Axios:Ko,AxiosError:Xo,CanceledError:Zo,isCancel:Go,CancelToken:Qo,VERSION:Yo,all:ei,Cancel:ti,isAxiosError:si,spread:ri,toFormData:ni,AxiosHeaders:ai,HttpStatusCode:oi,formToJSON:ii,getAdapter:ci,mergeConfig:li}=E,j=E.create({baseURL:"https://nodejs.service.callshivai.com/api/",timeout:1e4}),Jr=e=>{const t=localStorage.getItem("Authorization"),s=localStorage.getItem("user-type");return console.log(s,"userType in apiService"),t&&(e.headers.Authorization=`Bearer ${t}`),e};j.interceptors.request.use(Jr);const Wr=e=>{const t=e?.response?.status,s=e?.response?.data;return console.log("Error Status:",t),console.log("Error Data:",s),e.response?t===401&&s?.message==="Access Denied. No token provided."?console.warn("🔐 Unauthorized, redirecting to homepage..."):t>=400&&t<500?console.warn("⚠️ Client error:",t,e.response.data.message):console.error("❌ Server error:",t,e.response?.data?.message||e.message):console.error("🚨 Network error:",e.message),Promise.reject(e)};j.interceptors.response.use(e=>e,Wr);const ie={get:(e,t)=>j.get(e,{params:t}),post:(e,t)=>j.post(e,t),put:(e,t)=>j.put(e,t),delete:e=>j.delete(e),patch:(e,t)=>j.patch(e,t)},di={...ie,getAllUsers:async()=>{try{console.log("🔍 Fetching all users...");const e=await j.get("/v1/users");return console.log("✅ Users fetched successfully:",e.data),e.data}catch(e){console.error("❌ Error fetching users:",e);try{const t=await j.get("/v1/admin/users");return console.log("✅ Users fetched via fallback endpoint:",t.data),t.data}catch(t){throw console.error("❌ Fallback endpoint also failed:",t),e}}},deleteUser:async e=>{try{console.log(`🗑️ Deleting user with ID: ${e}`);const t=await j.delete(`/v1/users/${e}`);return console.log("✅ User deleted successfully:",t.data),t.data}catch(t){throw console.error("❌ Error deleting user:",t),t}},getOnboardingByUserId:async e=>{try{console.log(`🔍 Fetching onboarding data for user: ${e}`);const t=await j.get(`/v1/admin/onboarding/${e}`);return console.log("✅ Onboarding data fetched successfully:",t.data),t.data}catch(t){console.error("❌ Error fetching onboarding data:",t);try{const s=await j.get(`/v1/onboarding/user/${e}`);return console.log("✅ Onboarding data fetched via fallback endpoint:",s.data),s.data}catch(s){throw console.error("❌ Fallback endpoint also failed:",s),t}}},getAllOnboarding:async()=>{try{console.log("🔍 Fetching all onboarding data...");const e=await j.get("/v1/admin/onboarding");return console.log("✅ All onboarding data fetched successfully:",e.data),e.data}catch(e){console.error("❌ Error fetching all onboarding data:",e);try{const t=await j.get("/v1/onboarding");return console.log("✅ Onboarding data fetched via fallback endpoint:",t.data),t.data}catch(t){throw console.error("❌ Fallback endpoint also failed:",t),e}}},updateOnboardingData:async(e,t)=>{try{console.log(`🔄 Updating onboarding data for ID: ${e}`);const s=await j.put(`/v1/admin/onboarding/${e}`,t);return console.log("✅ Onboarding data updated successfully:",s.data),s.data}catch(s){throw console.error("❌ Error updating onboarding data:",s),s}},getFile:async e=>{try{console.log(`📁 Fetching file with ID: ${e}`);const t=await j.get(`/v1/files/${e}`);return console.log("✅ File data fetched successfully:",t.data),t.data}catch(t){console.error("❌ Error fetching file:",t);try{const s=await j.get(`/v1/admin/files/${e}`);return console.log("✅ File data fetched via fallback:",s.data),s.data}catch(s){throw console.error("❌ Fallback file fetch also failed:",s),t}}},downloadFile:async e=>{try{console.log(`⬇️ Downloading file with ID: ${e}`);const t=await j.get(`/v1/files/${e}/download`,{responseType:"blob"});return console.log("✅ File downloaded successfully"),t}catch(t){console.error("❌ Error downloading file:",t);try{const s=await j.get(`/v1/admin/files/${e}/download`,{responseType:"blob"});return console.log("✅ File downloaded via fallback"),s}catch(s){throw console.error("❌ Fallback file download also failed:",s),t}}},downloadFileByS3Key:async e=>{try{console.log(`⬇️ Downloading file with S3 key: ${e}`);const t=await j.post("/v1/onboarding/download",{s3_key:e},{responseType:"blob"});return console.log("✅ File downloaded successfully"),t}catch(t){throw console.error("❌ Error downloading file by S3 key:",t),t}},approveClient:async e=>{try{console.log(`✅ Approving client with ID: ${e}`);const t=await j.patch(`/v1/onboarding/${e}/status`,{status:"approved"});return console.log("✅ Client approved successfully:",t.data),t.data}catch(t){throw console.error("❌ Error approving client:",t),t}},rejectClient:async(e,t="Application rejected by admin")=>{try{console.log(`❌ Rejecting client with ID: ${e}`);const s=await j.patch(`/v1/onboarding/${e}/status`,{status:"rejected",rejectionReason:"Not meeting criteria"});return console.log("✅ Client rejected successfully:",s.data),s.data}catch(s){throw console.error("❌ Error rejecting client:",s),s}},updateClientStatus:async(e,t,s=null)=>{try{console.log(`🔄 Updating client status to ${t} for ID: ${e}`);const r={status:t};s&&(r.rejectionReason=s);const a=await j.patch(`/v1/onboarding/${e}/status`,r);return console.log("✅ Client status updated successfully:",a.data),a.data}catch(r){throw console.error("❌ Error updating client status:",r),r}},updateClientData:async(e,t)=>{try{console.log(`🔄 Updating client data for ID: ${e}`);const s=await j.put(`/v1/onboarding/${e}`,t);return console.log("✅ Client data updated successfully:",s.data),s.data}catch(s){throw console.error("❌ Error updating client data:",s),s}},uploadOnboardingFiles:async e=>{try{console.log(`📤 Uploading ${e.length} files...`);const t=new FormData;e.forEach(r=>{t.append("files",r)});const s=await j.post("/v1/onboarding/upload",t,{headers:{"Content-Type":"multipart/form-data"}});return console.log("✅ Files uploaded successfully:",s.data),s.data}catch(t){throw console.error("❌ Error uploading files:",t),t}},getAllAgents:async()=>{try{console.log("🤖 Fetching all AI agents...");const e=await j.get("/v1/agents/all");return console.log("✅ AI agents fetched successfully:",e.data),e.data}catch(e){throw console.error("❌ Error fetching AI agents:",e),e}},getAgentsById:async e=>{try{console.log(`🤖 Fetching agent with ID: ${e}...`);const t=await j.get(`/v1/agents/user/${e}`);if(t.data.success&&t.data.data)return{...t.data.data,stats:t.data.data.stats||{conversations:0,successRate:0,avgResponseTime:0,activeUsers:0}};throw new Error(t.data.message||"Agent not found")}catch(t){throw console.error("❌ Error fetching agent:",t),t}},getAgentSessions:async e=>{try{console.log(`📋 Fetching sessions for agent ID: ${e}...`);const t=await j.get(`/v1/agent-sessions/agent/${e}`);if(t.data.success&&t.data.data)return t.data.data;throw new Error(t.data.message||"Failed to fetch agent sessions")}catch(t){throw console.error("❌ Error fetching agent sessions:",t),t}},getSessionTranscripts:async e=>{try{console.log(`📜 Fetching transcripts for session ID: ${e}...`);const t=await j.get(`/v1/agent-sessions/${e}/transcripts`);if(t.data.success&&t.data.data)return t.data.data;throw new Error(t.data.message||"Failed to fetch session transcripts")}catch(t){throw console.error("❌ Error fetching session transcripts:",t),t}},getCallSummary:async e=>{try{console.log(`📊 Fetching call summary for agent ID: ${e}...`);const t=await j.get(`v1/leads/agent/${e}`);return console.log("✅ Call summary fetched successfully:",t.data),t.data}catch(t){throw console.error("❌ Error fetching call summary:",t),t}}};let Kr={data:""},Xr=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Kr,Zr=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Gr=/\/\*[^]*?\*\/|  +/g,xt=/\n+/g,H=(e,t)=>{let s="",r="",a="";for(let o in e){let n=e[o];o[0]=="@"?o[1]=="i"?s=o+" "+n+";":r+=o[1]=="f"?H(n,o):o+"{"+H(n,o[1]=="k"?"":t)+"}":typeof n=="object"?r+=H(n,t?t.replace(/([^,])+/g,c=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,c):c?c+" "+l:l)):o):n!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=H.p?H.p(o,n):o+":"+n+";")}return s+(t&&a?t+"{"+a+"}":a)+r},L={},es=e=>{if(typeof e=="object"){let t="";for(let s in e)t+=s+es(e[s]);return t}return e},Qr=(e,t,s,r,a)=>{let o=es(e),n=L[o]||(L[o]=(l=>{let h=0,u=11;for(;h<l.length;)u=101*u+l.charCodeAt(h++)>>>0;return"go"+u})(o));if(!L[n]){let l=o!==e?e:(h=>{let u,f,x=[{}];for(;u=Zr.exec(h.replace(Gr,""));)u[4]?x.shift():u[3]?(f=u[3].replace(xt," ").trim(),x.unshift(x[0][f]=x[0][f]||{})):x[0][u[1]]=u[2].replace(xt," ").trim();return x[0]})(e);L[n]=H(a?{["@keyframes "+n]:l}:l,s?"":"."+n)}let c=s&&L.g?L.g:null;return s&&(L.g=L[n]),((l,h,u,f)=>{f?h.data=h.data.replace(f,l):h.data.indexOf(l)===-1&&(h.data=u?l+h.data:h.data+l)})(L[n],t,r,c),n},Yr=(e,t,s)=>e.reduce((r,a,o)=>{let n=t[o];if(n&&n.call){let c=n(s),l=c&&c.props&&c.props.className||/^go/.test(c)&&c;n=l?"."+l:c&&typeof c=="object"?c.props?"":H(c,""):c===!1?"":c}return r+a+(n??"")},"");function $e(e){let t=this||{},s=e.call?e(t.p):e;return Qr(s.unshift?s.raw?Yr(s,[].slice.call(arguments,1),t.p):s.reduce((r,a)=>Object.assign(r,a&&a.call?a(t.p):a),{}):s,Xr(t.target),t.g,t.o,t.k)}let ts,Ue,ze;$e.bind({g:1});let U=$e.bind({k:1});function en(e,t,s,r){H.p=t,ts=e,Ue=s,ze=r}function I(e,t){let s=this||{};return function(){let r=arguments;function a(o,n){let c=Object.assign({},o),l=c.className||a.className;s.p=Object.assign({theme:Ue&&Ue()},c),s.o=/ *go\d+/.test(l),c.className=$e.apply(s,r)+(l?" "+l:"");let h=e;return e[0]&&(h=c.as||e,delete c.as),ze&&h[0]&&ze(c),ts(h,c)}return a}}var tn=e=>typeof e=="function",be=(e,t)=>tn(e)?e(t):e,sn=(()=>{let e=0;return()=>(++e).toString()})(),ss=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),rn=20,Ke="default",rs=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(n=>n.id===t.toast.id?{...n,...t.toast}:n)};case 2:let{toast:r}=t;return rs(e,{type:e.toasts.find(n=>n.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(n=>n.id===a||a===void 0?{...n,dismissed:!0,visible:!1}:n)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(n=>n.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(n=>({...n,pauseDuration:n.pauseDuration+o}))}}},ge=[],ns={toasts:[],pausedAt:void 0,settings:{toastLimit:rn}},D={},as=(e,t=Ke)=>{D[t]=rs(D[t]||ns,e),ge.forEach(([s,r])=>{s===t&&r(D[t])})},os=e=>Object.keys(D).forEach(t=>as(e,t)),nn=e=>Object.keys(D).find(t=>D[t].toasts.some(s=>s.id===e)),Se=(e=Ke)=>t=>{as(t,e)},an={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},on=(e={},t=Ke)=>{let[s,r]=w.useState(D[t]||ns),a=w.useRef(D[t]);w.useEffect(()=>(a.current!==D[t]&&r(D[t]),ge.push([t,r]),()=>{let n=ge.findIndex(([c])=>c===t);n>-1&&ge.splice(n,1)}),[t]);let o=s.toasts.map(n=>{var c,l,h;return{...e,...e[n.type],...n,removeDelay:n.removeDelay||((c=e[n.type])==null?void 0:c.removeDelay)||e?.removeDelay,duration:n.duration||((l=e[n.type])==null?void 0:l.duration)||e?.duration||an[n.type],style:{...e.style,...(h=e[n.type])==null?void 0:h.style,...n.style}}});return{...s,toasts:o}},cn=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:s?.id||sn()}),ce=e=>(t,s)=>{let r=cn(t,e,s);return Se(r.toasterId||nn(r.id))({type:2,toast:r}),r.id},_=(e,t)=>ce("blank")(e,t);_.error=ce("error");_.success=ce("success");_.loading=ce("loading");_.custom=ce("custom");_.dismiss=(e,t)=>{let s={type:3,toastId:e};t?Se(t)(s):os(s)};_.dismissAll=e=>_.dismiss(void 0,e);_.remove=(e,t)=>{let s={type:4,toastId:e};t?Se(t)(s):os(s)};_.removeAll=e=>_.remove(void 0,e);_.promise=(e,t,s)=>{let r=_.loading(t.loading,{...s,...s?.loading});return typeof e=="function"&&(e=e()),e.then(a=>{let o=t.success?be(t.success,a):void 0;return o?_.success(o,{id:r,...s,...s?.success}):_.dismiss(r),a}).catch(a=>{let o=t.error?be(t.error,a):void 0;o?_.error(o,{id:r,...s,...s?.error}):_.dismiss(r)}),e};var ln=1e3,dn=(e,t="default")=>{let{toasts:s,pausedAt:r}=on(e,t),a=w.useRef(new Map).current,o=w.useCallback((f,x=ln)=>{if(a.has(f))return;let v=setTimeout(()=>{a.delete(f),n({type:4,toastId:f})},x);a.set(f,v)},[]);w.useEffect(()=>{if(r)return;let f=Date.now(),x=s.map(v=>{if(v.duration===1/0)return;let p=(v.duration||0)+v.pauseDuration-(f-v.createdAt);if(p<0){v.visible&&_.dismiss(v.id);return}return setTimeout(()=>_.dismiss(v.id,t),p)});return()=>{x.forEach(v=>v&&clearTimeout(v))}},[s,r,t]);let n=w.useCallback(Se(t),[t]),c=w.useCallback(()=>{n({type:5,time:Date.now()})},[n]),l=w.useCallback((f,x)=>{n({type:1,toast:{id:f,height:x}})},[n]),h=w.useCallback(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=w.useCallback((f,x)=>{let{reverseOrder:v=!1,gutter:p=8,defaultPosition:g}=x||{},y=s.filter(N=>(N.position||g)===(f.position||g)&&N.height),$=y.findIndex(N=>N.id===f.id),A=y.filter((N,b)=>b<$&&N.visible).length;return y.filter(N=>N.visible).slice(...v?[A+1]:[0,A]).reduce((N,b)=>N+(b.height||0)+p,0)},[s]);return w.useEffect(()=>{s.forEach(f=>{if(f.dismissed)o(f.id,f.removeDelay);else{let x=a.get(f.id);x&&(clearTimeout(x),a.delete(f.id))}})},[s,o]),{toasts:s,handlers:{updateHeight:l,startPause:c,endPause:h,calculateOffset:u}}},un=U`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,hn=U`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,pn=U`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,mn=I("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${un} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${hn} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${pn} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,fn=U`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,yn=I("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${fn} 1s linear infinite;
`,gn=U`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,xn=U`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,bn=I("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${gn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${xn} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,wn=I("div")`
  position: absolute;
`,kn=I("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,vn=U`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Nn=I("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${vn} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,jn=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return t!==void 0?typeof t=="string"?w.createElement(Nn,null,t):t:s==="blank"?null:w.createElement(kn,null,w.createElement(yn,{...r}),s!=="loading"&&w.createElement(wn,null,s==="error"?w.createElement(mn,{...r}):w.createElement(bn,{...r})))},$n=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Sn=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,En="0%{opacity:0;} 100%{opacity:1;}",_n="0%{opacity:1;} 100%{opacity:0;}",An=I("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Cn=I("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Mn=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=ss()?[En,_n]:[$n(s),Sn(s)];return{animation:t?`${U(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${U(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Rn=w.memo(({toast:e,position:t,style:s,children:r})=>{let a=e.height?Mn(e.position||t||"top-center",e.visible):{opacity:0},o=w.createElement(jn,{toast:e}),n=w.createElement(Cn,{...e.ariaProps},be(e.message,e));return w.createElement(An,{className:e.className,style:{...a,...s,...e.style}},typeof r=="function"?r({icon:o,message:n}):w.createElement(w.Fragment,null,o,n))});en(w.createElement);var Tn=({id:e,className:t,style:s,onHeightUpdate:r,children:a})=>{let o=w.useCallback(n=>{if(n){let c=()=>{let l=n.getBoundingClientRect().height;r(e,l)};c(),new MutationObserver(c).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return w.createElement("div",{ref:o,className:t,style:s},a)},On=(e,t)=>{let s=e.includes("top"),r=s?{top:0}:{bottom:0},a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ss()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...r,...a}},Pn=$e`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,pe=16,ui=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:a,toasterId:o,containerStyle:n,containerClassName:c})=>{let{toasts:l,handlers:h}=dn(s,o);return w.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:pe,left:pe,right:pe,bottom:pe,pointerEvents:"none",...n},className:c,onMouseEnter:h.startPause,onMouseLeave:h.endPause},l.map(u=>{let f=u.position||t,x=h.calculateOffset(u,{reverseOrder:e,gutter:r,defaultPosition:t}),v=On(f,x);return w.createElement(Tn,{id:u.id,key:u.id,onHeightUpdate:h.updateHeight,className:u.visible?Pn:"",style:v},u.type==="custom"?be(u.message,u):a?a(u):w.createElement(Rn,{toast:u,position:f}))}))},Fn=_;const J=E.create({baseURL:"https://shivai-demo-call-backend.onrender.com",timeout:1e4}),Bn=e=>{const t=localStorage.getItem("Authorization"),s=localStorage.getItem("user-type");return console.log(s,"userType in apiService"),t&&(e.headers.Authorization=`Bearer ${t}`),e};J.interceptors.request.use(Bn);const Dn=e=>{const t=e?.response?.status,s=e?.response?.data;return console.log("Error Status:",t),console.log("Error Data:",s),e.response?t===401&&s?.message==="Access Denied. No token provided."?console.warn("🔐 Unauthorized, redirecting to homepage..."):t>=400&&t<500?console.warn("⚠️ Client error:",t,e.response.data.message):console.error("❌ Server error:",t,e.response?.data?.message||e.message):console.error("🚨 Network error:",e.message),Promise.reject(e)};J.interceptors.response.use(e=>e,Dn);const is={get:(e,t)=>J.get(e,{params:t}),post:(e,t)=>J.post(e,t),put:(e,t)=>J.put(e,t),delete:e=>J.delete(e),patch:(e,t)=>J.patch(e,t)},Ln=async e=>await ie.get("v1/auth/me",e),Un=async e=>await is.get(`analytics/sessions?${e}`),zn=async e=>await ie.get(`v1/sessions/${e}`),qn=async e=>await is.get(`analytics/session/${e}/transcripts`),Hn=async(e="")=>{const t=e?`/v1/agent-sessions?${e}`:"/v1/agent-sessions";return await ie.get(t)},In=async e=>await ie.get(`v1/agent-sessions/${e}`),Vn={getUser:Ln,getAllSessionDemo:Un,getSessionById:zn,getSessionTranscript:qn,getAgentSessions:Hn,getAgentSessionsTranscript:In},cs=w.createContext(),ls=()=>{const e=w.useContext(cs);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Jn=({children:e})=>{const[t,s]=w.useState("light");console.log(t);const r=()=>{s(n=>n==="light"?"dark":"light")},o={dark:{bg:"bg-[#1a1a1a]",cardBg:"bg-[#2a2a2a]",border:"border-[#404040]",text:"text-white",textSecondary:"text-[#a0a0a0]",hover:"hover:bg-[#404040]",sidebarBg:"bg-[#2a2a2a]",topBarBg:"bg-[#2a2a2a]",gradient:"from-[#1a1a1a] to-[#2a2a2a]",searchBg:"bg-[#333333]",activeBg:"bg-[#404040]",activeBorder:"border-[#5a5a59]",shadow:"shadow-lg shadow-black/20",cardShadow:"shadow-lg shadow-black/10"},light:{bg:"bg-[#F1F5F9]",cardBg:"bg-white",border:"border-[#e0e0e0]",text:"text-[#333333]",textSecondary:"text-[#5A5A59]",hover:"hover:bg-[#f8f8f8]",sidebarBg:"bg-white",topBarBg:"bg-white",gradient:"from-[#F0F0F0] to-white",searchBg:"bg-[#f8f8f8]",activeBg:"bg-[#f8f8f8]",activeBorder:"border-[#d0d0d0]",shadow:"shadow-md shadow-gray-200/50",cardShadow:"shadow-md shadow-gray-200/30"}}[t];return i.jsx(cs.Provider,{value:{theme:t,toggleTheme:r,currentTheme:o},children:e})};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wn=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Kn=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,s,r)=>r?r.toUpperCase():s.toLowerCase()),bt=e=>{const t=Kn(e);return t.charAt(0).toUpperCase()+t.slice(1)},ds=(...e)=>e.filter((t,s,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===s).join(" ").trim(),Xn=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Zn={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gn=w.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:r,className:a="",children:o,iconNode:n,...c},l)=>w.createElement("svg",{ref:l,...Zn,width:t,height:t,stroke:e,strokeWidth:r?Number(s)*24/Number(t):s,className:ds("lucide",a),...!o&&!Xn(c)&&{"aria-hidden":"true"},...c},[...n.map(([h,u])=>w.createElement(h,u)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(e,t)=>{const s=w.forwardRef(({className:r,...a},o)=>w.createElement(Gn,{ref:o,iconNode:t,className:ds(`lucide-${Wn(bt(e))}`,`lucide-${e}`,r),...a}));return s.displayName=bt(e),s};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qn=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],us=m("activity",Qn);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yn=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],hi=m("arrow-down",Yn);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ea=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],pi=m("arrow-left",ea);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],mi=m("award",ta);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sa=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],wt=m("bell",sa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ra=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],fi=m("book-open",ra);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],hs=m("bot",na);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],kt=m("briefcase",aa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]],yi=m("building-2",oa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],gi=m("calendar",ia);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],ps=m("chart-column",ca);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]],xi=m("check-check",la);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],bi=m("check",da);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],wi=m("chevron-down",ua);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],vt=m("chevron-right",ha);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],ma=m("circle-alert",pa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],ya=m("circle-check-big",fa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],qe=m("circle-question-mark",ga);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xa=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],ki=m("circle-x",xa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],vi=m("clock",ba);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wa=[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]],Ni=m("code",wa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ka=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],ji=m("copy",ka);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const va=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]],He=m("credit-card",va);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Na=[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]],Nt=m("crown",Na);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],$i=m("database",ja);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $a=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],Sa=m("dollar-sign",$a);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ea=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],Si=m("download",Ea);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _a=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],Aa=m("external-link",_a);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ca=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],Ei=m("eye-off",Ca);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ma=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Te=m("eye",Ma);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ra=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],_i=m("file-text",Ra);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ta=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Ai=m("globe",Ta);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oa=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]],Ci=m("grid-3x3",Oa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pa=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],Fa=m("house",Pa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ba=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],Mi=m("info",Ba);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Da=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],Ri=m("key",Da);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const La=[["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}]],Ti=m("list-checks",La);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ua=[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]],Oi=m("list",Ua);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const za=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Pi=m("loader-circle",za);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qa=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Fi=m("lock",qa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ha=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],jt=m("log-out",Ha);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ia=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],Bi=m("mail",Ia);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Va=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],Di=m("map-pin",Va);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ja=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]],Li=m("maximize",Ja);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wa=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],Ka=m("menu",Wa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xa=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],Ui=m("message-circle",Xa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Za=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],zi=m("message-square",Za);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ga=[["path",{d:"m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",key:"80a601"}],["path",{d:"M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",key:"j0ngtp"}],["circle",{cx:"16",cy:"7",r:"5",key:"d08jfb"}]],qi=m("mic-vocal",Ga);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qa=[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]],Hi=m("mic",Qa);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ya=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],Ii=m("monitor",Ya);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],$t=m("moon",eo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const to=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],so=m("package",to);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ro=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],Vi=m("palette",ro);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const no=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],Ji=m("pause",no);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ao=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],Wi=m("phone",ao);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oo=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Ki=m("play",oo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const io=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Xi=m("plus",io);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const co=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Zi=m("refresh-cw",co);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lo=[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]],Gi=m("rocket",lo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Qi=m("rotate-ccw",uo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],po=m("search",ho);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mo=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],Yi=m("send",mo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=[["path",{d:"M14 17H5",key:"gfn3mx"}],["path",{d:"M19 7h-9",key:"6i9tg"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]],ec=m("settings-2",fo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],go=m("settings",yo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],tc=m("shield-check",xo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bo=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],sc=m("shield",bo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=[["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}],["path",{d:"M3.103 6.034h17.794",key:"awc11p"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",key:"o988cm"}]],rc=m("shopping-bag",wo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ko=[["path",{d:"M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",key:"15892j"}],["path",{d:"M3 20V4",key:"1ptbpl"}]],nc=m("skip-back",ko);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vo=[["path",{d:"M21 4v16",key:"7j8fe9"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"zs4d6"}]],ac=m("skip-forward",vo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const No=[["rect",{width:"3",height:"8",x:"13",y:"2",rx:"1.5",key:"diqz80"}],["path",{d:"M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5",key:"183iwg"}],["rect",{width:"3",height:"8",x:"8",y:"14",rx:"1.5",key:"hqg7r1"}],["path",{d:"M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5",key:"76g71w"}],["rect",{width:"8",height:"3",x:"14",y:"13",rx:"1.5",key:"1kmz0a"}],["path",{d:"M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5",key:"jc4sz0"}],["rect",{width:"8",height:"3",x:"2",y:"8",rx:"1.5",key:"1omvl4"}],["path",{d:"M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5",key:"16f3cl"}]],oc=m("slack",No);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jo=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],ic=m("smartphone",jo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],cc=m("square-pen",$o);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const So=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],lc=m("star",So);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eo=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],St=m("sun",Eo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _o=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["line",{x1:"12",x2:"12.01",y1:"18",y2:"18",key:"1dp563"}]],dc=m("tablet",_o);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ao=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],uc=m("target",Ao);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Co=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],hc=m("trash-2",Co);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mo=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],Ro=m("trending-up",Mo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const To=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]],Oe=m("user-plus",To);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Et=m("user",Oo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Po=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Ie=m("users",Po);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fo=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],pc=m("volume-2",Fo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bo=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],mc=m("volume-x",Bo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Do=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],_t=m("x",Do);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lo=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Uo=m("zap",Lo),zo="/ShivaiLogo.svg",qo=()=>{const[e,t]=w.useState(!1),[s,r]=w.useState(!1),[a,o]=w.useState(""),{theme:n,toggleTheme:c,currentTheme:l}=ls(),h=fs(),[u,f]=w.useState({name:"",email:""}),x=[{id:"dashboard",icon:Fa,label:"Dashboard",path:"/dashboard"},{id:"clients",icon:Ie,label:"Client Management",path:"/dashboard/clients",badge:24},{id:"ai-employees",icon:us,label:"AI Employee Stats",path:"/dashboard/ai-employees",badge:"NEW"},{id:"widgets",icon:hs,label:"Widget Management",path:"/dashboard/widgets",badge:"NEW"},{id:"transactions",icon:He,label:"Transactions",path:"/dashboard/transactions",badge:12},{id:"support",icon:qe,label:"Support Tickets",path:"/dashboard/support",badge:5},{id:"analytics",icon:ps,label:"Analytics",path:"/dashboard/analytics"},{id:"settings",icon:go,label:"Settings",path:"/dashboard/settings"}];w.useEffect(()=>{(async()=>{const S=await v();S&&S.name&&S.email&&f({name:S.name,email:S.email})})()},[]);const v=async()=>{try{const b=await Vn.getUser();if(console.log(b),b?.data?.statusCode===200){const{name:S,email:O}=b.data.data?.user;return{name:S||"Admin User",email:O||"admin@shivai.com"}}return{name:"Admin User",email:"admin@shivai.com"}}catch(b){return console.error("Error fetching admin info:",b),(b?.response?.data?.statusCode===401&&b.response.data.message==="Access token is required"||b.response.data.message==="Token has expired"||b.response.data.message==="User account not found or deactivated")&&(Fn.error("Session expired. Please log in again."),localStorage.removeItem("Authorization"),h("/")),{name:"Admin User",email:"admin@shivai.com"}}},p=b=>{h(b),t(!1)},g=()=>{localStorage.removeItem("Authorization"),h("/")},y=()=>window.location.pathname,$=()=>{const b=y();return b.includes("/dashboard/clients/")&&b.split("/").length>3?"Client Details":{"/dashboard":"Dashboard","/dashboard/clients":"Client Management","/dashboard/ai-employees":"AI Employee Stats","/dashboard/widgets":"Widget Management","/dashboard/transactions":"Transactions","/dashboard/support":"Support Tickets","/dashboard/analytics":"Analytics","/dashboard/settings":"Settings"}[b]||"Dashboard"},A=()=>i.jsx("div",{className:`lg:hidden fixed top-0 left-0 mb-4 right-0 z-30 flex flex-col ${l.cardBg} backdrop-blur-md border-b ${l.border}`,style:{minHeight:"px"},children:i.jsxs("div",{className:"flex items-center justify-between px-4 py-2 border-current",children:[i.jsxs("div",{className:"flex items-center ",children:[i.jsx("div",{onClick:()=>t(!e),className:"mr-2",children:e?i.jsx(_t,{className:`w-5 h-5 ${l.text}`}):i.jsx(Ka,{className:`w-5 h-5 ${l.text}`})}),i.jsx("span",{className:`text-sm font-medium ${l.text}`,children:"Dashboard"})]}),i.jsxs("div",{className:"flex items-center gap-4 justify-end",children:[i.jsx("div",{onClick:c,className:` rounded-lg ${l.hover} transition-all duration-200`,children:n==="dark"?i.jsx(St,{className:`w-5 h-5 ${l.textSecondary}`}):i.jsx($t,{className:`w-5 h-5 ${l.textSecondary}`})}),i.jsxs("div",{className:`relative  rounded-lg ${l.hover} transition-all duration-200`,children:[i.jsx(wt,{className:`w-5 h-5 ${l.textSecondary}`}),i.jsx("span",{className:"absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"})]}),i.jsx("div",{className:`p-2 rounded-lg ${l.hover} transition-all duration-200`,children:i.jsx(Et,{className:`w-5 h-5 ${l.textSecondary}`})}),i.jsx("div",{onClick:g,className:` rounded-lg ${l.hover} transition-all duration-200`,children:i.jsx(jt,{className:`w-5 h-5 ${l.textSecondary}`})})]})]})}),N=n==="dark"?{background:"#1a1a1a"}:{background:"#F0F0F0"};return i.jsxs("div",{className:`min-h-screen ${l.text} relative overflow-hidden`,style:N,children:[n==="dark"&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"absolute inset-0",children:i.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${l.gradient}`})}),i.jsxs("div",{className:"absolute inset-0",children:[i.jsx("div",{className:"absolute top-1/4 left-1/4 w-96 h-96 bg-[#004998] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20"}),i.jsx("div",{className:"absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"})]})]}),e&&i.jsx("div",{className:"fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm",onClick:()=>t(!1)}),i.jsx("div",{className:`fixed left-0 top-0 h-full no-scrollbar border-r-1 ${l.sidebarBg} ${l.border} z-50 transform transition-all duration-300 ease-in-out ${e?"translate-x-0":"-translate-x-full"} lg:translate-x-0 ${s?"lg:w-16":"lg:w-64"} w-64`,children:i.jsxs("div",{className:"flex flex-col h-full",children:[i.jsxs("div",{className:`p-4 ${l.border} border-b`,children:[i.jsxs("div",{className:"flex items-center justify-between mb-4",children:[i.jsx("div",{className:"flex items-center gap-3",children:i.jsx("img",{src:zo,alt:"ShivAi Logo",className:`h-8 w-auto transition-opacity duration-300 ${s?"lg:opacity-0 lg:w-0":"lg:opacity-100"}`,style:n==="dark"?{filter:"brightness(0) invert(1)"}:{}})}),i.jsx("button",{onClick:()=>r(!s),className:`p-2 relative -left-2 rounded-lg ${l.hover} transition-colors ${s?"lg:block":"lg:hidden  hidden"}`,children:i.jsx(vt,{className:`w-5 h-5 ${l.text}`})}),i.jsxs("div",{className:"flex items-end  justify-end ",children:[i.jsx("div",{onClick:c,className:`p-2 rounded-lg ${l.hover} transition-colors`,title:`Switch to ${n==="dark"?"light":"dark"} mode`,children:n==="dark"?i.jsx(St,{className:`w-5 h-5 ${l.text}`}):i.jsx($t,{className:`w-5 h-5 ${l.text}`})}),i.jsx("div",{onClick:()=>t(!1),className:`p-2 rounded-lg ${l.hover} lg:hidden transition-colors`,children:i.jsx(_t,{className:`w-5 h-5 ${l.text}`})}),i.jsx("div",{onClick:()=>r(!s),className:`p-2 rounded-lg ${l.hover} hidden lg:flex transition-colors`,title:s?"Expand sidebar":"Collapse sidebar",children:i.jsx(vt,{className:`w-5 h-5 ${l.text} transition-transform duration-300 ${s?"rotate-0":"rotate-180"}`})})]})]}),i.jsx("div",{className:`relative transition-all duration-300 ${s?"lg:opacity-0 lg:h-0 lg:overflow-hidden":"lg:opacity-100"}`,children:i.jsxs("div",{className:`relative ${l.searchBg} rounded-lg ${l.border} focus-within:border-opacity-60 transition-all`,children:[i.jsx(po,{className:`absolute left-3 top-1/2 hidden lg:block transform -translate-y-1/2 w-5 h-5 ${l.textSecondary}`}),i.jsx("input",{type:"text",placeholder:"Search...",value:a,onChange:b=>o(b.target.value),className:`w-full border ${l.activeBorder} pl-9 pr-3 py-1 md:py-3 bg-transparent ${l.text} placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none rounded-lg text-[9px] md:text-sm transition-all`})]})})]}),i.jsx("nav",{className:"flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar",children:x.map(b=>{const S=b.icon,O=y(),M=O===b.path||b.id==="clients"&&O.startsWith("/dashboard/clients/");return i.jsxs("button",{onClick:()=>p(b.path),className:`w-full flex items-center transition-all duration-200 group relative ${s?"justify-center px-2 py-3":"gap-3 px-4 py-3 "} rounded-xl ${M?`${l.activeBg} ${l.text} font-medium  border ${l.activeBorder} `:`${l.textSecondary} ${l.hover}`}`,title:s?b.label:void 0,children:[i.jsx(S,{className:`w-5 h-5 flex-shrink-0 transition-colors ${M?l.text:""}`}),i.jsx("span",{className:`text-sm flex-1 text-left truncate transition-all duration-300 ${s?"lg:opacity-0 lg:w-0 lg:overflow-hidden":"lg:opacity-100"}`,children:b.label}),s&&i.jsx("div",{className:"absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none",children:b.label})]},b.id)})}),i.jsxs("div",{className:`p-4 ${l.border} border-t`,children:[i.jsxs("div",{className:`${s?`flex items-center justify-center p-3 rounded-xl ${l.hover} transition-colors cursor-pointer mb-3 group relative`:`flex items-center gap-3 p-3 rounded-xl ${l.hover} transition-colors cursor-pointer mb-3`}`,children:[i.jsx("div",{className:`w-10 h-10 ${l.bg} rounded-full flex items-center justify-center flex-shrink-0`,children:i.jsx(Et,{className:`w-5 h-5 ${l.text}`})}),!s&&i.jsxs("div",{className:"flex-1 min-w-0",children:[i.jsx("p",{className:`text-sm font-medium ${l.text} truncate`,children:u.name||"Admin User"}),i.jsx("p",{className:`text-xs ${l.textSecondary} truncate`,children:u.email})]}),s&&i.jsx("div",{className:"absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none",children:u.name||"Admin User"})]}),i.jsxs("button",{onClick:g,className:`${s?"w-full flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-200 group relative":"w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"} ${l.textSecondary} ${l.hover}`,children:[i.jsx(jt,{className:"w-5 h-5 group-hover:scale-110 transition-transform"}),!s&&i.jsx("span",{className:"font-medium text-sm",children:"Sign Out"}),s&&i.jsx("div",{className:"absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none",children:"Sign Out"})]})]})]})}),i.jsx(A,{}),i.jsx("div",{className:`transition-all duration-300 ease-in-out ml-0 ${s?"lg:ml-16":"lg:ml-64"}`,children:i.jsxs("div",{className:`min-h-screen ${l.bg}`,children:[i.jsx("div",{className:`hidden lg:block ${l.topBarBg} border-b ${l.border} px-6 py-4`,children:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsx("div",{className:"flex items-center gap-4",children:i.jsx("div",{className:`text-2xl font-semibold ${n==="light"?"text-gray-800":"text-green-400"}`,children:$()})}),i.jsx("div",{className:"flex items-center gap-4",children:i.jsxs("button",{className:`p-2 ${l.hover} rounded-lg transition-colors relative`,children:[i.jsx(wt,{className:`w-5 h-5 ${l.textSecondary}`}),i.jsx("span",{className:"absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"})]})})]})}),i.jsx("div",{className:`p-2 pt-16  md:pt-16 lg:pt-6 md:p-4 lg:p-6 ${l.bg}`,children:i.jsx(ys,{})})]})})]})},Ho=()=>i.jsx(Jn,{children:i.jsx(qo,{})}),fc=Object.freeze(Object.defineProperty({__proto__:null,default:Ho},Symbol.toStringTag,{value:"Module"})),Io=()=>{const{currentTheme:e,theme:t}=ls(),s=[{label:"Active Clients",value:"2,847",change:"+12.5%",color:"from-blue-500 to-cyan-500",icon:Ie,subtitle:"Paying subscriber"},{label:"Monthly Revenue",value:"$45.2K",change:"+18.2%",color:"from-green-500 to-emerald-500",icon:Sa,subtitle:"Subscription revenue"},{label:"AI Employees Deployed",value:"8,456",change:"+25.8%",color:"from-purple-500 to-indigo-500",icon:hs,subtitle:"Serving clients"},{label:"Support Tickets",value:"23",change:"-15.3%",color:"from-orange-500 to-red-500",icon:qe,subtitle:"Open tickets"}],r=[{name:"TechCorp Solutions",aiEmployees:12,activity:"Upgraded to Premium",status:"active",plan:"Premium Plan",lastActive:"2 hours ago",revenue:"$2,400/mo"},{name:"Marketing Masters",aiEmployees:8,activity:"Added 3 new AI Employees",status:"active",plan:"Business Plan",lastActive:"5 hours ago",revenue:"$1,600/mo"},{name:"DataFlow Industries",aiEmployees:15,activity:"Requested custom AI model",status:"premium",plan:"Enterprise Plan",lastActive:"1 day ago",revenue:"$4,200/mo"},{name:"Creative Studios Inc",aiEmployees:5,activity:"Payment processed successfully",status:"active",plan:"Starter Plan",lastActive:"3 hours ago",revenue:"$800/mo"}],a=[{action:"Payment received",user:"TechCorp Solutions",amount:"$2,400",time:"2 minutes ago",type:"payment",icon:He,color:"from-green-500 to-emerald-500"},{action:"New client registered",user:"DataFlow Industries",amount:"Enterprise Plan",time:"15 minutes ago",type:"registration",icon:Oe,color:"from-blue-500 to-cyan-500"},{action:"Plan upgraded",user:"Creative Studios Inc",amount:"+$400/mo",time:"1 hour ago",type:"upgrade",icon:Ro,color:"from-purple-500 to-indigo-500"},{action:"Support ticket resolved",user:"Marketing Masters",amount:"Ticket #2847",time:"2 hours ago",type:"support",icon:ya,color:"from-orange-500 to-red-500"}],o=[{icon:Oe,label:"Add New Client",color:"from-blue-500 to-cyan-500"},{icon:so,label:"Create Service Plan",color:"from-purple-500 to-indigo-500"},{icon:ps,label:"Revenue Report",color:"from-green-500 to-emerald-500"},{icon:qe,label:"Support Center",color:"from-orange-500 to-red-500"}];return i.jsxs("div",{className:"space-y-2 md:space-y-6 lg:space-y-8",children:[i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"hidden lg:grid lg:grid-cols-4 gap-4",children:s.map((n,c)=>{const l=n.icon;return i.jsx("div",{className:"group",children:i.jsxs("div",{className:`${e.cardBg} border ${e.border} rounded-lg p-4 hover:scale-[1.02] transition-all duration-200 ${t==="light"?e.cardShadow||"shadow-lg":""}`,children:[i.jsxs("div",{className:"flex items-center justify-between mb-3",children:[i.jsx("div",{className:`w-10 h-10 rounded-lg flex items-center justify-center ${e.activeBg}`,children:i.jsx(l,{className:`w-5 h-5 ${e.text}`})}),i.jsx("div",{className:"text-right",children:i.jsx("span",{className:`text-xs font-medium ${n.change.startsWith("+")?"text-green-500":"text-red-500"}`,children:n.change})})]}),i.jsx("h3",{className:`text-2xl font-semibold ${e.text} mb-1`,children:n.value}),i.jsx("p",{className:`text-sm font-medium ${e.text} mb-1 leading-tight`,children:n.label}),i.jsx("p",{className:`text-xs ${e.textSecondary} leading-tight`,children:n.subtitle})]})},c)})}),i.jsx("div",{className:"lg:hidden overflow-x-auto scrollbar-hide",children:i.jsx("div",{className:"flex gap-3 md:gap-4 pb-2",style:{width:"max-content"},children:s.map((n,c)=>{const l=n.icon;return i.jsx("div",{className:"group flex-shrink-0 w-44 md:w-52",children:i.jsxs("div",{className:`${e.cardBg} border ${e.border} rounded-lg p-3 md:p-4 hover:scale-[1.02] transition-all duration-200 ${t==="light"?e.cardShadow||"shadow-lg":""}`,children:[i.jsxs("div",{className:"flex items-center justify-between mb-2 md:mb-3",children:[i.jsx("div",{className:`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${e.activeBg}`,children:i.jsx(l,{className:`w-4 h-4 md:w-5 md:h-5 ${e.text}`})}),i.jsx("div",{className:"text-right",children:i.jsx("span",{className:`text-xs font-medium ${n.change.startsWith("+")?"text-green-500":"text-red-500"}`,children:n.change})})]}),i.jsx("h3",{className:`text-lg md:text-xl font-semibold ${e.text} mb-1`,children:n.value}),i.jsx("p",{className:`text-xs md:text-sm font-medium ${e.text} mb-1 leading-tight`,children:n.label}),i.jsx("p",{className:`text-xs ${e.textSecondary} leading-tight`,children:n.subtitle})]})},c)})})})]}),i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6",children:[i.jsx("div",{className:"lg:col-span-2 space-y-4 md:space-y-6",children:i.jsxs("div",{className:"relative group",children:[i.jsx("div",{className:`absolute inset-0 rounded-lg md:rounded-xl bg-blue-500/5 ${t==="light"?"opacity-50":""}`}),i.jsxs("div",{className:`relative ${e.cardBg} backdrop-blur-lg rounded-lg md:rounded-xl border ${e.border} p-4 md:p-5 ${t==="light"?e.cardShadow||"shadow-lg":""}`,children:[i.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6",children:[i.jsxs("h2",{className:`text-lg md:text-xl font-bold ${e.text} flex items-center gap-2`,children:[i.jsx(Ie,{className:`w-5 h-5 ${e.textSecondary}`}),"Recent Client Activity"]}),i.jsxs("button",{className:"hidden admin-btn-primary  py-2 px-4",type:"button",children:[i.jsx(Te,{className:"w-5 h-5"}),i.jsx("span",{className:"hidden md:inline",children:"View All Clients"}),i.jsx("span",{className:"md:hidden",children:"View All"})]})]}),i.jsxs("div",{className:"hidden sm:grid sm:grid-cols-3 gap-3 mb-4 md:mb-6",children:[i.jsxs("div",{className:`p-3 rounded-lg ${e.cardBg} border ${e.border} shadow-lg hover:shadow-xl transition-all duration-300`,children:[i.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx("div",{className:`w-6 h-6 ${e.activeBg} rounded-full flex items-center justify-center`,children:i.jsx(Oe,{className:`w-5 h-5 ${e.text}`})}),i.jsx("span",{className:`text-sm font-medium ${e.text}`,children:"New Clients"})]}),i.jsx("p",{className:`text-xl font-bold ${e.text}`,children:"12"}),i.jsx("p",{className:`text-xs ${e.textSecondary}`,children:"This month"})]}),i.jsxs("div",{className:`p-3 rounded-lg ${e.cardBg} border ${e.border} shadow-lg hover:shadow-xl transition-all duration-300`,children:[i.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx("div",{className:`w-6 h-6 ${e.activeBg} rounded-full flex items-center justify-center`,children:i.jsx(He,{className:`w-5 h-5 ${e.text}`})}),i.jsx("span",{className:`text-sm font-medium ${e.text}`,children:"Transactions"})]}),i.jsx("p",{className:`text-xl font-bold ${e.text}`,children:"156"}),i.jsx("p",{className:`text-xs ${e.textSecondary}`,children:"This week"})]}),i.jsxs("div",{className:`p-3 rounded-lg ${e.cardBg} border ${e.border} shadow-lg hover:shadow-xl transition-all duration-300`,children:[i.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx("div",{className:`w-6 h-6 ${e.activeBg} rounded-full flex items-center justify-center`,children:i.jsx(ma,{className:`w-5 h-5 ${e.text}`})}),i.jsx("span",{className:`text-sm font-medium ${e.text}`,children:"Expiring Plans"})]}),i.jsx("p",{className:`text-xl font-bold ${e.text}`,children:"8"}),i.jsx("p",{className:`text-xs ${e.textSecondary}`,children:"Next 7 days"})]})]}),i.jsxs("div",{className:"space-y-2 md:space-y-3",children:[i.jsx("h3",{className:`text-sm md:text-base font-semibold ${e.text} mb-3`,children:"Recent Client Activities"}),i.jsx("div",{className:"hidden md:block space-y-2",children:r.map((n,c)=>i.jsxs("div",{className:`flex items-center justify-between p-3 md:p-4 rounded-lg ${e.hover} transition-colors border ${e.border}`,children:[i.jsxs("div",{className:"flex items-center gap-2 md:gap-3 min-w-0 flex-1",children:[i.jsx("div",{className:`w-8 h-8 md:w-10 md:h-10 ${e.activeBg} rounded-full flex items-center justify-center flex-shrink-0`,children:i.jsx(kt,{className:`w-4 h-4 md:w-5 md:h-5 ${e.text}`})}),i.jsxs("div",{className:"min-w-0 flex-1",children:[i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx("p",{className:`${e.text} font-medium text-sm md:text-base truncate`,children:n.name}),n.status==="premium"&&i.jsx(Nt,{className:"w-5 h-5 text-yellow-500 flex-shrink-0"})]}),i.jsx("p",{className:`${e.textSecondary} text-xs truncate`,children:n.activity}),i.jsxs("p",{className:`${e.textSecondary} text-xs hidden sm:block`,children:[n.aiEmployees," AI Employees • ",n.plan]})]})]}),i.jsxs("div",{className:"flex items-center gap-2 flex-shrink-0",children:[i.jsxs("div",{className:"text-right hidden sm:block",children:[i.jsx("p",{className:`${e.text} font-medium text-xs md:text-sm`,children:n.revenue}),i.jsx("p",{className:`${e.textSecondary} text-xs`,children:n.lastActive})]}),i.jsxs("div",{className:"flex items-center gap-1",children:[i.jsx("button",{className:"p-1 hover:bg-blue-500/20 rounded transition-colors",children:i.jsx(Te,{className:"w-5 h-5 text-blue-500"})}),i.jsx("button",{className:`p-1 ${e.hover} rounded transition-colors hidden sm:block`,children:i.jsx(Aa,{className:`w-5 h-5 ${e.textSecondary}`})})]})]})]},c))}),i.jsx("div",{className:"md:hidden overflow-x-auto scrollbar-hide",children:i.jsx("div",{className:"flex gap-3 pb-2",style:{width:"max-content"},children:r.map((n,c)=>i.jsxs("div",{className:`flex-shrink-0 w-64 p-3 rounded-lg ${e.cardBg} border ${e.border} ${t==="light"?e.cardShadow||"shadow-sm":""}`,children:[i.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx("div",{className:`w-8 h-8 ${e.activeBg} rounded-full flex items-center justify-center flex-shrink-0`,children:i.jsx(kt,{className:`w-4 h-4 ${e.text}`})}),i.jsx("div",{className:"min-w-0 flex-1",children:i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx("p",{className:`${e.text} font-medium text-sm truncate`,children:n.name}),n.status==="premium"&&i.jsx(Nt,{className:`w-3 h-3 ${e.textSecondary} flex-shrink-0`})]})})]}),i.jsx("p",{className:`${e.textSecondary} text-xs mb-2`,children:n.activity}),i.jsxs("div",{className:"flex justify-between items-center mb-2",children:[i.jsxs("p",{className:`${e.textSecondary} text-xs`,children:[n.aiEmployees," AI Employees"]}),i.jsx("p",{className:`${e.text} font-medium text-xs`,children:n.revenue})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("p",{className:`${e.textSecondary} text-xs`,children:n.lastActive}),i.jsx("button",{className:"p-1 hover:bg-blue-500/20 rounded transition-colors",children:i.jsx(Te,{className:"w-5 h-5 text-blue-500"})})]})]},c))})})]})]})]})}),i.jsxs("div",{className:"space-y-4 md:space-y-6",children:[i.jsx("div",{className:"relative group",children:i.jsxs("div",{className:`relative ${e.cardBg} backdrop-blur-lg rounded-lg md:rounded-xl border ${e.border} p-4 md:p-5 ${t==="light"?e.cardShadow||"shadow-lg":""}`,children:[i.jsxs("h3",{className:`text-base md:text-lg font-bold ${e.text} mb-3 md:mb-4 flex items-center gap-2`,children:[i.jsx(Uo,{className:"w-5 h-5 text-orange-500"}),"Quick Actions"]}),i.jsx("div",{className:"space-y-2 md:space-y-3",children:o.map((n,c)=>{const l=n.icon;return i.jsxs("button",{className:`w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg ${e.hover} transition-all duration-200 border ${e.border} group`,children:[i.jsx("div",{className:`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r ${n.color} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`,children:i.jsx(l,{className:"w-4 h-4 md:w-5 md:h-5 text-white"})}),i.jsx("span",{className:`${e.text} text-sm md:text-base font-medium truncate`,children:n.label})]},c)})})]})}),i.jsx("div",{className:"relative group",children:i.jsxs("div",{className:`relative ${e.cardBg} backdrop-blur-lg rounded-lg md:rounded-xl border ${e.border} p-4 md:p-5 ${t==="light"?e.cardShadow||"shadow-lg":""}`,children:[i.jsxs("h3",{className:`text-base md:text-lg font-bold ${e.text} mb-3 md:mb-4 flex items-center gap-2`,children:[i.jsx(us,{className:"w-5 h-5 text-blue-500"}),"Recent Transactions"]}),i.jsx("div",{className:"hidden md:block space-y-2 md:space-y-3",children:a.map((n,c)=>{const l=n.icon;return i.jsxs("div",{className:`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg ${e.hover} transition-colors`,children:[i.jsx("div",{className:`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${n.color} rounded-full flex items-center justify-center flex-shrink-0`,children:i.jsx(l,{className:"w-4 h-4 md:w-5 md:h-5 text-white"})}),i.jsxs("div",{className:"flex-1 min-w-0",children:[i.jsx("p",{className:`${e.text} font-medium text-xs md:text-sm`,children:n.action}),i.jsxs("p",{className:`${e.textSecondary} text-xs truncate`,children:[n.user," • ",n.time]})]}),i.jsx("div",{className:"text-right flex-shrink-0",children:i.jsx("p",{className:`${e.text} font-medium text-xs`,children:n.amount})})]},c)})}),i.jsx("div",{className:"md:hidden overflow-x-auto scrollbar-hide",children:i.jsx("div",{className:"flex gap-3 pb-2",style:{width:"max-content"},children:a.map((n,c)=>{const l=n.icon;return i.jsxs("div",{className:`flex-shrink-0 w-56 p-3 rounded-lg ${e.cardBg} border ${e.border} ${t==="light"?e.cardShadow||"shadow-sm":""}`,children:[i.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx("div",{className:`w-8 h-8 bg-gradient-to-r ${n.color} rounded-full flex items-center justify-center flex-shrink-0`,children:i.jsx(l,{className:"w-4 h-4 text-white"})}),i.jsx("div",{className:"flex-1 min-w-0",children:i.jsx("p",{className:`${e.text} font-medium text-xs leading-tight`,children:n.action})})]}),i.jsx("p",{className:`${e.textSecondary} text-xs mb-2 truncate`,children:n.user}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("p",{className:`${e.textSecondary} text-xs`,children:n.time}),i.jsx("p",{className:`${e.text} font-medium text-xs`,children:n.amount})]})]},c)})})})]})})]})]})]})},yc=Object.freeze(Object.defineProperty({__proto__:null,default:Io},Symbol.toStringTag,{value:"Module"}));export{zi as $,pi as A,yi as B,ya as C,Si as D,Ei as E,ui as F,Ai as G,uc as H,tc as I,Ie as J,vi as K,Pi as L,Hi as M,Zi as N,po as O,Xi as P,xi as Q,Gi as R,cc as S,Jn as T,Oe as U,Et as V,ps as W,_t as X,hc as Y,Sa as Z,Mi as _,ie as a,ki as a0,Di as a1,Wi as a2,us as a3,nc as a4,Ji as a5,Ki as a6,ac as a7,mc as a8,pc as a9,Yi as aa,wi as ab,Ro as ac,Oi as ad,Ci as ae,lc as af,Vi as ag,Ni as ah,Ii as ai,ic as aj,dc as ak,Li as al,Qi as am,ji as an,Aa as ao,mi as ap,sc as aq,wt as ar,Ri as as,$i as at,fc as au,yc as av,ma as b,Bi as c,Fi as d,Te as e,bi as f,hi as g,He as h,qi as i,i as j,hs as k,Vn as l,_i as m,_ as n,go as o,Ui as p,gi as q,rc as r,di as s,oc as t,ls as u,ec as v,fi as w,qe as x,Ti as y,Fn as z};

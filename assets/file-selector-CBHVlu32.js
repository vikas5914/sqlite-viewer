import{_ as p,a as s,b as g,c as h}from"./tslib-CuZy2iRz.js";var z=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function c(t,i){var e=E(t);if(typeof e.path!="string"){var n=t.webkitRelativePath;Object.defineProperty(e,"path",{value:typeof i=="string"?i:typeof n=="string"&&n.length>0?n:t.name,writable:!1,configurable:!1,enumerable:!0})}return e}function E(t){var i=t.name,e=i&&i.lastIndexOf(".")!==-1;if(e&&!t.type){var n=i.split(".").pop().toLowerCase(),a=z.get(n);a&&Object.defineProperty(t,"type",{value:a,writable:!1,configurable:!1,enumerable:!0})}return t}var F=[".DS_Store","Thumbs.db"];function S(t){return p(this,void 0,void 0,function(){return s(this,function(i){return u(t)&&P(t.dataTransfer)?[2,T(t.dataTransfer,t.type)]:_(t)?[2,k(t)]:Array.isArray(t)&&t.every(function(e){return"getFile"in e&&typeof e.getFile=="function"})?[2,O(t)]:[2,[]]})})}function P(t){return u(t)}function _(t){return u(t)&&u(t.target)}function u(t){return typeof t=="object"&&t!==null}function k(t){return l(t.target.files).map(function(i){return c(i)})}function O(t){return p(this,void 0,void 0,function(){var i;return s(this,function(e){switch(e.label){case 0:return[4,Promise.all(t.map(function(n){return n.getFile()}))];case 1:return i=e.sent(),[2,i.map(function(n){return c(n)})]}})})}function T(t,i){return p(this,void 0,void 0,function(){var e,n;return s(this,function(a){switch(a.label){case 0:return t.items?(e=l(t.items).filter(function(r){return r.kind==="file"}),i!=="drop"?[2,e]:[4,Promise.all(e.map(A))]):[3,2];case 1:return n=a.sent(),[2,x(w(n))];case 2:return[2,x(l(t.files).map(function(r){return c(r)}))]}})})}function x(t){return t.filter(function(i){return F.indexOf(i.name)===-1})}function l(t){if(t===null)return[];for(var i=[],e=0;e<t.length;e++){var n=t[e];i.push(n)}return i}function A(t){if(typeof t.webkitGetAsEntry!="function")return b(t);var i=t.webkitGetAsEntry();return i&&i.isDirectory?y(i):b(t)}function w(t){return t.reduce(function(i,e){return g(g([],h(i),!1),h(Array.isArray(e)?w(e):[e]),!1)},[])}function b(t){var i=t.getAsFile();if(!i)return Promise.reject("".concat(t," is not a File"));var e=c(i);return Promise.resolve(e)}function D(t){return p(this,void 0,void 0,function(){return s(this,function(i){return[2,t.isDirectory?y(t):I(t)]})})}function y(t){var i=t.createReader();return new Promise(function(e,n){var a=[];function r(){var j=this;i.readEntries(function(f){return p(j,void 0,void 0,function(){var m,d,v;return s(this,function(o){switch(o.label){case 0:if(f.length)return[3,5];o.label=1;case 1:return o.trys.push([1,3,,4]),[4,Promise.all(a)];case 2:return m=o.sent(),e(m),[3,4];case 3:return d=o.sent(),n(d),[3,4];case 4:return[3,6];case 5:v=Promise.all(f.map(D)),a.push(v),r(),o.label=6;case 6:return[2]}})})},function(f){n(f)})}r()})}function I(t){return p(this,void 0,void 0,function(){return s(this,function(i){return[2,new Promise(function(e,n){t.file(function(a){var r=c(a,t.fullPath);e(r)},function(a){n(a)})})]})})}export{S as f};

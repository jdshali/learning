### 一、重要记录script标签的一些技巧

#### 1、crossorigin 

- 引入跨域的脚本（比如用了 apis.google.com 上的库文件），如果这个脚本有错误，因为浏览器的限制（根本原因是协议的规定），是拿不到错误信息的。当本地尝试使用 window.onerror 去记录脚本的错误时，跨域脚本的错误只会返回 Script error。
- HTML5 新的规定，是可以允许本地获取到跨域脚本的错误信息，但有**两个条件**：
  - 一是跨域脚本的服务器必须通过 Access-Controll-Allow-Origin 头信息允许当前域名可以获取错误信息
  - 二是当前域名的 script 标签也必须指明 src 属性指定的地址是支持跨域的地址，也就是 crossorigin 属性

#### 2、integrity
  -  integrity （大部分情况）是给 CDN 的静态文件使用的，比如大名鼎鼎的 ajax.googleapis.com，或者国内的 cdn.bootcss.com
  - CDN 虽好，但 CDN 有可能被劫持，导致下载的文件是被篡改过的（比如通过 DNS 劫持），有了 integrity 就可以检查文件是否是原版。
  - 只有当你的网页域名和要载入的静态文件存放的站点域名不一样的时候，integrity和crossorigin这两个属性才有意义（并且因浏览器的规定 crossorigin 属性只有这个时候才能正常使用）。

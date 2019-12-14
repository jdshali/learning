###  一、资源提示与指令来提升页面性能的方法

preload 
prefetch 
preconnect

有哪些区别呢？

如何充分利用他们？

好处：允许前端开发人员来优化资源的加载， 减少往返路径并且在浏览页面时候可以更快的加载到资源


### 二、具体方法

#### 1、Preload
- 基本理解
    - 一种新的控制特定资源如何被加载的新的web标准
    - 如何使用呢？ <link rel="preload"> 
    - 可以使用其加载最重要的资源，比如图像、css、Js和字体；
    - 注意：不要与浏览器预加载混淆，浏览器预加载只预先加载在HTML中声明的资源
    - preload指令解决了以上限制，允许预加载在CSS和Javascript中定义的资源，并允许决定何时应用每个资源
    - preload与prefetch的不同在于它专注于当前的页面，并以高优先级加载资源
    - Prefetch 专注于下一个页面将要加载的资源并以低优先级加载
    - preload 并不会阻塞 window 的 onload 事件。
    - link rel="preload" href="./es.js" as="script"> style/image/font/document

- 好处
    - 允许浏览器来 设定资源加载的优先级,因此可以允许前端开发者来优化指定资源的加载。
    - 赋予浏览器决定资源类型的能力，因此它能分辨这个资源在以后是否可以重复利用
    - 浏览器可以通过指定 as 属性来决定这个请求是否符合 content security policy。
    - 浏览器可以基于资源的类型（比如 image/webp）来发送适当的 accept 头

```html
    //预加载图像的例子
    <link rel="preload" href="image.png">

    //预加载字体的例子  记住：如果你的预加载需要 CORS 的跨域请求，那么也要加上 crossorigin 的属性。
    <link rel="preload" href="https://example.com/fonts/font.woff" as="font" crossorigin>

```

通过 HTML 和 JavaScript 预加载样式表的例子：
```html
<link rel="preload" href="/css/mystyles.css" as="style">
```
```javascript

var res = document.createElement("link"); 
res.rel = "preload"; 
res.as = "style"; 
res.href = "css/mystyles.css"; 
document.head.appendChild(res); 
```



#### 2、prefetch

- prefecth是一个低优先级的资源提示，允许浏览器在后台（空闲时）获取将来可能用得到的资源，并且将他们存储在浏览器的缓存中。一旦一个页面加载完毕就会开始下载其他的资源，然后当用户点击了一个带有 prefetched 的连接，它将可以立刻从缓存中加载内容。
- 有三种不同的 prefetch 的类型，link，DNS 和 prerendering
- 具体过程
![prefetch](./image/prefetch.png)
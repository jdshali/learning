
>HTML页面的生命周期有以下三个重要事件：
- DOMContentLoaded， 浏览器已经完全加载了 HTML，DOM 树已经构建完毕，但是像是 img和样式表等外部资源可能并没有下载完毕。

- load —— 浏览器已经加载了所有的资源（图像，样式表等）

- beforeunload/unload —— 当用户离开页面的时候触发。

> 每个事件都有特定的用途
- DOMContentLoaded —— DOM 加载完毕，所以 JS 可以访问所有 DOM 节点，初始化界面。
- load —— 附加资源已经加载完毕，可以在此事件触发时获得图像的大小（如果没有被在 HTML/CSS 中指定）

- beforeunload/unload —— 用户正在离开页面：可以询问用户是否保存了更改以及是否确定要离开页面。

来看一下每个事件的细节
===

## 1、DOMContentLoaded

DOMContentLoaded 由 document 对象触发。
我们使用 addEventListener 来监听它：

```javascript
document.addEventListener("DOMContentLoaded", ready);
```

举个例子

```html
<script>
  function ready() {
    alert('DOM is ready');

    // image is not yet loaded (unless was cached), so the size is 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  document.addEventListener("DOMContentLoaded", ready);
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">

```
在这个例子中 DOMContentLoaded 在 document 加载完成后就被触发，无需等待其他资源的载入，所以 alert 输出的图像的大小为 0。

这么看来 DOMContentLoaded 似乎很简单，DOM 树构建完毕之后就运行该事件，不过其实存在一些陷阱。


- DOMContentLoaded 和脚本

  当浏览器在解析 HTML 页面时遇到了 <script>...</script> 标签，将无法继续构建DOM树（译注：UI 渲染线程与 JS 引擎是互斥的，当 JS 引擎执行时 UI 线程会被挂起），必须立即执行脚本。所以 DOMContentLoaded 有可能在所有脚本执行完毕后触发。

  外部脚本（带 src 的）的加载和解析也会暂停DOM树构建，所以 DOMContentLoaded 也会等待外部脚本。

    I     | async | defer  | 
    -------- | ---  |  ----  | 
    顺序  | 带有 async 的脚本是优先执行先加载完的脚本，他们在页面中的顺序并不影响他们执行的顺序。 |  带有 defer 的脚本按照他们在页面中出现的顺序依次执行。  | 
    DOMContentLoaded    | 带有 async 的脚本也许会在页面没有完全下载完之前就加载，这种情况会在脚本很小或本缓存，并且页面很大的情况下发生。 | 带有 defer 的脚本会在页面加载和解析完毕后执行，刚好在 DOMContentLoaded 之前执行。  | 

    所以 async 用在那些完全不依赖其他脚本的脚本上。
    
>参考

1、[页面生命周期 DOMContentLoaded, load, beforeunload, unload解析](https://github.com/fi3ework/blog/issues/3)


### 问题

1、什么是DOM 树构建完毕
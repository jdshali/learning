### 一、性能优化
    Lighthouse
    https://juejin.im/post/5d00820b5188255ee806a1c7#heading-16
    组件懒加载
    组件预加载
    路由懒加载

    浏览器通常都有并发请求的限制,以 Chrome 为例,它的并发请求就为 6 个,这导致我们必须在请求完前 6 个之后,才能继续进行后续请求,这也影响我们资源的加载速度。


    骨架屏
    https://github.com/lavas-project/vue-skeleton-webpack-plugin
    https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/270
    饿了吗自动生成骨架屏
    https://github.com/Jocs/jocs.github.io/issues/22
    https://zhuanlan.zhihu.com/p/34702561


    这篇文章从页面渲染的流程上提供了一些方案，比较重要的加载时间点是
    白屏：loading、服务端渲染、开启https2.0、开启缓存
    首次渲染：骨架屏
    可交互阶段：Tree Shaking、动态polyfill、动态ES6、路由懒加载
    组件加载


### 二、JS执行性能

    https://jsperf.com/
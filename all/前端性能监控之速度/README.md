用什么监控
===

关于前端性能指标，W3C 定义了强大的 Performance API，其中又包括了 High Resolution Time 、 Frame Timing 、 Navigation Timing 、 Performance Timeline 、Resource Timing 、 User Timing 等诸多具体标准。

本文主要涉及 Navigation Timing 以及 Resource Timing。截至到 2018 年中旬，各大主流浏览器均已完成了基础实现。

Performance API 功能众多，其中一项，就是将页面自身以及页面中各个资源的性能表现（时间细节）记录了下来。而我们要做的就是查询和使用。

>参考文档

1、[5 分钟撸一个前端性能监控工具](https://juejin.im/post/5b7a50c0e51d4538af60d995)
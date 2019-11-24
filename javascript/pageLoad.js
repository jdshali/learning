//如何判断页面是否加载完成
//通过了解页面的加载过程分析页面的性能以及优化方向

//【浏览器渲染页面过程与页面优化】https://segmentfault.com/a/1190000010298038 
//问题：从用户输入URL到页面最后呈现，有哪些过程？
//考察：网络原理、浏览器加载css js 解析html过程
//【前端经典面试题: 从输入URL到页面加载发生了什么？】https://segmentfault.com/a/1190000006879700
//大致过程
//

//https://blog.csdn.net/u011700203/article/details/47656857
//https://zhuanlan.zhihu.com/p/30283138
//资源加载和页面事件
//理想的页面加载方式
  //解析html结构
  //加载并解析外部脚本
  //DOM树构建完成，执行脚本。 DOMInteractive-> DOMContentLoaded
  //加载图片
  //页面加载完毕 window.onLoad

//涉及到的事件
//1、window.onload 当页面全部加载完成（包括所有资源）
//2、document.onload 整个html文档加载完成时候触发，即在body元素加载之前开始执行
//3、DOMContentLoaded
  //当页面的DOM树解析好并且需要等待JS执行完才触发
  //DOMContentLoaded事件不直接等待CSS文件、图片的加载完成
//4、onreadytstatechange
    //当对象状态变更时触发这个事件，一旦document的readyState属性发生变化就会触发

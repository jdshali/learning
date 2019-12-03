//https://juejin.im/post/59bb7080518825396f4f5177
//跨页面通信的各种姿势

//两种方案 
 //获取句柄 定向通讯
 //共享内存，结合轮询或者事件通知来完成业务逻辑

 //第二种原理利于业务解耦，实现方案多


//获取句柄
 //具体方案
  //父页面通过window.open(url, name)方式打开的子页面可以获取句柄，然后通过postMessage完成通讯需求
  //parent.html
  const childPage = window.open('child.html', 'child');

  childPage.onload = () => {
      childPage.postMessage('hello', location.origin);
  }
  
  //child.html
  window.onmessage = evt => {

  }

  //Tips
   //当指定window.open的第二个name参数时，再次调用window.open('****', 'child')会使之前已经打开的同name子页面刷新
   //由于安全策略，异步请求之后再调用window.open会被浏览器阻止，不过可以通过句柄设置子页面的url即可实现类似效果
   // 首先先开一个空白页
    const tab = window.open('about:blank')

    // 请求完成之后设置空白页的url
    fetch(/* ajax */).then(() => {
        tab.location.href = '****'
    })
 
  //缺点
   //只能与自己打开的页面通讯


//方法二  localStorage
 //具体方案
  //设置共享区域的storage，storage会触发storage事件
  //A.html
  localStorage.setItem('message', 'hello');

  //B.html
  window.onstorage = evt => {

  }

  //Tips
   //1、触发写入操作的页面下的storage listener不会被触发
   //2、storage事件只有在发生改变的时候才触发，即重复设置相同的值不会触发listener
   //3、safari隐式模式下无法设置localStorage的值

  //优劣
   //API简单直观 兼容性好 除了跨域外 无其他缺点

//方式三 BroadcastChannel
 //具体方案
  //和localstorage方案一致 额外需要初始化
  //A.html
   const channel = new BroadcastChannel('tabs');
   channel.onmessage = evt => {

   }

   //B.html
    const channel = new BroadcastChannel('tabs');
    channel.postMessage('hello');
//优劣
 //和local localStorage方案没啥区别，都是同域 API简单， 兼容性差 chrome》 58  但是比localStorage方案生命周期短，相对干净

//方案四 SharedWorker
 //具体方案
  //SharedWorker本身不是为了解决通信需求的，他的设计初衷类似于总控，将一些通用逻辑放在SharedWorker中处理，不过也可以实现通讯
   //A.html
    var sharedWorker = new SharedWorker('work.js');
    sharedWorker.port.start();
    sharedWorker.port.onmessage = evt => {

    }

  //B.html
   var sharedWorker = new SharedWorker('worker.js');
   sharedWorker.port.start();
   sharedWorker.port.postMessage('hello');

   //worker.js
   const ports = [];
   onconnect = e => {
       const port = e.port[0];
       ports.push(port);
       port.onmessage = evt => {
           ports.filter(v => {
               v !== port
           })
           .forEach(p => p.postMessage(evt.data))
       }
   }

   //相较于其他方案没有优势，此外，API复杂而且调试不方便。

//五、Cookie
 //一个古老的方案，有点localStorage的降级兼容版，我也是整理本文的时候才发现的，
 //思路就是往document.cookie写入值，由于cookie的改变没有事件通知，所以只能采取轮询脏检查来实现业务逻辑。
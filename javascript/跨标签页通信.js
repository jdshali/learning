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
 //相较于其他方案没有存在优势的地方，只能同域使用，而且污染cookie以后还额外增加AJAX的请求头内容。

//六、Server
 //之前的方案都是前端自行实现，势必受到浏览器限制，比如无法做到跨浏览器的消息通讯，
 //比如大部分方案都无法实现跨域通讯（需要增加额外的postMessage逻辑才能实现）。通过借助服务端，还有很多增强方案，也一并说下。

 //乞丐版
  //后端无开发量，前端定期保存，在tab被激活时重新获取保存的数据
  //可以通过校验hash之类的标记位来提升检查性能
  window.onvisibilitychange = () => {
	if (document.visibilityState === 'visible') {
		// AJAX
	}
 }


 //Server-sent Events / Websocket
 //项目规模小型的时候可以采取这类方案，后端自行维护连接，以及后续的推送行为。
    // 前端
    const es = new EventSource('/notification')

    es.onmessage = evt => {
        // evt.data
    }
    es.addEventListener('close', () => {
        es.close()
    }, false)


    // 后端，express为例
    const clients = []

    app.get('/notification', (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream')
        clients.push(res)
        req.on('aborted', () => {
            // 清理clients
        })
    })
    app.get('/update', (req, res) => {
        // 广播客户端新的数据
        clients.forEach(client => {
            client.write('data:hello\n\n')
            setTimeout(() => {
                client.write('event:close\ndata:close\n\n')
            }, 500)
        })
        res.status(200).end()
    })


    //Websocket


    //消息队列
     //项目规模大型时，需要消息队列集群长时间维护长链接，在需要的时候进行广播
     //提供该类服务的云服务商很多，或者寻找一些开源方案自建
     //例如MQTT协议方案（阿里云就有提供），web客户端本质上也是websocket，
     //需要集群同时支持ws和mqtt协议，示例如下：
     // 前端
        // 客户端使用开源的Paho
        // port会和mqtt协议通道不同
        const client = new Paho.MQTT.Client(host, port, 'clientId')

        client.onMessageArrived = message => {
            // message. payloadString
        }
        client.connect({
            onSuccess: () => {
                client.subscribe('notification')
            }
        })
        // 抑或，借助flash（虽然快要被淘汰了）进行mqtt协议连接并订阅相应的频道，flash再通过回调抛出消息

        // 后端
        // 根据服务商提供的Api接口调用频道广播接口



//浏览器的缓存知识
//如何利用这些缓存?

//为什么第一次请求base64的图片返回的状态码就是200(from memory cache)?
//https://segmentfault.com/q/1010000017853034/
// 首先base64图片本质上是一堆字符串，并且是在页面渲染时期进行加载的。
//Chrome在高版本更新了缓存策略，分为from disk cache(磁盘缓存)和from memory cache(内存缓存)两类。其中内存缓存是和渲染进程绑定的。
//也就是说当你的html页面被 第一次加载 时，所有的html，js，css代码都会被读进内存当中。
//你的base64图片也是字符串，也在这个阶段，所以就是from memory cache.
//当你的图片不是base64，是普通图片时，他不是包含在 第一次加载 时期，你猜猜他从那里读取的？课后作业吧。

//https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/53
//参考https://www.jianshu.com/p/54cc04190252

//关键字了解
//Cache-Control
  //如何设置：通过个response headers添加Cache-Control,如下
  app.get('/api', (req, res) => {
    res.setHeader('Cache-control', 'max-age=36000');
    res.json('res');
  });

  //前端
  var myRequest = new Request('/api', {});

  //no-Cache, 如果request headers中，Cache-Control为no-cache，则不管服务端有无设置Cache-Control，都必须重新获取请求
  var myRequest = new Request('api', { 
      headers: { 
          'Cache-Control': 'no-cache' //OR 'Cache-Control': 'max-age=0'
      }
  });

  //结论是：不管是max-age=0 或者是 no-cache都是返回304
  //no-cache不代表无缓存，而是指使用缓存一定要先经过验证
  //max-age=0也是在使用缓存之前先进行验证


//强缓存和协商缓存
  //强缓存
    //Expires: 指定资源到期的时间是服务端的是具体时间，修改前端时间会造成缓存失败
    //Cache-Control
    //对比：Cache-Control优先级高于Expires，Expires来源于HTTP1.0，Cache-Control来于1.1
  
  //协商缓存
    //Last-modified/If-Modified-Since----只能以秒计时，有局限性
    //Etag/If-none-Match----相应请求时返回一个唯一标识Etag;Etag由服务端生成，资源有变化的时候他会重新生成
    //对比：精度上Etag要优与Last-Modified  性能上Etag逊与Last-modified  优先级：Etag高
  
  //缓存机制
    //强制缓存优先于协商缓存
    //协商缓存失效，返回200 重新返回资源和缓存标识
    //协商缓存生效返会304 继续使用缓存

//缓存位置
  //Service worker---自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，缓存是可持续的
  //Memory Cache：读取是高效的 持续性段
  //Disk Cache: 读取速度慢，容量大
  //push Cache http2

//缓存策略都是通过设置HTTP Header来实现的

//Cache-Control
  //private public max-age=36000  no-store(不缓存任何响应) no-cache


//Connection: keep-alive
  //如何设置
  //有啥好处
  //怎么关闭？timeout close等
//是一个通用消息头 允许消息发送者暗示连接的状态  还可以用来设置超时时长和最大请求数
// HTTP/1.1 200 OK
// Connection: Keep-Alive
// Content-Encoding: gzip
// Content-Type: text/html; charset=utf-8
// Date: Thu, 11 Aug 2016 15:23:13 GMT
// Keep-Alive: timeout=5, max=1000
// Last-Modified: Mon, 25 Jul 2016 04:32:39 GMT
// Server: Apache

// (body)


//对于某些不需要缓存的资源，可以使用 Cache-control: no-store ，表示该资源不需要缓存
//对于频繁变动的资源，可以使用 Cache-Control: no-cache 并配合 ETag 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新。 比如html文件
//对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件。


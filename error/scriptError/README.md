
#### 1、scriptError产生的原因
- 同源策略
- webkit源码

#### 2、常见的解决方案
- 开启 CORS 跨域资源共享
  - 添加 crossorigin="anonymous" 属性：当有 crossorigin="anonymous"，浏览器以匿名的方式获取目标脚本，请求脚本时不会向服务器发送用户信息（ cookie、http 证书等）。
    ```html
    <script src="http://domain/path/*.js" crossorigin="anonymous"></script>
    ```
   - 此时静态服务器需要添加跨域协议头：
    Access-Control-Allow-Origin: *

- try catch

  - 有时候，不容易往HTTP请求响应头里面添加跨域属性，这时还可以考虑try catch这个候选方案
回到之前的案例
```html
// https://help.aliyun.com/document_detail/58657.html
    <!doctype html>
    <html>
        <head>
        <title>Test page in http://test.com</title>
        </head>
        <body>
        <script src="http://another-domain.com/app.js"></script>
        <script>
            window.onerror = function (message, url, line, column, error) {
                console.log(message, url, line, column, error);
            }
            try {
                foo(); // 调用app.js中定义的foo方法
            } catch (e) {
                console.log(e);
                throw e; 
            }
        </script>
        </body>
    </html>
```
    => ReferenceError: bar is not defined
        at foo (http://another-domain.com/app.js:2:3)
        at http://test.com/:15:3

    => "Script error.", "", 0, 0, undefined

    可以看出来， try catch中的console语句输出了完整的信息, 但window.onerror中只能捕获“Script error.” 基于这个特点，可以在catch语句中，将捕获的异常手动上报。


#### 3、案例分析

- 1、对于拥有静态服务器的配置权限的资源我们可以统一配置支持跨域头信息，并且请求时统一增加 crossorigin="anonymous"，这样可以完美将对应的错误堆栈信息进行上报。

- 2、jsonp 请求问题。
  - 为了解决页面请求中的跨域问题，往往我们页面接口以 jsonp 的方式进行数据获取，对于 jsonp 请求的方式一般引起 badjs 的有两种情况：
    - a) 接口请求异常，线上常见的就是在出现接口异常时 302 返回一个 error 页面，该种情况由于返回的内容不能够解析所以直接导致 script error；对于这种情况虽然我们不能直接对 script error 进行详细上报，但是可以根据回调与加载接口的 onload 进行接口的错误上报，具体的方法如下面伪代码：

```javascript

// 资源加载完成触发 onload 事件
el.onload = el.onreadystatechange = function () {
    if(!cgiloadOk) { // 没有正常的回调，则上报对应的错误信息
        report(cgi, 'servererror');
    }
}

window.newFunction = function(rsp) {
    cgiloadOk = true;
    window.originFunction(rsp);
}
```
- 接口返回数据异常（非标准 json ），这种情况也会直接导致 script error。
```javascript
let sc = document.createElement('script');
  let head = document.getElementsByTagName('head')[0];
  sc.setAttribute('charset', charset || 'utf-8');
  sc.src = url;
  head.appendChild(sc);

  window.newFunction = function(text) {
    // 采用try catch捕获异常
    try {
      let jsonStr = JSON.parse(text)
    } catch(e) {
      // 出现转换异常，则将对应的错误数据进行上报
      reportBadjs(text);
    }
  }

```

#### 3、录屏
- 该方法主要是记录用户页面 dom 的变化，然后在出现 script error 时将对应的记录进行上报，然后在分析系统里通过技术将页面还原。
- 大致思路
  - 进入页面，生成页面的虚拟dom全量快照；
  - 运用 API：MutationObserver，记录用户变化的 dom，同时记录用户的一些行操作（click，select，input，scroll 等事件）；
  - 当出现 script error 时将对应快照信息上报；
  - 在分析系统中将快照与用用户的操作还原。

```javascript
// 全局的 onerror 用于捕获页面异常
    window.onerror = function(msg, url, line, col, error) {
        let excludeList = ['WeixinJSBrige']; // 剔除一些确认的本身客户端引起的问题，避免对上报后的数据分析引起干扰
        // 拼接错误信息
        let errStr = obj2str(msg) + (url ? ';URL:' + url : '') + (line ? ';Line:' + line : '') + (col ? ';Column:' + col : ''
        // 剔除白名单内错误上报，避免对上报结果干扰
        for (let item in excludeList) {
        if (errStr.indexof(item) > -1) {
            return;
        }
        }
        // 构造图片请求，用于上报
        let g = new Image()
        // 存在 traceid 则拼接 traceid 用于日志串联
        g.src = reportUrl + errStr + '&t=' + Math.random()+(window.traceid ? '&traceid=' + window.traceid : '')
    }
        return false;
    };
```
- 「对于使用了promise以及框架（vue,react）本身内部会拦截错误，需要添加对应的方法进行手动上报」
```javascript
    // promise 错误上报
    window.addEventListener('rejectionhandled', event => {
    // 错误的详细信息在 reason 字段
    window.onerror('', '', '', '', event.reason)
    });

    // vue 错误上报
    Vue.config.errorHandler = function (err, vm, info) {
    window.onerror(info, '', '', '', err)
    }
```


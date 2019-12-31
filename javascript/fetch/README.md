fetch和XMLHttpRequest
===
如果看网上的fetch教程，会首先对比XMLHttpRequest和fetch的优劣，然后引出一堆看了很快会忘记的内容(本人记性不好)。因此，我写一篇关于fetch的文章，为了自己看着方便，毕竟工作中用到的也就是一些很基础的点而已。

fetch，说白了，就是XMLHttpRequest的一种替代方案。如果有人问你，除了Ajax获取后台数据之外，还有没有其他的替代方案？

这是你就可以回答，除了XMLHttpRequest对象来获取后台的数据之外，还可以使用一种更优的解决方案fetch。


如何获取fetch
===
到现在为止，fetch的支持性还不是很好，但是在谷歌浏览器中已经支持了fetch。fetch挂在在BOM中，可以直接在谷歌浏览器中使用。

当然，如果不支持fetch也没有问题，可以使用第三方的ployfill来实现只会fetch：[whatwg-fetch](https://github.com/github/fetch)


fetch的helloworld
===
下面我们来写第一个fetch获取后端数据的例子：
```javascript
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html') // 返回一个Promise对象
  .then((res)=>{
    return res.text() // res.text()是一个Promise对象
  })
  .then((res)=>{
    console.log(res) // res是最终的结果
  })
```
>说明一点，下面演示的GET请求或POST请求，都是采用百度中查询到的一些接口，可能传递的有些参数这个接口并不会解析，但不会影响这个接口的使用。


GET请求
===
- GET请求初步
  - 完成了helloworld，这个时候就要来认识一下GET请求如何处理了。
  - 上面的helloworld中这是使用了第一个参数，其实fetch还可以提供第二个参数，就是用来传递一些初始化的信息。
  - 这里如果要特别指明是GET请求，就要写成下面的形式：
  ```javascript
    // 通过fetch获取百度的错误提示页面
    fetch('https://www.baidu.com/search/error.html', {
        method: 'GET'
    })
    .then((res)=>{
        return res.text()
    })
    .then((res)=>{
        console.log(res)
    })
  ```

- GET请求的参数传递
  - GET请求中如果需要传递参数怎么办？这个时候，只能把参数写在URL上来进行传递了。
  ```javascript
    // 通过fetch获取百度的错误提示页面
    fetch('https://www.baidu.com/search/error.html?a=1&b=2', { // 在URL中写上传递的参数
        method: 'GET'
    })
    .then((res)=>{
        return res.text()
    })
    .then((res)=>{
        console.log(res)
    })
  ```


POST请求
===
- POST请求初步
  - 与GET请求类似，POST请求的指定也是在fetch的第二个参数中：
  ```javascript
    // 通过fetch获取百度的错误提示页面
    fetch('https://www.baidu.com/search/error.html', {
        method: 'POST' // 指定是POST请求
    })
    .then((res)=>{
        return res.text()
    })
    .then((res)=>{
        console.log(res)
    })
  ```
  - POST请求参数的传递
    - 众所周知，POST请求的参数，一定不能放在URL中，这样做的目的是防止信息泄露。
    ```js
    // 通过fetch获取百度的错误提示页面
    fetch('https://www.baidu.com/search/error.html', {
        method: 'POST',
        body: new URLSearchParams([["foo", 1],["bar", 2]]).toString() // 这里是请求对象
    })
    .then((res)=>{
        return res.text()
    })
    .then((res)=>{
        console.log(res)
    })
    ```


设置请求的头信息
===
在POST提交的过程中，一般是表单提交，是，经过查询，发现默认的提交方式是：Content-Type:text/plain;charset=UTF-8，这个显然是不合理的。下面咱们学习一下，指定头信息：
```js
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
    }),
    body: new URLSearchParams([["foo", 1],["bar", 2]]).toString()
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })
```
这个时候，在谷歌浏览器的Network中查询，会发现，请求方式已经变成了content-type:application/x-www-form-urlencoded。


通过接口得到JSON数据
===
上面所有的例子中都是返回一个文本，那么除了文本，有没有其他的数据类型呢？

由于最常用的是JSON数据，那么下面就简单演示一下获取JSON数据的方式：
```js
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/rec?platform=wise&ms=1&rset=rcmd&word=123&qid=11327900426705455986&rq=123&from=844b&baiduid=A1D0B88941B30028C375C79CE5AC2E5E%3AFG%3D1&tn=&clientWidth=375&t=1506826017369&r=8255', { // 在URL中写上传递的参数
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
    })
  })
  .then((res)=>{
    return res.json() // 返回一个Promise，可以解析成JSON
  })
  .then((res)=>{
    console.log(res) // 获取JSON数据
  })
```

强制带Cookie
===
默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于维护一个用户会话，则导致未经认证的请求(要发送 cookies，必须发送凭据头).
```js
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
    method: 'GET',
    credentials: 'include' // 强制加入凭据头
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })
```

简单封装一下fetch
===
最后了，介绍了一大堆内容，有没有发现，在GET和POST传递参数的方式不同呢？下面咱们就来封装一个简单的fetch，来实现GET请求和POST请求参数的统一。
```js
/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
function commonFetcdh(url, options, method = 'GET') {
  const searchStr = obj2String(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      credentials: 'include'
    }
  } else {
    initObj = {
      method: method,
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: searchStr
    }
  }
  fetch(url, initObj).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
function GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */
function POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}
```


---
传统 Ajax 已死，Fetch 永生
---
---

Why Fetch
---
XMLHttpRequest 是一个设计粗糙的 API，不符合关注分离（Separation of Concerns）的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，generator/yield，async/await 友好。

Fetch 的出现就是为了解决 XHR 的问题，拿例子说明：

使用 XHR 发送一个 json 请求一般是这样：

```js
var xhr = new XMLHttpRequest();
xhr.open('get', url);

xhr.onload = function() {
    console.log(xhr.response);
}

xhr.onerror = function() {
    console.log('Error');
}

xhr.send();
```

使用 Fetch 后，顿时看起来好一点
```js
fetch(url).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});
```
使用 ES6 的 箭头函数 后：
>参考文档
```js
fetch(url).then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log("Oops, error", e))
```

现在看起来好很多了，但这种 Promise 的写法还是有 Callback 的影子，而且 promise 使用 catch 方法来进行错误处理的方式有点奇怪。不用急，下面使用 async/await 来做最终优化：

>注：async/await 是非常新的 API，属于 ES7，目前尚在 Stage 1(提议) 阶段，这是它的完整规范。使用 Babel 开启 runtime 模式后可以把 async/await 无痛编译成 ES5 代码。也可以直接使用 regenerator 来编译到 ES5。
```js
try {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
} catch(e) {
  console.log("Oops, error", e);
}
// 注：这段代码如果想运行，外面需要包一个 async function
```
duang~~ 的一声，使用 await 后，写异步代码就像写同步代码一样爽。await 后面可以跟 Promise 对象，表示等待 Promise resolve() 才会继续向下执行，await 后面可以跟 Promise 对象，表示等待 Promise resolve() 才会继续向下执行，如果 Promise 被 reject() 或抛出异常则会被外面的 try...catch 捕获。

Promise，generator/yield，await/async 都是现在和未来 JS 解决异步的标准做法，可以完美搭配使用。这也是使用标准 Promise 一大好处。最近也把项目中使用第三方 Promise 库的代码全部转成标准 Promise，为以后全面使用 async/await 做准备。

另外，Fetch 也很适合做现在流行的同构应用，有人基于 Fetch 的语法，在 Node 端基于 http 库实现了 node-fetch，又有人封装了用于同构应用的 isomorphic-fetch。

总结一下，Fetch 优点主要有：
- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 async/await
- 同构方便，使用 isomorphic-fetch
>参考文档


Fetch 常见坑
===

- Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
- 服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。

IE 使用策略
===
所有版本的 IE 均不支持原生 Fetch，fetch-ie8 会自动使用 XHR 做 polyfill。但在跨域时有个问题需要处理。

IE8, 9 的 XHR 不支持 CORS 跨域，虽然提供 XDomainRequest，但这个东西就是玩具，不支持传 Cookie！如果接口需要权限验证，还是乖乖地使用 jsonp 吧，推荐使用 fetch-jsonp。如果有问题直接提 issue，我会第一时间解决。

Fetch 和标准 Promise 的不足
===
由于 Fetch 是典型的异步场景，所以大部分遇到的问题不是 Fetch 的，其实是 Promise 的。ES6 的 Promise 是基于 Promises/A+ 标准，为了保持 简单简洁 ，只提供极简的几个 API。如果你用过一些牛 X 的异步库，如 jQuery(不要笑) 、Q.js 或者 RSVP.js，可能会感觉 Promise 功能太少了。

### 没有 Deferred

Deferred 可以在创建 Promise 时可以减少一层嵌套，还有就是跨方法使用时很方便。
ECMAScript 11 年就有过 Deferred 提案，但后来没被接受。其实用 Promise 不到十行代码就能实现 Deferred：es6-deferred。现在有了 async/await，generator/yield 后，deferred 就没有使用价值了。

### 没有获取状态方法：isRejected，isResolved
标准 Promise 没有提供获取当前状态 rejected 或者 resolved 的方法。只允许外部传入成功或失败后的回调。我认为这其实是优点，这是一种声明式的接口，更简单。

### 缺少其它一些方法：always，progress，finally
always 可以通过在 then 和 catch 里重复调用方法实现。finally 也类似。progress 这种进度通知的功能还没有用过，暂不知道如何替代。

### 不能中断，没有 abort、terminate、onTimeout 或 cancel 方法
Fetch 和 Promise 一样，一旦发起，不能中断，也不会超时，只能等待被 resolve 或 reject。幸运的是，whatwg 目前正在尝试解决这个问题 whatwg/fetch#27

>参考文档

1、[fetch，终于认识你](https://segmentfault.com/a/1190000011433064)

2、[传统 Ajax 已死，Fetch 永生](https://github.com/camsong/blog/issues/2)
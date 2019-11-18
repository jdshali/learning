//关于App

//本地化问题：
//在同一个模块中跳转页面用路由,跨模块全链接,
//不论是直接window.location.href 还是 openWebView APP都可以拦截到目标地址.
//然后有个白名单,匹配目标路径是否存在白名单中,是则加载目标路径本地文件,否则加载HTTP
let result = {
    data: {
        h5switch: 1,
        h5VersionProperties: {
            packageList: ["/web/h5/dataStatistics"]
        }
    }
};
//方式
window.location = url;
//方式

if (iOS()) {
    try {
      window.webkit.messageHandlers.NativeMethod.postMessage([
        "openWebView",
        url
      ]);
    } catch (error) {
      window.location.href = url;
    }
  } else {
    /**
     * TIPS:
     * 安卓老容器不支持在webView里面继续打开webView,暂时try...catch一下
     * 新容器支持,2019/10/15发版
     */
    try {
      window.browser.openWebView(param.url);
    } catch (error) {
      window.location.href = param.url;
    }
}


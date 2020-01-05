
### webpack 与 babel 在模块化中的作用
---

#### webpack 模块化的原理

webpack 本身维护了一套模块系统， 这套模块系统兼容了所有前端历史进程下的模块规范，包括 amd commonjs es6 等,本文主要针对 commonjs es6 规范进行说明。模块化的实现其实就在最后编译的文件内。

我编写了一个 demo 更好的展示效果。
```js
// webpack

const path = require('path');

module.exports = {
  entry: './a.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  }
};

```

```js

// a.js
import a from './c';

export default 'a.js';
console.log(a);

```

```js

// c.js

export default 333;

```

```js
(function(modules) {

  
  function __webpack_require__(moduleId) {
    var module =  {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    return module.exports;
  }

  return __webpack_require__(0);
})([
  (function (module, __webpack_exports__, __webpack_require__) {

    // 引用 模块 1
    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__c__ = __webpack_require__(1);

/* harmony default export */ __webpack_exports__["default"] = ('a.js');
console.log(__WEBPACK_IMPORTED_MODULE_0__c__["a" /* default */]);

  }),
  (function (module, __webpack_exports__, __webpack_require__) {

    // 输出本模块的数据
    "use strict";
    /* harmony default export */ __webpack_exports__["a"] = (333);
  })
]);


```

再精简下代码，会发现这是个自执行函数。

> 参考文档

1、[import、require、export、module.exports 混合使用详解](https://juejin.im/post/5a2e5f0851882575d42f5609#heading-1)
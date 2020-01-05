// webpack

const path = require('path');

module.exports = {
    entry: './a.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    }
};


// a.js
import a from './c';

export default 'a.js';
console.log(a);


// c.js

export default 333;

(function (modules) {


    function __webpack_require__(moduleId) {
        var module = {
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

        /* harmony default export */ //__webpack_exports__["default"] = ('a.js');
        console.log(__WEBPACK_IMPORTED_MODULE_0__c__["a" /* default */]);

    }),
    (function (module, __webpack_exports__, __webpack_require__) {

        // 输出本模块的数据
        "use strict";
      /* harmony default export */ __webpack_exports__["a"] = (333);
    })
]);

(function (modules) {

})([])
    //自执行函数的入参是个数组，这个数组包含了所有的模块，包裹在函数中。
    //自执行函数体里的逻辑就是处理模块的逻辑。
    //关键在于 __webpack_require__ 函数, 这个函数就是 require 或者是 import 的替代，
    //我们可以看到在函数体内先定义了这个函数，然后调用了他。
    //这里会传入一个 moduleId，这个例子中是0，也就是我们的入口模块 a.js 的内容。








//demo2 
    (function (modules) { // 将所有的模块组成一个modules对象传递进来， 键就是模块的路径，值就是模块内部的代码
        // 模块缓存对象， 已经解析过的路径都会放进来，可以判断当前需要解析的模块是否已经解析过
        var installedModules = {};

        // 定义一个 webpack 自己的的 require polyfill
        function __webpack_require__(moduleId) {

            // 检测 moduleId 是否已经存在缓存中了，若是已经存在则不需要在进行依赖解析
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }

            // 创建一个新的 module， 并将其push至缓存中，方便在后续递归遍历解析依赖时，检测是否已经解析过
            var module = installedModules[moduleId] = {
                i: moduleId, // moduleId 是自执行函数的参数 modules 对象的键，根本是模块的路径
                exports: {}
            };

            // 执行 modules[moduleId] 函数
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            // 将 exports 返回
            return module.exports;
        }

        //  将 webpack.config.js 配置中的 entry 作为 moduleId 进行传递
        return __webpack_require__("./src/index.js");
    })
    /*** 将项目中的几个模块作为自执行函数的参数传递 ***/
    ({
        // webpack.config.js 配置中 entry 的值，会将其作为递归解析依赖的入口
        "./src/index.js": (function (module, exports, __webpack_require__) {
            eval("const parent = __webpack_require__(/*! ./parent.js */ \"./src/parent.js\")\n\nconsole.log(parent)\n\n//# sourceURL=webpack:///./src/index.js?");
        }),
        "./src/parent.js": (function (module, exports, __webpack_require__) {
            eval("const child = __webpack_require__(/*! ./child.js */ \"./src/child.js\")\n\nmodule.exports = {\n  msg: '我是parent的信息',\n  child: child.msg\n}\n\n\n\n//# sourceURL=webpack:///./src/parent.js?");
        }),
        "./src/child.js": (function (module, exports) {
            eval("\nmodule.exports = {\n  msg: '我是child的信息'\n}\n\n//# sourceURL=webpack:///./src/child.js?");
        })
    });



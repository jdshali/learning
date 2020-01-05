

// a.js
import a from './c';

export default 'a.js';
console.log(a);


// c.js

export default 333;



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

  //上面这段 js 就是使用 webpack 编译后的代码（经过精简），其中就包含了 webpack的运行时代码，其中就是关于模块的实现。
  
  
















function foo() {
    console.log("id1:", this.id); //undefined
    console.log("this1:", this);//foo
    setTimeout(function() {
        console.log("id2:", this.id);//21
        console.log("this2:", this);//window
    }, 0);
}

var id = 21;

foo();

foo.call({id: 42});

//42 {id: 42} 21 window

async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout')
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')


// script start   async1 start  promise1   script end   async2 async1 end promise2 setTimeout
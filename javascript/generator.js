// function* abc() {
//     let count = 0;
//     while(true) {
//         let msg = yield ++count;
//         console.log(msg);
//     }
// }

// let iter = abc();
// console.log(iter.next().value);
// // 1
// console.log(iter.next('abc').value);
// // 'abc'
// // 2

//why?
// JS运行规则
//1、JS是单线程的，只有一个主线程
//2、函数代码执行从上到下，遇到被调用的函数先进入被调用函数执行，待完成后继续执行
//3、遇到异步事件，浏览器打开一个进程，主线程继续执行，异步事件执行完成，回调

//Generator函数是如何进行异步转化为同步操作的呢?
//其实很简单：
//*和 yield是一个标识符，在浏览器进行编译的时候，遇到这两个符号，自动进行了代码转换

//异步函数
function asy() {
    // $.ajax({
    //     url: 'test.txt',
    //     dataType: 'text',
    //     success() {
    //         console.log('异步操作成功');
    //     }
    // })
    setTimeout(() => {
        console.log('I am async');
    }, 2000);
}

function* geger() {
    let asyRes = yield asy();

    yield console.log('同步代码');
}

let it = geger().next(); 

console.log('it', it);

it.next()



//异步编程的老方法： 回调函数 事件监听 发布订阅 Promise对象

//ES6的异步编程方法
//新方法比较抽象，其实异步编程的语法目标，最终让我们更优雅的去编写异步代码，最终就像同步代码
//未来已来

//那什么是异步呢？

var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result);
}

let g = gen();
let res = g.next();
console.log(res)
res.value.then(function(data){
    return data.json();
  }).then(function(data){
    console.log('----data----', data)
    g.next(data);
});
//要学会 什么是async await?
//为啥会出现这种语法： 更优雅的方式写同步代码
//为了解决啥问题？
//它的优点
//事情本无完美，又有哪些缺点 
//你觉得它还有哪些改进之处
//最佳使用： 如何写的更优雅 如何处理错误等
//如何处理并行promise all  http://www.ruanyifeng.com/blog/2015/05/async.html 

async function f() {
    return 1;
}

console.log(f())

f().then(data => {
    console.log(data)
});

//以上会发现aysnc 返回的是一个promise对象
//如果function返回的是一个值，async会直接用Promise.resolve()包裹一下返回


//await是等待的意思，那他在等什么呢？ 
// [return_value] = await expression
//等待的是一个表达式，可以是一个常量 变量 promise 函数等

function getSomething() {
    return 'something';
}

async function testAsync() {
    return Promise.resolve('Hello')
}

testAsync().then(data => {
    console.log(data);
});

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();

    console.log(v1, v2);
}

test();

//await 会阻塞一个流程，直到返回结果，才会继续执行后面的代码

//如何处理错误？
// promise并不是只有 resolve还有一种是reject的情况， 而await只会等待一个结果，那如果出错了咋办
//1 try catch

async function myFunction() {
    try {
        await Promise.reject('1');
    } catch (err) {
        console.log('Err', err)
    }
}

myFunction();


//2 用promise的catch来做错误处理

async function myFunction() {
    await Promise.reject('1').catch(err => {
        console.log('Err', err)
    })
}

myFunction();


//async/await 与 promise的区别
//promise最大的问题是在于业务复杂之后，then内部的逻辑也变得复杂，或者是循环的异步场景嵌套场景 写出来没那么优雅



//解决长长的异步调用
function takeLongTime(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n + 200);
        }, n);
    });
}

//Promise
takeLongTime(100).then(res => {
    console.log('takeTime', res)
})

//await
async function testAsync() {
    const res = await takeLongTime(100);
    console.log('takeTime', res)
}

//优雅的处理then  https://segmentfault.com/a/1190000007535316
/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
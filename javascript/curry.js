// const curry = (fn, ...args1) => (...args2) => (
//     arg => arg.length === fn.length ? fn(...arg) : curry(fn, ...arg)
// )([...args1, ...args2]);

//函数柯里化

function curry(fn, args) {
    const fnLen = fn.length;
    const context = this;
    let argsOutter = args || [];

    return function() {
        let _args = Array.prototype.concat(argsOutter, ...arguments);
        debugger
        if(fnLen <= _args.length ) {
            return fn.apply(context, _args);
        } else {
            return curry(fn, _args);
        }
    }
}

function add (a, b, c) {
    return a + b + c;
}

let addCurry = curry(add);

addCurry(1, 2,3);
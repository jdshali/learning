
//思路
//origin
//1、new一个空对象 obj
//2、origin ? obj.apply(origin) : obj


function New(func) {
    var res = {};
    if (func.prototype !== null) {
        res.__proto__ = func.prototype;
    }
    var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
    if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
        return ret;
    }
    return res;
}
var obj = New(A, 1, 2);
// equals to
var obj = new A(1, 2);

//实际
//它创建了一个全新的对象
//它会被执行__proto__链接
//它使this指向新创建的对象
//通过new创建的对象最终被链接到这个函数的prototype对象上
//如果函数没有返回对象类型object 那么new表达式中的函数调用将返回该引用类型

function Dog(name) {
    this.name = name
    this.say = function () {
        console.log('name = ' + this.name)
    }
}
function Cat(name) {
    this.name = name
    this.say = function () {
        console.log('name = ' + this.name)
    }
}
function _new(fn, ...arg) {
    const obj = {}; //创建一个新的对象
    obj.__proto__ = fn.prototype; //把obj的__proto__指向fn的prototype,实现继承
    fn.apply(obj, arg) //改变this的指向
    return Object.prototype.toString.call(obj) == '[object Object]'? obj : {} //返回新的对象obj
}

//测试1
var dog = _new(Dog,'aaa')
dog.say() //'name = aaa'
console.log(dog instanceof Dog) //true
console.log(dog instanceof Cat) //true
//测试2
var cat = _new(Cat, 'bbb'); 
cat.say() //'name = bbb'
console.log(cat instanceof Cat) //true


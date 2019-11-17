// 如何去改变this的指向？

//有如下方法
//1、 使用箭头函数
//2、在函数内部使用_this = this
//3、使用apply call bind
//4、new实例化一个对象

// 例子1
var name = "windowName";

var a = {
    name : 'innerName',
    
    func1: function() {
        console.log(this.name);
    },

    func2: function() {
        console.log(this.name);
        setTimeout(function() {
            this.func1()
        }, 200)
    }
}

a.func2();

//报错
//原因是setTimeout调用的代码运行在与所在函数完全分离的执行环境上



//如何修改呢？


//1、箭头函数
//Es6中的箭头函数是可以避免ES5中使用this的坑的，箭头函数的this始终指向函数定义时候的this，而非执行时
//箭头函数中没有this绑定，必须通过查找作用域链决定其值，如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this，否则为undefined

var name = 'windowNanme';

var a = {
    name: "innerName",

    func1: function() {
        console.log(this.name);
    },

    func2: function() {
        setTimeout(() => {
            this.func1();
        }, 200);
    }
}

a.func2();


//使用apply call bind  apply和call会立即执行，对定时器失去作用
//因此只可以用bind

//例子apply
var a = {
    name: 'shali',

    func1: function() {
        console.log(this.name);
    },

    func2: function() {
        setTimeout(function(){
            this.func1();
        }.apply(a), 200)
    }
}

a.func2();


//call
var a = {
    name: 'shali',

    func1: function() {
        console.log(this.name);
    },

    func2: function() {
        setTimeout(function(){
            this.func1();
        }.call(a), 200)
    }
}

a.func2();


//bind

var a = {
    name: 'shali',

    func1: function() {
        console.log(this.name);
    },

    func2: function() {
        setTimeout(function(){
            this.func1();
        }.bind(a), 200)
    }
}

a.func2();



//那么究竟apply bind call有什么区别呢？

//apply调用一个函数，其具有一个指定的this值，以及作为一个数组提供的参数
//fun.apply(thisArg, [argsArray])
//call传入的是参数列表

//例子
var a = {
    add: function(a, b){
        console.log(a+b);
    }
}

var fAdd = a.add;

fAdd.apply(a, [1, 2]);
fAdd.call(a, 1,2 );


//问题？ bind和apply和call的区别

var a = {
    add: function(a, b){
        console.log(a+b);
    }
}

var fAdd = a.add;

fAdd.bind(a, 1, 2)()


//使用构造函数调用函数
//如果函数调用前使用了new关键字，则是调用了构造函数，这看起来就像是创建了新的函数，但是实际上JavaScript函数是重新创建的对象


//如
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName = arg2;
}

var a = new myFunction('zhao', 'shali');

//new的过程

//伪代码

var a = new myFunction('zhao', 'shali');

new myFunction{
    var obj = {};
    obj.__proto__ = myFunction.prototype;
    var result = myFunction.call(obj, 'shali', 'zhao');
    return typeof result === 'obj'  ? result : obj
}

//创建一个空对象obj
//将新创建的空对象的隐式原型指向其构造函数的显式原型
//使用call改变this的指向
//如果无返回值或者返回一个非对象值，则将obj返回作为新对象，如果返回值是一个新的对象的话那么直接返回该对象




//如何实现一个bind函数呢？
function testFn(args) {
    console.log(args);
}
Function.prototype.myBind = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('Erroe');
    }

    var _this = this;

    var args = [...arguments].slice(1);

    console.log(arguments, args)

}





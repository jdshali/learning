//this的指向：this永远指向最后调用它的那个对象
var name = "windowsName";

function a() {
    var name = "innerName";

    console.log(this, this.name); // window windowsName
}

a();

console.log('outter: this==', this);// window

//why?
//最后调用a的地方是 a(),前面没有调用的对象就是全局对象window; 相当于window.a();

// 如果是全局模式的话，全局对象就是undefined； “use strict”



// 例子2
var name = 'windowName';

var a = {
    name: 'innerName',
    sayHi: function() {
        console.log(`Hi ${this.name}`);
    }
}

a.sayHi(); //innerName

//why? this永远指向与最后调用它的对象


//例子3
var name = "windowName";

var a = {
    name: 'Cherry',
    sayHi: function() {
        console.log(`Hi ${this.name}`);
    }
}

window.a.sayHi() // 同上


//例子4
var name = 'windowName';

var a = {
    sayHi: function() {
        console.log(`Say ${this.name}`); //undefined
    }
}

a.sayHi();

//? 为啥没有原型链寻找？ 因为a的原型是Object而不是window


//例子5
var name = "windowName";

var a = {
    name: null,
    sayHi: function() {
        console.log(`Hi ${this.name}`);
    }
}

var f = a.sayHi;

f();

//


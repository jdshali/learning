//箭头函数根本没有自己的this, 导致内部this最后指向了外层代码的this 这个指向在定义的时候
//就已经确定了  而不是在调用的时候指向其执行环境的变量对象

//箭头函数内部的this是指向外层代码块的this  （最近的this，例2中的foo函数）的，
//所以我们可以通过改变外层代码块的this的指向从而改变箭头函数中this的指向 （例2中使用了foo函数的call方法）

function foo() {
    console.log("id1:", this.id);
    console.log("this1:", this);
    setTimeout(function() {
        console.log("id2:", this.id);
        console.log("this2:", this);
    }, 0);
}

var id = 21;

foo();

foo.call({id: 42});

function foo() {
    console.log("id1:", this.id);
    console.log("this1:", this);
    setTimeout(() => {
        console.log("id2:", this.id);
        console.log("this2:", this);
    }, 0);
}

var id = 21;

foo();

foo.call({id: 42});



//例3
class Logger {
    constructor() {
      this.printName = (name = 'there') => {
        this.print(`Hello ${name}`);
      };
    }
}
//箭头函数中的this指向constructor构造方法内部的this  由于此时constructor中的this尚未获得值
//当通过new命令生成对象实例时  将会自动调用constructor方法   constructor的this才能指向该实例对象
//在此过程中，箭头函数中的this一直引用着constructor中的this  当constructor中this发生变化，箭头函数的this也会一并发生变化
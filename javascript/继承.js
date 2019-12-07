// 寄生组合式继承
// 一般只建议写这种，因为其它方式的继承会在一次实例中调用两次父类的构造函数或有其它缺点。
// 核心实现是：用一个 F 空的构造函数去取代执行了 Parent 这个构造函数。
function Parent(name) {
    this.name = name;
}
Parent.prototype.sayName = function() {
    console.log('parent name:', this.name);
}

function create(proto) {
    function F(){}
    F.prototype = proto;
    return new F();
}

function Child(name, parentName) {//构造函数
    Parent.call(this, parentName);  
    this.name = name;    
}

Child.prototype = create(Parent.prototype);
Child.prototype.sayNameC = function() {
    console.log('child name:', this.name);
}
Child.prototype.constructor = Child; //将child的构造函数指到它自己的构造函数 否则将会是Parent

var parent = new Parent('father');
parent.sayName();    // parent name: father

var child = new Child('son', 'father');
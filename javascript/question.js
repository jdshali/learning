//说出以下代码的执行结果
var a = 10;
var obj = {
    a: 20,
    say: function () {
        console.log(this.a);
    }
};
obj.say();
//如何才能打印出10
  // 方式1
  var a = 10;
  var obj = {
      a: 20,
      say: () => {  // 此处改为箭头函数
          console.log(this.a);
      }
  };
  obj.say(); // -> 10
  
  // 方式2
  var a = 10;
  var obj = {
      a: 20,
      say: function () {
          console.log(this.a);
      }
  };
  obj.say.call(this); // 此处显示绑定this为全局window对象
  
  // 方式3
  var a = 10;
  var obj = {
      a: 20,
      say: function () {
          console.log(this.a);
      }
  };
  
  var say = obj.say; // 此处先创建一个临时变量存放函数定义，然后单独调用
  say();

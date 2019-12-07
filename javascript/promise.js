//https://github.com/forthealllight/blog/issues/4
var p=new Promise(function(resolve,reject){
    setTimeout(function(){
       resolve("success")
    },1000);
    console.log("创建一个新的promise");
})
p.then(function(x){
  console.log(x)
})

//特点
 //链式调用 Promise.all Promise.resolve Promise.race


//Promise/A+规范
 //术语
  // promise是一个对象或者函数，该对象或者函数有一个then方法
  // thenable是一个对象或者函数，用来定义then方法
  // value是promise状态成功的值
  // reason是失败的值
 //目的
  //保持代码的规范性
 
 //要求
  //一个promise必须有三个状态，pending fulfilled rejected
  //一个promise必须有一个then方法，接受两个参数
    // promise.then(onFulfilled, onRejected)


//三、实现一个符合Promise/A+规范的Promise
 //首先构造一个myPromise函数，变量保持一致

 //V1.0
 function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    function resolve(value){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
       }
    }
    function reject(reason){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}

myPromise.prototype.then=function(onFullfilled,onRejected){
    let self=this;
    switch(self.status){
       case "resolved":
         onFullfilled(self.value);
         break;
       case "rejected":
         onRejected(self.reason);
         break;
       default:       
    }
 }
 var p=new myPromise(function(resolve,reject){resolve(1)});
 p.then(function(x){console.log(x)})
 //输出1


//处理异步
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    self.onFullfilledArray=[];
    self.onRejectedArray=[];
    function resolve(value){
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
          self.onFullfilledArray.forEach(function(f){
                f(self.value);
                //如果状态从pending变为resolved，
                //那么就遍历执行里面的异步方法
          });
        
       }
    }
    function reject(reason){
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
          self.onRejectedArray.forEach(function(f){
              f(self.reason);
             //如果状态从pending变为rejected， 
             //那么就遍历执行里面的异步方法
          })
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}

myPromise.prototype.then=function(onFullfilled,onRejected){
    let self=this;
    switch(self.status){
       case "pending":
         self.onFullfilledArray.push(function(){
              onFullfilled(self.value)
         });
         self.onRejectedArray.push(function(){
              onRejected(self.reason)
         });
       case "resolved":
         onFullfilled(self.value);
         break;
       case "rejected":
         onRejected(self.reason);
         break;
       default:       
    }
}




//如何使用Promise
const p1 = request(``);
const p2 = request(``);

Promise.all([p1, p2]).then(res => {
   return request();
}).then(res => {

}).catch(res => {

})


//实现原理
function promiseAll(promises){
   return new Promise(function(resolve,reject){
      if(!Array.isArray(promises)){
         return reject(new TypeError("argument must be anarray"))
      }
      var countNum=0;
      var promiseNum=promises.length;
      var resolvedvalue=new Array(promiseNum);
      for(var i=0;i<promiseNum;i++){
         (function(i){
            Promise.resolve(promises[i]).then(function(value){
               countNum++;
               resolvedvalue[i]=value;
            if(countNum===promiseNum){
               return resolve(resolvedvalue)
            }
         },function(reason){
            return reject(reason)
         )
         })(i)
      }
      })
}
var p1=Promise.resolve(1),
p2=Promise.resolve(2),
p3=Promise.resolve(3);
promiseAll([p1,p2,p3]).then(function(value){
console.log(value)
})
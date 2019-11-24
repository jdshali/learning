

//防抖 debounce 英文的意思是开关的 去弹跳， 基本思路就是把多个信号合并为一个信号
//单反也如此 将多次拍摄合成一张
//在JS中就是 事件内的N个动作会被忽略，
//思路：
//将目标方法包装在setTimeout里
function debounce(func, delay) {
    var timeout;
    return function(e) {
        console.log("清除",timeout,e.target.value)
        clearTimeout(timeout);
        var context = this, args = arguments
        console.log("新的",timeout, e.target.value)
        timeout = setTimeout(function(){
          console.log("----")
          func.apply(context, args);
        },delay)
    };
};

var validate = debounce(function(e) {
    console.log("change", e.target.value, new Date-0)
}, 380);

// 绑定监听
document.querySelector("input").addEventListener('input', validate);


function throttle(fn, threshhold) {
    var timeout
    var start = new Date;
    var threshhold = threshhold || 160
    return function () {
   
    var context = this, args = arguments, curr = new Date() - 0
    
    clearTimeout(timeout)//总是干掉事件回调
    if(curr - start >= threshhold){ 
        console.log("now", curr, curr - start)//注意这里相减的结果，都差不多是160左右
        fn.apply(context, args) //只执行一部分方法，这些方法是在某个时间段内执行一次
        start = curr
    }else{
    //让方法在脱离事件后也能执行一次
        timeout = setTimeout(function(){
           fn.apply(context, args) 
        }, threshhold);
       }
     }
   }    
   var mousemove = throttle(function(e) {
    console.log(e.pageX, e.pageY)
   });
   
   // 绑定监听
   document.querySelector("#panel").addEventListener('mousemove', mousemove);



   //掘金 shotCat 面试系列
    //非立即执行版
    //首先准备回调函数
    function callBcTest(args) {
      console.log('callback function');
    }

    //然后准备包装函数
    //1、保存定时器标识
    //2、返回闭包函数： 对定时器的判断清除 一般还需保存函数的参数（一般就是事件返回的对象）
    //   和上下文（定时器存在this丢失）
    function debounce(fun, delay = 500) {
      let timer = null;

      return function(args) {
        let that = this;
        let _args = args;

        clearTimeout(fun.timer);
        fun.timer = setTimeout(function() { // 将定时器保存在函数的属性上
          fun.call(that, _args);
        }, delay);

        //另一种写法
        if(timer) {
          clearTimeout(timer);

          timer = setTimeout(function() {
            fun.call(that, _args);
          }, delay);
        }
      }
    }

    //接着用变量保存 debounce 返回的带有延时功能的函数
    let debounceFun = debounce(callBcTest, 500);

    let input = document.getElementById('debounce');

    input.addEventListener('keyup', function(e) {
      debounceFun(e.target.value);
    });


    //带有立即执行的防抖函数
    function debounce(fun, delay, immdiate = true) {
      let timer = null;
      return function(args) {
        let that = this;
        let _args = args;

        if(timer) clearTimeout(timer); //不管是否立即执行都需要首先清空定时器

        if(immdiate) { //
          if(!timer) {//如果定时器不存在，则说明延时已过，可以立即执行函数
            fun.apply(that, _args);
          }
          //不管上个延时是否完成，都需要重制定时器
          timer = setTimeout(function(){
            timer = null;//到时间后，定时器自动设置为null
          }, delay)
        } else {
          //如果是非立即执行版，则重新设定定时器，并将回调函数放入其中
          timer = setTimeout(function(){
            fun.call(that, _args);
          }, delay);
        }
      }
    }


    //节流
    //时间错版
    function throttle(fun, delay = 500) {
      let previous = 0;//记录上次触发的时间搓，设置为0是为了首次触发产生回调函数
      return function(args) {
        let now = Date.now();
        let that = this;
        let _args = args;

        if(now - previous > delay) {//如果时间差大于规定时间，则触发
          fun.apply(that, _args);
          previous = now
        }
      }
    }

    //定时器版本
    function throttle(fun, delay = 500) {
      let timer;
      return function(args) {
        if(!timer){
          timer = setTimeout(function() {
            timer = null;
            fun.apply(that, _args);
          }, delay);
        }
      }
    }

    //时间挫 + 定时器版本
    //实现第一次触发可以立即执行，结束触发也可有响应
    //该版本思路还是时间错版，定时器的作用仅仅是执行最后一次回调
    function throttle(fun, delay = 500) {
      let timer = null;
      let previous = 0;
      return function(args) {
        let now = Date.now();
        let remaining = delay - (now - previous);
        let that = this;
        let _args = args;
        clearTimeout(timer);

        if(remaining <= 0) {
          fun.apply(that, _args);
          previous = Date.now()
        } else {
          timer = setTimeout(function() {
            timer = setTimeout(function(){
            fun.apply(that, _args);
            }, remaining);
          });
        }
      }
    }

    //



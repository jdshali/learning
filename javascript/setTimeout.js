//setTimeout 倒计时误差
//https://zhuanlan.zhihu.com/p/23946889  这个技巧很不错
/**
 * 获取剩余时间
 * @param  {Number} endTime    截止时间
 * @param  {Number} deviceTime 设备时间
 * @param  {Number} serverTime 服务端时间
 * @return {Object}            剩余时间对象
 */
let getRemainTime = (endTime, deviceTime, serverTime) => {
    let t = endTime - Date.parse(new Date()) - serverTime + deviceTime
    let seconds = Math.floor((t / 1000) % 60)
    let minutes = Math.floor((t / 1000 / 60) % 60)
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    let days = Math.floor(t / (1000 * 60 * 60 * 24))
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}
// 获取服务端时间（获取服务端时间代码略）
getServerTime((serverTime) => {

    //设置定时器
    let intervalTimer = setInterval(() => {

        // 得到剩余时间
        let remainTime = getRemainTime(endTime, deviceTime, serverTime)

        // 倒计时到两个小时内
        if (remainTime.total <= 7200000 && remainTime.total > 0) {
            // do something

        //倒计时结束
        } else if (remainTime.total <= 0) {
            clearInterval(intervalTimer);
            // do something
        }
    }, 1000)
})


//https://juejin.im/post/5ceaaaf0e51d45508c2fb7c0#heading-0
//使用setTimeout代替setInterval进行间歇调用
var executeTimes = 0;
var intervalTime = 500;
var intervalId = null;

// 放开下面的注释运行setInterval的Demo
intervalId = setInterval(intervalFun,intervalTime);
// 放开下面的注释运行setTimeout的Demo
// setTimeout(timeOutFun,intervalTime);

function intervalFun(){
    executeTimes++;
    console.log("doIntervalFun——"+executeTimes);
    if(executeTimes==5){
        clearInterval(intervalId);
    }
}

function timeOutFun(){
    executeTimes++;
    console.log("doTimeOutFun——"+executeTimes);
    if(executeTimes<5){
        setTimeout(arguments.callee,intervalTime);
    }
}


//下面的方法很精确


var executeTimes = 0;
var intervalTime = 500;
var intervalId = null;
var oriTime = new Date().getTime();

// 放开下面的注释运行setInterval的Demo
// intervalId = setInterval(intervalFun,intervalTime);
// 放开下面的注释运行setTimeout的Demo
setTimeout(timeOutFun,intervalTime);

function intervalFun(){
    executeTimes++;
    var nowExecuteTimes = executeTimes;
    var timeDiff = new Date().getTime() - oriTime;
    console.log("doIntervalFun——"+nowExecuteTimes+", after " + timeDiff + "ms");
    var delayParam = 0;
    sleep(1000);
    console.log("doIntervalFun——"+nowExecuteTimes+" finish !");
    if(executeTimes==5){
        clearInterval(intervalId);
    }
}

function timeOutFun(){
    executeTimes++;
    var nowExecuteTimes = executeTimes;
    var timeDiff = new Date().getTime() - oriTime;
    console.log("doTimeOutFun——"+nowExecuteTimes+", after " + timeDiff + "ms");
    var delayParam = 0;
    sleep(1000);
    console.log("doTimeOutFun——"+nowExecuteTimes+" finish !");
    if(executeTimes<5){
        setTimeout(arguments.callee,intervalTime);
    }
}

function sleep(sleepTime){
    var start=new Date().getTime();
    while(true){
        if(new Date().getTime()-start>sleepTime){
            break;    
        }
    }
}


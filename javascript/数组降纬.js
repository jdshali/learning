

//什么是数组降纬
//降多维数组转化为一纬数组
//方法
//使用朴素的循环转换
//JavaScript的语言特性和数据结构的思想实现更为简洁优雅的转换

//常用的就是二维转化为一纬数组

var arr = [
    [1, 2, 3, 4],
    [5, 6],2
    [7, 8],
    [9, 0]
];
//方法一：
var result = [];
for(var r = 0; r < arr.length; r++) {
    for(var c = 0; c < arr[r].length; c++){
        result.push(arr[r][c]);
    }
}

console.log('result', result);


//方法二
//利用concat方法，将双重循环简化为单重循环

var result = [];
for(var r = 0; r < arr.length; r++) {
    result = result.concat(arr[r]);
}
console.log('concat', result);


//方法三
//使用apply + concat
//apply方法会调用一个函数，数组的各个元素将会依次成为被调用函数的各个参数

var result = Array.prototype.concat.apply([], arr);
console.log('result', result);

//以上就是三种常用的降二维数组的方法，工作中建议使用第三种，简洁，简单，这也是
//我们写代码追求的境界


//多维数组
//不简单

//方法一
//递归
Array.prototype.deepFlatten = function() {
    var result = [];//
    // this.forEach((item, index) => {
    //     if(Array.isArray(item)){
    //         item.forEach(arguments.callee); //为子数组则递归执行
    //     } else {
    //         result.push(item);
    //     }
    // })
    this.forEach(function(val, index) {
        if(Array.isArray(val)){
            val.forEach(arguments.callee); //相当于递归一次
        } else {
            result.push(val);
        }
    })

    return result;  

}
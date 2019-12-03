
//遍历数组通常使用for循环 ES5的话也可以使用forEach
//ES5具有遍历数组功能的还有map、filter、some、every、reduce、reduceRight等，
//只不过他们的返回结果不一样。但是使用foreach遍历数组的话，使用break不能中断循环，
//使用return也不能返回到外层函数

//遍历顺序有可能不是按照实际数组的内部顺序
//使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性
Array.prototype.method=function(){
    console.log(this.length);
}
var myArray=[1,2,4,5,6,7]
myArray.name="数组"
for (var index in myArray) {
    console.log(myArray[index]);
}
//所以for in更适合遍历对象，不要使用for in遍历数组。

//除了使用for循环，如何更简单的正确的遍历数组?
Array.prototype.method=function(){
   console.log(this.length);
}
var myArray=[1,2,4,5,6,7]
myArray.name="数组";
for (var value of myArray) {
    console.log(value);
}
//for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值
//for of遍历的只是数组内的元素，而不包括数组的原型属性method和索引name

//遍历对象 通常用for in来遍历对象的键名 hasOwnPropery
for (var key in myObject) {
    if(myObject.hasOwnProperty(key)){
        console.log(key);
    }
}


Object.prototype.method=function(){
    console.log(this);
}
var myObject={
    a:1,
    b:2,
    c:3
}
Object.keys(myObject).forEach(function(key,index){
    console.log(key,myObject[key])
})
    
    
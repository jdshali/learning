
### 一、数据绑定监听
 实现一个方法，可以给obj所有的属性添加和动态绑定事件，当属性值发生变化时候，触发事件
 ```Javascript
 let obj = { 
     key_1: 1,
     key_2: 2
 }

 function func(key) {
     console.log(key + '的值发生改变' + this[key]);
 }

 bindData(obj, func);
 obj.key_1 = 2; // 此时自动输出 "key_1 的值发生改变：2"
 obj.key_2 = 1; // 此时自动输出 "key_2 的值发生改变：1"
 ```

 实现方案
 ```Javascript
 function bindData(obj, fn) {
     for(let key in obj) {
         Object.defineProperty(obj, key, {
             set(newVal) {
                if (this.value !== newVal) {
                    this.value = newVal;
                    fn.call(obj, key);
                }
             },
             get() {
                return this.value; 
             }
         })
     }

 }

 ```


### 二、isUrl的判断

```Javascript
const isUrl = urlStr => {
    try {
        const { href, origin, host, hostname, pathname } = new URL(urlStr)
        return href && origin && host && hostname && pathname && true
    } catch (e) {
        return false
    }
}

// 正则
let isUrlReg = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
```


### 三、Vue 的响应式原理中 Object.defineProperty 有什么缺陷？为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？
 [参考](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/90)

- 思考思路
    - Object.defineProperty的缺陷
    - Proxy的优势，是否可以解决Object.defineProperty的问题
- Object.defineProperty的缺陷
    - 无法监控到数组下标的变化，导致通过数组下标添加元素，不能及时响应
    - Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。*Proxy可以劫持整个对象，并返回一个新的对象*
- Proxy不仅可以代理对象，还可以代理数组，还可以代理动态增加的属性,13种劫持操作

- Object.defineProperty为啥不可劫持数组的下标下标变化
    - 为了解决这个问题，vue内部做了处理对push pop shift unshift splice sort reverse做了hack处理
    - Object.defineProperty只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。Vue 2.x里，是通过 递归 + 遍历 data 对象来实现对数据的监控的，如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象是才是更好的选择。

```Javascript
//理解Proxy
//对数据的处理，对构造函数的处理、对数据的验证，说白了就是在访问对象之前添加了一层拦截
//语法
let p = new Proxy(target, handler);
//参数：需要包装的目标对象，包括任何对象--数组、函数、另一个代理
//handler: 对象 其属性是当执行一个操作时定义代理的行为的函数(可以理解为某种触发器)。

//简单的demo
let test = { 
    name: 'shali'
};

//实例化一个proxy实例，所有的操作都会被拦截
test = new Proxy(test, {
    get(target, key) {
        console.log('获取了getter属性');
        return target[key];
    }
});
console.log(test.name); //将会打印出获取了getter属性

//demo2 
let test2 = {
    name: 'shali',
    age: 13
}
test2 = new Proxy(test2, {
get(target, key) {
    let result = target[key];
    //如果是获取 money 属性，则添加 元字
    if (key === "age") result += "岁";
    return result;
},
set(target, key, value) {
    if (key === "age" && typeof value !== "number") {
    throw Error("age字段必须为Number类型");
    }
    return Reflect.set(target, key, value);
    //或者
    //target[key]=value
    //return true;
}
});
console.log(`我叫${test2.name}  我今年${test2.age}了`);
test2.age = "aa";
```
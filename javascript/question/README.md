
### 一、数据绑定监听
 实现一个方法，可以给obj所有的属性添加和动态绑定事件，当属性值发生变化时候，触发事件
 ```
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
 ```
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
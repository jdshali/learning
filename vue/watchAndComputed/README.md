### watch

- 这个API是我们之前介绍响应式时的Watcher类的一种封装，也就是三种watcher中的user-watcher，监听属性经常会被这样使用到：
```
export default {
  watch: {
    name(newName) {...}
  }
}
```
其实它只是this.$watch这个API的一种封装：
```
export default {
  created() {
    this.$watch('name', newName => {...})
  }
}

```

>监听属性初始化

- 为什么这么说，我们首先来看下初始化时watch属性都做了什么：
```js
    function initState(vm) {  // 初始化所有状态时
        vm._watchers = []  // 当前实例watcher集合
        const opts = vm.$options  // 合并后的属性
    
        ... // 其他状态初始化
    
        if(opts.watch) {  // 如果有定义watch属性
            initWatch(vm, opts.watch)  // 执行初始化方法
        }
    }

    //---------------------------------------------------------

    function initWatch (vm, watch) {  // 初始化方法
        for (const key in watch) {  // 遍历watch内多个监听属性
            const handler = watch[key]  // 每一个监听属性的值
            if (Array.isArray(handler)) {  // 如果该项的值为数组
            for (let i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i])  // 将每一项使用watcher包装
            }
            } else {
            createWatcher(vm, key, handler) // 不是数组直接使用watcher
            }
        }
    }

    //---------------------------------------------------------

    function createWatcher (vm, expOrFn, handler, options) {
        if (isPlainObject(handler)) { // 如果是对象，参数移位
            options = handler  
            handler = handler.handler
        }
        if (typeof handler === 'string') {  // 如果是字符串，表示为方法名
            handler = vm[handler]  // 获取methods内的方法
        }
        return vm.$watch(expOrFn, handler, options)  // 封装
    }

```


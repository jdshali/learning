
//EventEmitter 的核心就是事件触发与事件监听器功能的封装  EventEmitter 方法主要包含了 on,emit,once,off方法
class Event {
    constructor() {
        this.events = Object.create(null);
    }
    on(name, fn) {
        if (!this.events[name]) {
            this.events[name] = []
        }
        this.events[name].push(fn);
        return this;
    }
    emit(name, ...args) {
        if (!this.events[name]) {
            return this;
        }
        const fns = this.events[name]
        fns.forEach(fn => fn.call(this, ...args))
        return this;
    }
    off(name, fn) {
        if (!this.events[name]) {
            return this;
        }
        if (!fn) {
            this.events[name] = null
            return this
        }
        const index = this.events[name].indexOf(fn);
        this.events[name].splice(index, 1);
        return this;
    }
    once(name, fn) {
        const only = () => {
            fn.apply(this, arguments);
            this.off(name, only);
        };
        this.on(name, only);
        return this;
    }
}

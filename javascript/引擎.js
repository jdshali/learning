//https://juejin.im/post/5b3b93115188251afa62ad46

//模板引擎函数实现的本质，就是将模板中HTML结构与JavaScript语句、变量分离，
//通过Function构造函数 + apply(call)动态生成具有数据性的HTML代码。而如果要考虑性能的话，可以将模板进行缓存处理。
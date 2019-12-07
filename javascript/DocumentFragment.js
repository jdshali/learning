//https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment

//概念
//文档片段接口，表示一个没有父级文件的最小文档对象！
//被作为轻量版的Document使用，用于存储已排好版的或者尚未打理好的XML片段
//与Document最大的区别是：DocumentFragment不是真实的DOM树的一部分，它的变化不会触发DOM树的重新渲染
//并且不会导致性能等问题

//使用方法
//作为node接口类的参数，比如Node.appendChild和InsertBefore，
//这种情况下被添加或者插入的是片段的所有子节点，不是片段本身
//因为所有的节点会被一次性的插入到文档中，仅仅发生一次重渲染，

//其他用途
//该接口在web组件中也用到，

//具体使用
//可以使用document.createDocumentFragment 方法或者构造函数来创建一个空的 DocumentFragment。

//demo
 //html
 //<ul id="list"></ul>
 
 //Javascript
 const list = document.querySelector('#list');
 const fruits = ['Apple', 'Orange', 'Banana', 'Melon'];

 const fragment = document.createDocumentFragement();

 fruits.forEach(fruit => {
     const li = document.createElement('li');
     li.innerHTML = fruit;

     fragment.appendChild(li);
 });

 list.appendChild(fragment);
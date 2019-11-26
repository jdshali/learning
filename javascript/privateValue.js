var person = function(){   
    //变量作用域为函数内部，外部无法访问，不会与外部变量发生重名冲突   
    var name = "FE";      
    return {
      //管理私有变量   
       getName : function(){   
           return name;   
       },   
       setName : function(newName){   
           name = newName;   
       }   
    }   
}; 


//https://juejin.im/post/5c7e14fff265da2dd77403af

var Pclass = (function(){
    const a = Symbol('a');
    const m = Symbol('m');
    class  Pclass {
        constructor(){
            this[a] = 'a这是私有变量';
            this.b = '变量B-外部可访问';
            this[m] = function(){
                console.log('私有方法');
            }
        }
        getA(){
            console.log(this[a]);
        }
        getM(){
            console.log(this[m]);
        }
    }
    return Pclass
  }())
  
  let pc = new Pclass() 
  console.log(pc)  
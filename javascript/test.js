function foo() {
    console.log("id1:", this.id); //undefined
    console.log("this1:", this);//foo
    setTimeout(function() {
        console.log("id2:", this.id);//21
        console.log("this2:", this);//window
    }, 0);
}

var id = 21;

foo();

foo.call({id: 42});

//42 {id: 42} 21 window

async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout')
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')


// script start   async1 start  promise1   script end   async2 async1 end promise2 setTimeout
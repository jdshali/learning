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
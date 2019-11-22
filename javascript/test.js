
async function myFunction() {
  await Promise.reject('1').catch(err => {
      console.log('Err', err)
  })
}

myFunction();



// async function myFunction() {
//   try {
//       await Promise.reject('1');
//   } catch (err) {
//       console.log('Err', err)
//   }
// }

// myFunction();



// function getSomething() {
//   return 'something';
// }

// async function testAsync() {
//   return Promise.resolve('Hello')
// }

// testAsync().then(data => {
//   console.log(data);
// });


// async function test() {
//   const v1 = await getSomething();
//   const v2 = await testAsync();

//   console.log(v1, v2);

//   return [v1, v2];
// }

// test();
// console.log(test())
// var fetch = require('node-fetch');

// function* gen(){
//   var url = 'https://api.github.com/users/github';
//   var result = yield fetch(url);
//   console.log(result);
// }

// let g = gen();
// let res = g.next();
// console.log(res)
// res.value.then(function(data){
//     return data.json();
//   }).then(function(data){
//     console.log('----data----', data)
//     g.next(data);
// });
// // console.log(g.next())
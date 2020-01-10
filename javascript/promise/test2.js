var p1 = new Promise(function(resolve, reject){
    resolve(Promise.resolve('resolve'));
  });
  
  var p2 = new Promise(function(resolve, reject){
    resolve(Promise.reject('reject'));
  });
  
  var p3 = new Promise(function(resolve, reject){
    reject(Promise.resolve('resolve'));
  });
  
  p1.then(
    function fulfilled(value){
      console.log('fulfilled1: ' + value);
    }, 
    function rejected(err){
      console.log('rejected1: ' + err);
    }
  );
  
  p2.then(
    function fulfilled(value){
      console.log('fulfilled2: ' + value);
    }, 
    function rejected(err){
      console.log('rejected2: ' + err);
    }
  );
  
  p3.then(
    function fulfilled(value){
      console.log('fulfilled3: ' + value);
    }, 
    function rejected(err){
      console.log('rejected3: ' + err);
    }
  );
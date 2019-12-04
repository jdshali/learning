//数组去重
 let originArray = [1, 2, 3, 4, 5, 3, 2, 3, 2, 4, 1];

 //方式一
 const result = Array.from(new Set(originArray));
 console.log(result);

 //方法二
 const resultTemp = new Set(originArray);
 result = [...resultTemp];
 //合并
 [...new Set(originArray)]
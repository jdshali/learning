
//第一题的思路应该是使用递归 优化的话使用栈或者堆的思想来替换递归来优化递归的暴栈问题  具体的没想出来 
var locationList = [
    { id: 0, name: "中国" },
    { id: 1, pid: 0, name: "广东省" },
    { id: 2, pid: 1, name: "深圳市" },
    { id: 3, pid: 1, name: "广州市" }
]   


function buildLocationTree() {
    let tempObj = {
        subLocations:[]
    }
    locationList.forEach(item => {
        let temp = {
            id: item.id,
            name: item.name,
            pid: item.pid,
            subLocations: []
        }
        if(item.pid === undefined && tempObj.id == undefined){ //第一级
            tempObj = temp;
        } else {
            if(item.pid == 0) { //第二级
                tempObj.subLocations.push(temp)
            } else if(item.pid == 1 && tempObj.subLocations.subLocations.length == 0){////第三级
                tempObj.subLocations.subLocations.push(temp);
            }
        } 
    })
}



//第二题使用二分法思想
function sort(arr){
    if(arr.length<=1){
        return arr;
    }
    var nowNober = arr.splice( Math.floor(arr.length/2), 1 ).timestamp;  
    var leftArr = [];
    var reightArr = [];
    for(var i=0; i<arr.length; i++){
        if(arr[i].timestamp<=nowNober){
            leftArr.push(arr[i]);                              
        }else{
            reightArr.push(arr[i]);                            
        }
    }
    return sort(leftArr).concat(nowNober,sort(reightArr))  
}

//第三题 uni是16进制  
let uinTemp, uin;
function getCookieValue(key, cookieStr) {
    var result = new RegExp(`(?:^|\s)${key}=([^;]*)`).exec(cookieStr)
    return result && result[1]
}

uinTemp = getCookieValue('uin', document.cookie) || 0;
uin = parseInt(res, 16) // 
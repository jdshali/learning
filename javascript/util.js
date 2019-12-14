// 转驼峰
var s1 = "get-element-by-id"
var f = function(s) {
    return s.replace(/-\w/g, function(x) {
        //x: -e -b -i
        return x.slice(1).toUpperCase();
    })
}
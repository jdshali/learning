var obj = {
    foo: 'foo',
    toJSON: function () {
        return 'bar';
    }
};
JSON.stringify(obj);      // '"bar"'
JSON.stringify({ x: obj }); // '{"x":"bar"}' 



//数组去重
const removeDuplicateItems = arr => [...new Set(arr)];
removeDuplicateItems([42, 'foo', 42, 'foo', true, true]);
//=> [42, "foo", true]
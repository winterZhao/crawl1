let arr = [];
let t = [1,2,3,4,5];
let s = [2,3,4,5];
arr.push(t);
arr.push(s);
const co = require('co');
co(function*() {
    let {a,b} = yield Promise.all(arr);
    console.log(a);
    console.log(b);
})


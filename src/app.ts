import * as linq from 'linq-collections';

let test = new linq.List<string>(["c","b","a"]);
let result = test.where(e => e !== "c").toList();
console.log(result);



```javascript
const a = 10;

const add10 = (a) => a + 10;
console.log(add10(2));
const r = add10(a); // add10(10);

console.log(r);

const add5 = (b) => b + 5;
console.log(add5(5));

const apply1 = (f) => f(1); // function에 1을 넣는군..
const add2 = (a) => a + 2;

console.log(apply1(add2));
console.log(apply1((a) => a + 2));
console.log(apply1((b) => b + 33)); // 34?

const times = (f, n) => {
  let i = -1;
  while (++i < n) f(i);
};

times(console.log, 3); // 0, 1, 2

const addMaker = (a) => (b) => a + b;
const add11 = addMaker(10);
console.log(addMaker);
console.log(add11(5));

const addYoon = (a) => (b) => a + "YOON" + b;
const addLee = addYoon("LEE");
console.log(addLee("DOBBY")); // LEEDOBBY
```

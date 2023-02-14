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

```javascript
const list = [1, 2, 3];

for (let i = 0; i < list.length; i++) {
  console.log(list[i]);
}

const string = "abc";
for (let i = 0; i < string.length; i++) {
  console.log(string[i]);
}
console.log(string[0]);

for (const a of list) {
  console.log(a);
}

for (const a of string) {
  console.log(a);
}

const hogwarts = ["Harry", "Ron", "Dobby"];
let array = [];
// for (const a of hogwarts) {
//   array.push(a);
// }

/* ================== */
for (const a of hogwarts) {
  if (a === "Dobby") {
    array.push(a);
  } else {
    return;
  }
}
// 여기까지 내려오지도 못하는구나
console.log("<x)33333)<");
console.log(array);
/* ================== */

/* ================== */
for (const a of hogwarts) {
  if (a === "Dobby") {
    array.push(a);
  } else {
    console.log(a); // Harry Ron
  }
}
// 여기까지 내려오지도 못하는구나
console.log("<x)33333)<");
console.log(array); // [ 'Dobby' ]
/* ================== */
```

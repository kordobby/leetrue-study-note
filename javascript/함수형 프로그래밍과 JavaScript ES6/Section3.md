```javascript
const pokemon = [
  { name: "부스터", type: "불" },
  { name: "샤미드", type: "물" },
  { name: "쥬피썬더", type: "전기" },
  { name: "님피아", type: "페어리" },
  { name: "블래키", type: "악" },
  { name: "에브이", type: "에스퍼" },
];
```

## map

```javascript
let names = [];
for (const p of pokemon) {
  names.push(p.name);
}
console.log(names); // ["부스터", "샤미드", ..., "에브이"]

let types = [];
for (const p of pokemon) {
  types.push(p.type);
}
console.log(types); // ["불", "물", ..., "에스퍼"]
```

- 함수형 프로그래밍에서는 인자와 리턴값으로 소통하는 것을 권장

```javascript
const map = () => {
  let names = [];
  for (const p of pokemon) {
    names.push(p.name);
  }

  return names; // 결과를 리턴
};
```

```javascript
const map = (f, iter) => {
  let res = [];
  for (const p of iter) {
    res.push(f(p));
  }
};

// map 이라는 보조함수를 통해서
// 두번째 인자로 들어가는 iterable 안에있는 값에
// 1:1로 매핑되는 어떠한 값을 수집하겠다.

map((p) => p.name, pokemon);
```

```javascript
const pokemons = [
  { name: "이브이", type: "노말" },
  { name: "님피아", type: "페어리" },
  { name: "샤미드", type: "물" },
  { name: "부스터", type: "불" },
];

const map = (iter) => {
  let response = [];
  for (const p of iter) {
    names.push(p.name);
  }
  return response;
};

const map = (f, iter) => {
  let response = [];
  for (const a of iter) {
    names.push(f(a));
  }
  return response;
};

map((p) => p.name, pokemons);
```

## 이터러블 프로토콜을 따른 map 의 다형성

```javascript
console.log([1, 2, 3].map((a) => a + 1));

function* gen() {
  yield 2;
  yield 3;
  yield 4;
}

console.log(map((a) => a * a, gen())); // 4, 9, 16
```

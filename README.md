# js-pairs-data

[![github action status](https://github.com/hexlet-components/js-pairs-data/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-components/js-pairs-data/actions)

## Install

```sh
npm install @hexlet/pairs-data
```

## Usage example

```javascript
import {
  l, isList, toString, cons, filter, head, tail
} from '@hexlet/pairs-data';

const numbers = l(3, 4, 5, 6, 7);
toString(numbers); // (3, 4, 5, 6, 7)

const first = head(numbers); // 3
const rest = tail(numbers);
toString(rest); // (4, 5, 6, 7)

isList(first); // false
isList(rest); // true

const newList = cons(8, rest);
toString(newList); // (8, 4, 5, 6, 7)

const filtered = filter((el) => el < 7, newList);
isList(filtered); // true
toString(filtered); // (4, 5, 6)
```

For more information, see the [Full Documentation](https://github.com/hexlet-components/js-pairs-data/tree/master/docs)

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-pairs-data)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet (in Russian)](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-pairs-data).

See most active contributors on [hexlet-friends](https://friends.hexlet.io/).

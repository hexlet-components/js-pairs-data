// @ts-check

import * as pairs from '@hexlet/pairs';
import { getRandomIntInclusive } from './utils';

/**
 * Check if argument is list
 * @example
 * isList(l()); // true
 * isList(l('a', 5)); // true
 * isList(false); // false
 * isList('hello'); // false
 */
export const isList = (mix) => {
  if (mix === null) {
    return true;
  }
  if (pairs.isPair(mix)) {
    return isList(pairs.cdr(mix));
  }
  return false;
};

export const checkList = (list) => {
  if (!isList(list)) {
    let value;
    if (pairs.isPair(list)) {
      value = `pair: ${pairs.toString(list)}`;
    } else if (typeof list === 'object') {
      value = JSON.stringify(list, null, 2);
    } else {
      value = String(list);
    }
    throw new Error(`Argument must be list, but it was '${value}'`);
  }
};

/**
 * Add element to list
 * @example
 * cons(5, l(1, 0)); // (5, 1, 0)
 */
export const cons = (element, list) => {
  checkList(list);
  return pairs.cons(element, list);
};

/**
 * List constructor
 * @name l
 * @example
 * l(); // ()
 * l(8, 10); // (8, 10)
 */
export const l = (...elements) => (
  elements.reverse().reduce((acc, item) => cons(item, acc), null)
);

/**
 * Get list's head
 * @example
 * head(l(10, 15, 20)); // 10
 */
export const head = (list) => {
  checkList(list);
  return pairs.car(list);
};

/**
 * Get list's tail
 * @example
 * tail(l(10, 15, 20)); // (15, 20)
 */
export const tail = (list) => {
  checkList(list);
  return pairs.cdr(list);
};

/**
 * Check if list is empty
 * @example
 * isEmpty(l()); // true
 * isEmpty(l(0)); // false
 * isEmpty(l('a', 5)); // false
 */
export const isEmpty = (list) => {
  checkList(list);
  return list === null;
};

/**
 * Compare 2 lists
 * @example
 * isEqual(l(), l()); // true
 * isEqual(l(), l(8, 3)); // false
 * isEqual(l(1, 2, 10), l(1, 2, 10)); // true
 */
export const isEqual = (list1, list2) => {
  checkList(list1);
  checkList(list2);
  if (isEmpty(list1) && isEmpty(list2)) {
    return true;
  }
  if (head(list1) !== head(list2)) {
    return false;
  }
  return isEqual(tail(list1), tail(list2));
};

/**
 * Check if list has some element
 * @example
 * const numbers = l(3, 4, 5, 8);
 * has(numbers, 3); // true
 * has(numbers, 8); // true
 * has(numbers, 0); // false
 * has(numbers, 'wow'); // false
 */
export const has = (list, element) => {
  checkList(list);
  if (isEmpty(list)) {
    return false;
  }
  if (head(list) === element) {
    return true;
  }
  return has(tail(list), element);
};

/**
 * Reverse list
 * @example
 * reverse(l()); // ()
 * reverse(l(8, 2, 10)); // (10, 2, 8)
 */
export const reverse = (list) => {
  checkList(list);
  const iter = (items, acc) => (
    isEmpty(items) ? acc : iter(tail(items), cons(head(items), acc))
  );

  return iter(list, l());
};

/**
 * Filter list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * filter(num => num % 2 === 0, numbers); // (4, 8)
 */
export const filter = (callbackFn, list) => {
  checkList(list);
  const iter = (items, acc) => {
    if (isEmpty(items)) {
      return reverse(acc);
    }
    const item = head(items);
    const newAcc = callbackFn(item) ? cons(item, acc) : acc;
    return iter(tail(items), newAcc);
  };

  return iter(list, l());
};

/**
 * Conj
 * @example
 * const numbers = l(3, 4, 5, 8);
 * conj(numbers, 5); // (3, 4, 5, 8)
 * conj(numbers, 9); // (9, 3, 4, 5, 8)
 */
export const conj = (list, element) => (
  has(list, element) ? list : cons(element, list)
);


/**
 * Disj
 * @example
 * const numbers = l(5, 4, 5, 8);
 * disj(numbers, 5); // (4, 8)
 */
export const disj = (list, element) => (
  filter((e) => e !== element, list)
);

/**
 * Map list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * map(num => num + 2, numbers); // (5, 6, 7, 10)
 */
export const map = (callbackFn, list) => {
  checkList(list);
  const iter = (items, acc) => {
    if (isEmpty(items)) {
      return reverse(acc);
    }
    return iter(tail(items), cons(callbackFn(head(items)), acc));
  };

  return iter(list, l());
};

/**
 * Reduce list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * reduce((num, acc) => acc + 1, 0, numbers); // 4
 */
export const reduce = (callbackFn, acc, list) => {
  checkList(list);
  const iter = (items, result) => (
    isEmpty(items)
      ? result
      : iter(tail(items), callbackFn(head(items), result))
  );

  return iter(list, acc);
};

/**
 * Join 2 lists
 * @example
 * const numbers = l(3, 4, 5, 8);
 * const numbers2 = l(3, 2, 9);
 * concat(numbers, numbers2); // (3, 4, 5, 8, 3, 2, 9)
 * concat(l(), l(1, 10)); (1, 10)
 * concat(l(1, 10), l()); // (1, 10)
 */
export const concat = (list1, list2) => {
  checkList(list1);
  checkList(list2);
  if (isEmpty(list1)) {
    return list2;
  }
  return cons(head(list1), concat(tail(list1), list2));
};

/**
 * List's length
 * @example
 * const numbers = l(3, 4, 5, 8);
 * data.length(numbers); // 4
 */
export const length = (list) => {
  checkList(list);
  return reduce((n, acc) => acc + 1, 0, list);
};

/**
 * Get element from list by index
 * @example
 * const numbers = l(3, 4, 5, 8);
 * get(0, numbers); // 3
 * get(1, numbers); // 4
 * get(3, numbers); // 8
 */
export const get = (index, list) => {
  checkList(list);
  if (index === 0) {
    return head(list);
  }

  return get(index - 1, tail(list));
};

/**
 * Get random element from list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * random(numbers); // one random item from 3, 4, 5, 8
 */
export const random = (list) => {
  checkList(list);
  const n = getRandomIntInclusive(0, length(list) - 1);
  return get(n, list);
};

export const s = (...elements) => elements
  .reverse()
  .reduce((acc, item) => (has(acc, item) ? acc : conj(acc, item)), l());

/**
 * Convert list to string
 * @example
 * toString(l()); // ()
 * toString(l('hello', 'world')); // ('hello', 'world')
 */
export const toString = (list) => {
  if (!isList(list)) {
    if (pairs.isPair(list)) {
      return `pair: ${pairs.toString(list)}`;
    }
    if (typeof list === 'object') {
      return JSON.stringify(list, null, 2);
    }
    return list;
  }

  if (isEmpty(list)) {
    return '()';
  }

  const rec = (p) => {
    const first = head(p);
    const rest = tail(p);
    if (isEmpty(rest)) {
      return toString(first);
    }

    return `${toString(first)}, ${rec(rest)}`;
  };

  return `(${rec(list)})`;
};

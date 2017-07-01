// @flow

import 'source-map-support/register';

import * as pairs from 'hexlet-pairs';
import { getRandomIntInclusive } from './utils';

type List = (...args: any) => any | null;
type SetOnPairs = (...args: any) => any | null;

/**
 * Check if argument is list
 * @example
 * isList(l()); // true
 * isList(l('a', 5)); // true
 * isList(false); // false
 * isList('hello'); // false
 */
export const isList = (mix: any) => {
  if (mix === null) {
    return true;
  }
  if (pairs.isPair(mix)) {
    return isList(pairs.cdr(mix));
  }
  return false;
};

export const checkList = (list: ?List) => {
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
export const cons = (element: any, list: List) => {
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
export const l = (...elements: any) =>
  elements.reverse().reduce((acc, item) =>
    cons(item, acc), null);

/**
 * Get list's head
 * @example
 * head(l(10, 15, 20)); // 10
 */
export const head = (list: List) => {
  checkList(list);
  return pairs.car(list);
};

/**
 * Get list's tail
 * @example
 * tail(l(10, 15, 20)); // (15, 20)
 */
export const tail = (list: List) => {
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
export const isEmpty = (list: List) => {
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
export const isEqual = (list1: List, list2: List) => {
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
export const has = (list: List, element: any) => {
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
export const reverse = (list: List) => {
  checkList(list);
  const iter = (items, acc) =>
    (isEmpty(items) ? acc : iter(tail(items), cons(head(items), acc)));

  return iter(list, l());
};

/**
 * Filter list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * filter(n => n % 2 === 0, numbers); // (4, 8)
 */
export const filter = <U>(func: (value: U) => boolean, list: List<U>) => {
  checkList(list);
  const iter = (items, acc) => {
    if (isEmpty(items)) {
      return reverse(acc);
    }
    const item = head(items);
    const newAcc = func(item) ? cons(item, acc) : acc;
    return iter(tail(items), newAcc);
  };

  return iter(list, l());
};

/**
 * Conj
 */
export const conj = (set: SetOnPairs, element: any) =>
  (has(set, element) ? set : cons(element, set));


/**
 * Disj
 */
export const disj = (set: SetOnPairs, element: any) =>
  filter(e => e !== element, set);

/**
 * Map list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * map(n => n + 2, numbers); // (5, 6, 7, 10)
 */
export const map = <U, T>(func: (value: T) => U, list: List<T>): List<U> => {
  checkList(list);
  const iter = (items, acc) => {
    if (isEmpty(items)) {
      return reverse(acc);
    }
    return iter(tail(items), cons(func(head(items)), acc));
  };

  return iter(list, l());
};

/**
 * Reduce list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * reduce((n, acc) => acc + 1, 0, numbers); // 4
 */
export const reduce = (func, acc, list: List) => {
  checkList(list);
  const iter = (items, result) => (isEmpty(items) ?
    result : iter(tail(items), func(head(items), result)));
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
export const concat = (list1: List, list2: List) => {
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
export const length = (seq: List) => {
  checkList(seq);
  return reduce((n, acc) => acc + 1, 0, seq);
};

/**
 * Get element from list by index
 * @example
 * const numbers = l(3, 4, 5, 8);
 * get(0, numbers); // 3
 * get(1, numbers); // 4
 * get(3, numbers); // 8
 */
export const get = (i: number, seq: List) => {
  checkList(seq);
  if (i === 0) {
    return head(seq);
  }

  return get(i - 1, tail(seq));
};

/**
 * Get random element from list
 */
export const random = (seq: List) => {
  checkList(seq);
  const n = getRandomIntInclusive(0, length(seq) - 1);
  return get(n, seq);
};

/**
 * Constructor for Set
 */
export const s = (...elements: any) =>
  elements.reverse().reduce((acc, item) =>
    (has(acc, item) ? acc : conj(acc, item)), l());
/**
 * Convert list to string
 * @example
 * toString(l()); // ()
 * toString(l('hello', 'world')); // ('hello', 'world')
 */
export const toString = (list: List) => {
  if (!isList(list)) {
    if (pairs.isPair(list)) {
      return `pair: ${pairs.toString(list)}`;
    } else if (typeof list === 'object') {
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

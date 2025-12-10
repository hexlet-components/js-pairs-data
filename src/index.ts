import {
  cons as makePair,
  cdr as pairCdr,
  car as pairCar,
  isPair,
  toString as pairToString,
  type Pair,
} from '@hexlet/pairs'

import { getRandomIntInclusive } from './utils.js'

export type List<T = unknown> = Pair<T, unknown> | null

const isNil = <T>(list: List<T>): list is null => list === null

const emptyList = <T>(): List<T> => null

type PrintablePrimitive = string | number | boolean | bigint | symbol | undefined

const formatNonList = (value: unknown): string => {
  if (isPair(value)) {
    return `pair: ${pairToString(value)}`
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2)
  }
  return String(value as PrintablePrimitive)
}

/**
 * Check if argument is list
 * @example
 * isList(l()); // true
 * isList(l('a', 5)); // true
 * isList(false); // false
 * isList('hello'); // false
 */
export const isList = (value: unknown): value is List<unknown> => {
  if (value === null) {
    return true
  }
  if (isPair(value)) {
    return isList(pairCdr(value))
  }
  return false
}

export function checkList(value: unknown): asserts value is List<unknown> {
  if (!isList(value)) {
    const printable = formatNonList(value)
    throw new Error(`Argument must be list, but it was '${printable}'`)
  }
}

const ensureNonEmpty = <T>(list: List<T>): Pair<T, unknown> => {
  if (isNil(list)) {
    throw new Error('Operation requires non-empty list')
  }
  return list
}

/**
 * Add element to list
 * @example
 * cons(5, l(1, 0)); // (5, 1, 0)
 */
export const cons = <T>(element: T, list: List<T>): List<T> => {
  checkList(list)
  return makePair(element, list)
}

/**
 * List constructor
 * @name l
 * @example
 * l(); // ()
 * l(8, 10); // (8, 10)
 */
export const l = <T>(...elements: T[]): List<T> => (
  [...elements].reverse().reduce<List<T>>(
    (acc, item) => cons(item, acc),
    emptyList<T>(),
  )
)

/**
 * Get list's head
 * @example
 * head(l(10, 15, 20)); // 10
 */
export const head = <T>(list: List<T>): T => {
  checkList(list)
  return pairCar(ensureNonEmpty(list))
}

/**
 * Get list's tail
 * @example
 * tail(l(10, 15, 20)); // (15, 20)
 */
export const tail = <T>(list: List<T>): List<T> => {
  checkList(list)
  return pairCdr(ensureNonEmpty(list)) as List<T>
}

/**
 * Check if list is empty
 * @example
 * isEmpty(l()); // true
 * isEmpty(l(0)); // false
 * isEmpty(l('a', 5)); // false
 */
export const isEmpty = <T>(list: List<T>): list is null => {
  checkList(list)
  return isNil(list)
}

/**
 * Compare 2 lists
 * @example
 * isEqual(l(), l()); // true
 * isEqual(l(), l(8, 3)); // false
 * isEqual(l(1, 2, 10), l(1, 2, 10)); // true
 */
export const isEqual = <T>(list1: List<T>, list2: List<T>): boolean => {
  checkList(list1)
  checkList(list2)

  if (isNil(list1) || isNil(list2)) {
    return isNil(list1) && isNil(list2)
  }

  if (head(list1) !== head(list2)) {
    return false
  }

  return isEqual(tail(list1), tail(list2))
}

/**
 * Check if list has some element
 * @example
 * const numbers = l(3, 4, 5, 8);
 * has(numbers, 3); // true
 * has(numbers, 8); // true
 * has(numbers, 0); // false
 * has(numbers, 'wow'); // false
 */
export const has = <T>(list: List<T>, element: T): boolean => {
  checkList(list)
  if (isNil(list)) {
    return false
  }
  if (head(list) === element) {
    return true
  }
  return has(tail(list), element)
}

/**
 * Reverse list
 * @example
 * reverse(l()); // ()
 * reverse(l(8, 2, 10)); // (10, 2, 8)
 */
export const reverse = <T>(list: List<T>): List<T> => {
  checkList(list)
  const iter = (items: List<T>, acc: List<T>): List<T> => (
    isNil(items) ? acc : iter(tail(items), cons(head(items), acc))
  )

  return iter(list, emptyList<T>())
}

/**
 * Filter list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * filter(num => num % 2 === 0, numbers); // (4, 8)
 */
export const filter = <T>(callbackFn: (item: T) => boolean, list: List<T>): List<T> => {
  checkList(list)
  const iter = (items: List<T>, acc: List<T>): List<T> => {
    if (isNil(items)) {
      return reverse(acc)
    }
    const item = head(items)
    const newAcc = callbackFn(item) ? cons(item, acc) : acc
    return iter(tail(items), newAcc)
  }

  return iter(list, emptyList<T>())
}

/**
 * Conj
 * @example
 * const numbers = l(3, 4, 5, 8);
 * conj(numbers, 5); // (3, 4, 5, 8)
 * conj(numbers, 9); // (9, 3, 4, 5, 8)
 */
export const conj = <T>(list: List<T>, element: T): List<T> => (
  has(list, element) ? list : cons(element, list)
)

/**
 * Disj
 * @example
 * const numbers = l(5, 4, 5, 8);
 * disj(numbers, 5); // (4, 8)
 */
export const disj = <T>(list: List<T>, element: T): List<T> => (
  filter(value => value !== element, list)
)

/**
 * Map list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * map(num => num + 2, numbers); // (5, 6, 7, 10)
 */
export const map = <T, U>(callbackFn: (item: T) => U, list: List<T>): List<U> => {
  checkList(list)
  const iter = (items: List<T>, acc: List<U>): List<U> => {
    if (isNil(items)) {
      return reverse(acc)
    }
    return iter(tail(items), cons(callbackFn(head(items)), acc))
  }

  return iter(list, emptyList<U>())
}

/**
 * Reduce list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * reduce((num, acc) => acc + 1, 0, numbers); // 4
 */
export const reduce = <T, R>(callbackFn: (item: T, acc: R) => R, acc: R, list: List<T>): R => {
  checkList(list)
  const iter = (items: List<T>, result: R): R => (
    isNil(items)
      ? result
      : iter(tail(items), callbackFn(head(items), result))
  )

  return iter(list, acc)
}

/**
 * Join 2 lists
 * @example
 * const numbers = l(3, 4, 5, 8);
 * const numbers2 = l(3, 2, 9);
 * concat(numbers, numbers2); // (3, 4, 5, 8, 3, 2, 9)
 * concat(l(), l(1, 10)); (1, 10)
 * concat(l(1, 10), l()); // (1, 10)
 */
export const concat = <T>(list1: List<T>, list2: List<T>): List<T> => {
  checkList(list1)
  checkList(list2)
  if (isNil(list1)) {
    return list2
  }
  return cons(head(list1), concat(tail(list1), list2))
}

/**
 * List's length
 * @example
 * const numbers = l(3, 4, 5, 8);
 * data.length(numbers); // 4
 */
export const length = <T>(list: List<T>): number => {
  checkList(list)
  return reduce((_item, acc) => acc + 1, 0, list)
}

/**
 * Get element from list by index
 * @example
 * const numbers = l(3, 4, 5, 8);
 * get(0, numbers); // 3
 * get(1, numbers); // 4
 * get(3, numbers); // 8
 */
export const get = <T>(index: number, list: List<T>): T => {
  checkList(list)
  if (index === 0) {
    return head(list)
  }

  return get(index - 1, tail(list))
}

/**
 * Get random element from list
 * @example
 * const numbers = l(3, 4, 5, 8);
 * random(numbers); // one random item from 3, 4, 5, 8
 */
export const random = <T>(list: List<T>): T => {
  checkList(list)
  const size = length(list)
  if (size === 0) {
    throw new Error('Cannot get random element from empty list')
  }
  const n = getRandomIntInclusive(0, size - 1)
  return get(n, list)
}

export const s = <T>(...elements: T[]): List<T> => elements
  .reverse()
  .reduce(
    (acc, item) => (has(acc, item) ? acc : conj(acc, item)),
    emptyList<T>(),
  )

/**
 * Convert list to string
 * @example
 * toString(l()); // ()
 * toString(l('hello', 'world')); // ('hello', 'world')
 */
export const toString = (value: unknown): string => {
  if (!isList(value)) {
    return formatNonList(value)
  }

  if (isNil(value)) {
    return '()'
  }

  const rec = (node: List<unknown>): string => {
    const first = head(node)
    const rest = tail(node)
    if (isNil(rest)) {
      return toString(first)
    }

    return `${toString(first)}, ${rec(rest)}`
  }

  return `(${rec(value)})`
}

// @ts-check

import * as pairs from '@hexlet/pairs';
import {
  cons,
  isList,
  s,
  l,
  has,
  map,
  filter,
  tail,
  head,
  concat,
  isEqual,
  reverse,
  random,
  conj,
  disj,
  checkList,
  reduce,
  length,
  toString,
} from '../src';

describe('Data', () => {
  it('#make', () => {
    const numbers = l(3, 4, 5);
    expect(toString(numbers)).toBe('(3, 4, 5)');
  });

  it('#cons', () => {
    const numbers = l(3, 4, 5);
    expect(toString(cons(8, numbers))).toBe('(8, 3, 4, 5)');
  });

  it('#head', () => {
    const numbers = l(3, 4, 5);
    expect(head(numbers)).toBe(3);
    expect(() => head(5)).toThrowError(/5/);
  });

  it('#tail', () => {
    const numbers = l(3, 4, 5);
    expect(toString(tail(numbers))).toBe('(4, 5)');
    expect(() => tail({ key: 'value' })).toThrowError(/value/);
  });

  it('#isList', () => {
    const numbers = l(3, 4, 5);
    expect(isList(numbers)).toBe(true);
    expect(isList(l())).toBe(true);
    expect(isList(5)).toBe(false);
    expect(!isList(pairs.cons(3, pairs.cons(3, 2)))).toBe(true);
  });

  it('#checkList', () => {
    const pair = pairs.cons(3, pairs.cons(3, 2));
    expect(() => checkList(pair)).toThrowError('pair: (3, (3, 2))');
  });

  it('#reverse', () => {
    const numbers = l(3, 4, 5);
    expect(toString(reverse(numbers))).toBe('(5, 4, 3)');

    expect(toString(reverse(l(1)))).toBe('(1)');
  });

  it('#map', () => {
    const numbers = l(3, 4, 5);
    const numbers2 = map((n) => n + 2, numbers);
    expect(toString(numbers2)).toBe('(5, 6, 7)');
  });

  it('#filter', () => {
    const numbers = l(3, 4, 5, 8);
    const numbers2 = filter((n) => n % 2 === 0, numbers);
    expect(toString(numbers2)).toBe('(4, 8)');
  });

  it('#reduce1', () => {
    const numbers = l(3, 4, 5, 8);
    expect(length(numbers)).toBe(4);
  });

  it('#reduce2', () => {
    const numbers = l(3, 4, 5, 8);
    const count = reduce((n, acc) => acc + 1, 0, numbers);
    expect(count).toBe(4);
  });

  it('#concat', () => {
    const numbers = l(3, 4, 5, 8);
    const numbers2 = l(3, 2, 9);
    expect(toString(concat(numbers, numbers2))).toBe('(3, 4, 5, 8, 3, 2, 9)');

    expect(toString(concat(l(), l(1, 10)))).toBe('(1, 10)');
    expect(toString(concat(l(1, 10), l()))).toBe('(1, 10)');
  });

  it('#isEqual', () => {
    const numbers = l(3, 4, 5, 8);
    const numbers2 = l(3, 4, 5, 8);
    const numbers3 = l(3, 2, 9);
    expect(isEqual(numbers, numbers2)).toBe(true);
    expect(!isEqual(numbers2, numbers3)).toBe(true);
  });

  it('#has', () => {
    const numbers = l(3, 4, 5, 8);
    expect(has(numbers, 3)).toBe(true);
    expect(has(numbers, 8)).toBe(true);
    expect(!has(numbers, 0)).toBe(true);
    expect(!has(numbers, 7)).toBe(true);
  });

  it('#s', () => {
    const numbers = s(3, 4, 3, 5, 5);
    expect(toString(numbers)).toBe('(4, 3, 5)');
  });

  it('#conj', () => {
    const numbers = s(3, 4, 3, 5, 5);
    expect(!has(numbers, 0)).toBe(true);
    const numbers2 = conj(numbers, 0);
    expect(has(numbers2, 0)).toBe(true);
  });

  it('#disj', () => {
    const numbers = s(3, 4, 3, 5, 5);
    expect(has(numbers, 4)).toBe(true);
    const numbers2 = disj(numbers, 4);
    expect(!has(numbers2, 4)).toBe(true);
  });

  it('#toString', () => {
    const list = l();
    expect(toString(list)).toBe('()');
  });

  it('#toString2', () => {
    const list = l(3, l(4, 5), l(10, l(3)), 5, 5);
    expect(toString(list)).toBe('(3, (4, 5), (10, (3)), 5, 5)');
    const list2 = l(3, pairs.cons(4, 5), pairs.cons(10, 3), 5, 5);
    expect(toString(list2)).toBe('(3, pair: (4, 5), pair: (10, 3), 5, 5)');
  });

  it('#random', () => {
    const numbers = s(3, 4, 3, 5, 5);
    const randomNumber = random(numbers);
    expect(has(numbers, randomNumber)).toBe(true);
  });

  it('#random 2', () => {
    const numbers = l(3);
    const randomNumber = random(numbers);
    expect(randomNumber).toBe(3);
  });
});

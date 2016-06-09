// @flow

import * as pairs from 'hexlet-pairs';

export const cons = (element, list) => pairs.cons(element, list);

export const l = (...elements) =>
  elements.reverse().reduce((acc, item) =>
    cons(item, acc), null);

export const head = (list) => pairs.car(list);

export const tail = (list) => pairs.cdr(list);

export const isEmpty = (list) => list === null;

export const isList = (mix) => mix === null || pairs.isPair(mix);

export const isEqual = (list1, list2) => {
  if (isEmpty(list1) && isEmpty(list2)) {
    return true;
  }
  if (head(list1) !== head(list2)) {
    return false;
  }
  return isEqual(tail(list1), tail(list2));
};

export const isContains = (list, element) => {
  if (isEmpty(list)) {
    return false;
  }
  if (head(list) === element) {
    return true;
  }
  return isContains(tail(list), element);
};

export const reverse = (list) => {
  const iter = (items, acc) => {
    return isEmpty(items) ? acc : iter(tail(items), cons(head(items), acc));
  };
  return iter(list, l());
};

export const filter = (func, list) => {
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

export const conj = (set, element) => {
  return isContains(set, element) ? set : cons(element, set);
};

export const disj = (set, element) =>
  filter(e => e !== element, set);

export const map = (func, list) => {
  const iter = (items, acc) => {
    if (isEmpty(items)) {
      return reverse(acc);
    }
    return iter(tail(items), cons(func(head(items)), acc));
  };

  return iter(list, l());
};

export const reduce = (func, acc, list) => {
  const iter = (items, result) => {
    return isEmpty(items) ? result : iter(tail(items), func(head(items), result));
  };
  return iter(list, acc);
};

export const append = (list1, list2) => {
  if (isEmpty(list1)) {
    return list2;
  }
  return cons(head(list1), append(tail(list1), list2));
};

export const length = (seq) => reduce((n, acc) => acc + 1, 0, seq);

export const s = (...elements) => {
  return elements.reverse().reduce((acc, item) => {
    return isContains(acc, item) ? acc : conj(acc, item);
  }, l());
};

export const toString = (seq) => pairs.toString(seq);


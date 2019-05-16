import * as list from 'hexlet-pairs-data';
import { attach, typeTag, contents } from '../src';

describe('Types', () => {
  it('#attach', () => {
    const data = 'text, pair, list or others';
    const typeData = attach('typeName', data);
    expect(typeTag(typeData)).toBe('typeName');
    expect(contents(typeData)).toBe('text, pair, list or others');
  });

  it('#typeTag', () => {
    const data = list.l();
    const typeData = attach('typeName', data);
    expect(typeTag(typeData)).toBe('typeName');
  });

  it('#contents', () => {
    const data = list.l(2, 3, 4);
    const typeData = attach('', data);
    expect(list.toString(contents(typeData))).toBe('(2, 3, 4)');
  });
});

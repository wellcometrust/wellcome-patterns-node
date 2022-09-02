import { removeEmptyProps } from '../../utils/json';

describe('removeEmptyProps', () => {
  it('should remove null and undefined values', () => {
    const obj = {
      thing: 'that exists',
      anotherThatIsNull: null,
      iAmUndefined: undefined,
    };

    const emptiedObject = removeEmptyProps(obj);

    expect(emptiedObject.thing).toBe('that exists');
    expect(emptiedObject.anotherThatIsNull).toBeUndefined();
    expect(emptiedObject.iAmUndefined).toBeUndefined();
  });
});

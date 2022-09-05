import { removeEmptyProps, removeUndefinedProps } from '../../utils/json';

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

describe('removeUndefinedProps', () => {
  it('removes null and undefined values', () => {
    const obj = {
      thing: 'that exists',
      anotherThatIsNull: null,
      iAmUndefined: undefined,
    };

    const emptiedObject = removeUndefinedProps(obj);

    expect(emptiedObject).toStrictEqual({
      thing: 'that exists',
    });
  });

  it('removes null and undefined values from nested objects', () => {
    const obj = {
      thing: 'that exists',
      innerObject: {
        thing: 'that exists inside the other thing',
        anotherThatIsNull: null,
        iAmUndefined: undefined,
      },
      innerArray: [
        {
          thing: 'that is in a list of other things',
          anotherThatIsNull: null,
          iAmUndefined: undefined,
        },
      ],
    };

    const emptiedObject = removeUndefinedProps(obj);

    expect(emptiedObject).toStrictEqual({
      thing: 'that exists',
      innerObject: {
        thing: 'that exists inside the other thing',
      },
      innerArray: [
        {
          thing: 'that is in a list of other things',
        },
      ],
    });
  });
});

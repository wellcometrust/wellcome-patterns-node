import { transformLabel } from '.';

describe('transformLabel', () => {
  test.each([
    {
      label: { en: ['Foundations for moral relativism / J. David Velleman.'] },
      expected: 'Foundations for moral relativism / J. David Velleman.',
    },
    { label: { none: ['-'] }, expected: undefined },
    { label: undefined, expected: undefined },
    {
      label: 'Foundations for moral relativism / J. David Velleman.',
      expected: 'Foundations for moral relativism / J. David Velleman.',
    },
  ])('the transformed label from $label is $expected', ({ label, expected }) =>
    expect(transformLabel(label)).toBe(expected)
  );
});

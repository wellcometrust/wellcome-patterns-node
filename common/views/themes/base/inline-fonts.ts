export const inlineFonts = `
@font-face {
  font-family: Wellcome Bold Web Subset;
  src: url('data:application/font-woff;charset=utf-8;base64,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') format('woff');
  unicode-range: U+0020, U+0027, U+002C, U+002E, U+0030-0039, U+003F, U+0041-005A, U+0061-007A;
  font-weight: bold;
  font-style: normal;
}`;

/*
https://unicode.org/charts/PDF/U0000.pdf
U+0020: space,
U+0022: quotation,
U+002C: comma,
U+002E: fullstop,
U+0030-0039 : digits 0-9
U+003F: question mark,
U+0041-005A: uppercase,
U+0061-007A: lowercase
*/

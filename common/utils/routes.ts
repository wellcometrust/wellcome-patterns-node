import { LinkProps } from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { PropsWithChildren } from 'react';
import { isNotUndefined, isUndefined } from './array';
import { parseCsv, quoteVal } from './csv';
import { isInTuple } from './type-guards';
import { OptionalToUndefined, UndefinableToOptional } from './utility-types';

export type QueryParam = ParsedUrlQuery[string];
export type QueryTo<Props> = (
  query: ParsedUrlQuery
) => OptionalToUndefined<Props>;
export type LinkFrom<Props> = PropsWithChildren<Props> &
  Omit<LinkProps, 'as' | 'href'>;

type Codec<T> = {
  decode: (p: QueryParam) => T;
  encode: (v: T) => QueryParam;
};
type CodecMap = Record<string, Codec<unknown>>;
// Gets the returns type of decode, and creates the type
// { key: returnTypeOfDecode }
export type FromCodecMap<Map extends CodecMap> = UndefinableToOptional<{
  [K in keyof Map]: ReturnType<Map[K]['decode']>;
}>;

function paramParser<T>(
  param: QueryParam,
  fs: {
    empty: (p: '') => T;
    string: (p: string) => T;
    array: (p: string[]) => T;
    nodef: () => T;
  }
): T {
  return param === ''
    ? fs.empty(param)
    : typeof param === 'string'
    ? fs.string(param)
    : Array.isArray(param)
    ? fs.array(param)
    : fs.nodef();
}

export function toCsv(param: QueryParam): string[] {
  // We use this because of some form submission hijacking that we do.
  // We have the convention that a string `key=a,b,c` is synonymous with `key=['a', 'b', 'c']`
  // in the API. Where we can, we will use links to make sure we use the CSV in the URL.
  // When submitting a form the convention for checkboxes/radios is `key=a&key=b`.
  // We don't see this with JS enabled, as we convert to a link, and use the Next Router,
  // but for non-js users, this works.
  return paramParser(param, {
    empty: () => [],
    string: p => p.split(','),
    array: p => p,
    nodef: () => [],
  });
}

export function toCsvFromQuotedCsv(param: QueryParam): string[] {
  return paramParser(param, {
    empty: () => [],
    string: p => parseCsv(p),
    array: p => p,
    nodef: () => [],
  });
}

export function toNumber(param: QueryParam, fallback: number): number {
  return paramParser(param, {
    empty: () => fallback,
    string: p => parseInt(p, 10) || fallback,
    array: p => parseInt(p[0], 10) || fallback,
    nodef: () => fallback,
  });
}

export function toMaybeNumber(param: QueryParam): undefined | number {
  return paramParser(param, {
    empty: () => undefined,
    string: p => parseInt(p, 10) || undefined,
    array: p => parseInt(p[0], 10) || undefined,
    nodef: () => undefined,
  });
}

export function toString(param: QueryParam, fallback: string): string {
  return paramParser(param, {
    empty: () => '',
    string: p => p,
    array: p => p.join(','),
    nodef: () => fallback,
  });
}

export function toMaybeString(param: QueryParam): undefined | string {
  return paramParser(param, {
    empty: () => undefined,
    string: p => p,
    array: p => p.join(','),
    nodef: () => undefined,
  });
}

export function toBoolean(param: QueryParam): boolean {
  return paramParser(param, {
    empty: () => false,
    string: p => p === 'true',
    array: () => false,
    nodef: () => false,
  });
}

export function toSource<T extends string>(
  param: QueryParam,
  sources: readonly T[]
): T | undefined {
  const val = toMaybeString(param);

  if (val && isInTuple(val, sources)) {
    return val;
  }
}

function fromString(v: string): QueryParam {
  return v === '' ? undefined : v;
}

function fromNumber(v: number): QueryParam {
  return v === 1 ? undefined : v.toString();
}

function fromMaybeNumber(v: number | undefined): QueryParam {
  return v ? (v === 1 ? undefined : v.toString()) : undefined;
}

function fromCsv(v: string[]): QueryParam {
  return v.length === 0 ? undefined : v.join(',');
}

function fromQuotedCsv(v: string[]): QueryParam {
  return v.length === 0 ? undefined : v.map(val => quoteVal(val)).join(',');
}

function fromBoolean(v: boolean): QueryParam {
  return v === true ? 'true' : undefined;
}

export const stringCodec: Codec<string> = {
  decode: p => toString(p, ''),
  encode: fromString,
};

export const maybeStringCodec: Codec<string | undefined> = {
  decode: toMaybeString,
  encode: fromString,
};

export const numberCodec: Codec<number> = {
  decode: p => toNumber(p, 1),
  encode: fromNumber,
};

export const maybeNumberCodec: Codec<number | undefined> = {
  decode: toMaybeNumber,
  encode: fromMaybeNumber,
};

export const csvCodec: Codec<string[]> = {
  decode: toCsv,
  encode: fromCsv,
};

export const quotedCsvCodec: Codec<string[]> = {
  decode: toCsvFromQuotedCsv,
  encode: fromQuotedCsv,
};

export const booleanCodec: Codec<boolean> = {
  decode: toBoolean,
  encode: fromBoolean,
};

export function decodeQuery<R>(query: ParsedUrlQuery, codecMap: CodecMap): R {
  const map = new Map();
  for (const prop in codecMap) {
    map.set(prop, codecMap[prop].decode(query[prop]));
  }

  return Object.fromEntries(map);
}

export function encodeQuery<T>(props: T, codecMap: CodecMap): ParsedUrlQuery {
  const map = new Map();
  for (const prop in codecMap) {
    const value = codecMap[prop].encode(props[prop]);

    if (isNotUndefined(value)) {
      map.set(prop, value);
    }
  }

  return Object.fromEntries(map);
}

export function propsToQuery(
  props: Record<string, string | string[] | number | undefined>
): Record<string, string> {
  return Object.keys(props).reduce((acc, key) => {
    const val = props[key];

    // We use this function as next represents arrays in JS
    // as arrays in the URLs, unsurprisingly, and the csv
    // is our own bespoke syntax.

    // worksType = ['a', 'b', 'c']
    // URL spec: workType=a&workType=b&workType=c
    // weco: workType=a,b,c
    if (Array.isArray(val)) {
      if (val.length === 0) {
        return {
          ...acc,
        };
      } else {
        return {
          ...acc,
          [key]: val.join(','),
        };
      }
    }

    // any empty values, we don't add
    if (val === null || val === undefined || val === '') {
      return { ...acc };
    }

    // As all our services default `page: undefined` to `page: 1` we remove it
    const pageKeys = ['page', 'canvas', 'manifest'];

    if (pageKeys.includes(key) && (val === '1' || val === 1)) {
      return { ...acc };
    }

    return {
      ...acc,
      [key]: val.toString(),
    };
  }, {});
}

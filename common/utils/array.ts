export function isNotUndefined<T>(val: T | undefined): val is T {
  return typeof val !== 'undefined';
}

export function isUndefined<T>(val: T | undefined): val is undefined {
  return typeof val === 'undefined';
}

export function isString(v: any): v is string {
  return typeof v === 'string';
}

export function isJson(v: string): boolean {
  try {
    JSON.parse(v);
    return true;
  } catch (e) {
    return false;
  }
}

export function stringFromStringOrStringArray(
  input: string | string[]
): string {
  if (Array.isArray(input)) {
    return input.join('');
  }
  return input;
}

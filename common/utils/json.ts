type Keyable = { [key: string]: any };

// removes keys with value undefined | null associated with them
export function removeEmptyProps(obj: Record<string, unknown>): Keyable {
  return JSON.parse(
    JSON.stringify(obj, function (_, value) {
      return value === null || value === undefined || value === ''
        ? undefined
        : value;
    })
  );
}

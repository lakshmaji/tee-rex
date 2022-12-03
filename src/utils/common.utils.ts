export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export const sanitize = (value: string): string => value.toLowerCase().replace(/\s\s+/g, ' ');

type Base = any;
export function deepEqual(obj1: Base, obj2: Base): boolean {
  if (obj1 === obj2)
    // it's just the same object. No need to compare.
    return true;

  if (isPrimitive(obj1) && isPrimitive(obj2))
    // compare primitives
    return obj1 === obj2;

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  // compare objects with same number of keys
  for (const key in obj1) {
    if (!(key in obj2)) return false; //other object doesn't have this prop
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

function isPrimitive(obj: Base) {
  return obj !== Object(obj);
}

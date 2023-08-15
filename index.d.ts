declare global {
  interface Array<T> {
    maxLength(number: number): boolean;
    minLength(number: number): boolean;
    sameValues(array: any[]): boolean;
  }

  interface Number {
    greater(number: number): boolean;
    less(number: number): boolean;
    range(range: number[]): boolean;
  }

  interface String {
    minLength(length: number): boolean;
    maxLength(length: number): boolean;
    regex(pattern: RegExp): boolean;
    values(values: string[]): boolean;
  }
}

declare class Schema {
  constructor(schema: any);
  validate(objForValidate: object): boolean;
}

export { Schema };

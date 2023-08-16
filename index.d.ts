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

type CommonSchemaType = {
  require?: boolean,
  validator?: (value: any) => boolean
}

type NumberSchemaType = {
  min?: number,
  max?: number,
  range?: [number, number]
}

type StringSchemaType = {
  minLength?: number,
  maxLength?: number,
  regex?: RegExp,
  values?: string[]
}

type ArraySchemaType = {
  minLength?: number,
  maxLength?: number,
  empty?: boolean
}

type SchemaType = {
  [key:string]: ({ type: "number" } & NumberSchemaType & CommonSchemaType) | ({ type: "string" } & StringSchemaType & CommonSchemaType) | ({ type: "array" } & ArraySchemaType & CommonSchemaType) | ({ type: "object" } & { schema: SchemaType })
}

declare class Schema {
  constructor(schema: SchemaType);
  validate(objForValidate: object): boolean;
}

export { Schema };

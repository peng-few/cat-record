export const noop = () => { }

export const notExist = (value: any): value is undefined => typeof value === 'undefined'
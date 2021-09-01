/**
 * Types that can be used as keys in a Record
 */
export type Key = number | symbol | string // keyof any

/**
 * T or null
 */
export type nOpt <T> = T | null

/**
 * T or undefined, equivalent to T?
 */
export type uOpt <T> = T | undefined

/**
 * T or null or undefined
 */
export type nuOpt <T> = nOpt<T> | uOpt<T>

/**
 * Retrieve the type of an array
 */
export type Unpack<T> = T extends (infer U)[] ? U : T

/**
 * Nested array type - array of array of array of ...
 */
export type NestedArray <T> = (T | NestedArray<T>)[]

export type Key = number | symbol | string // keyof any

export type nOpt <T> = T | null

export type uOpt <T> = T | undefined

export type nuOpt <T> = nOpt<T> | uOpt<T>

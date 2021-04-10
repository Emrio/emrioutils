export type Key = number | symbol | string

export type KVPairs <K extends Key, V> = { [k in K]: V }

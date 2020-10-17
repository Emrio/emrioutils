export const base2 = '01'
export const base8 = '01234567'
export const base10 = '0123456789'
export const base16 = base10 + 'abcdef'
export const base26 = 'abcdefghijklmnopqrstuvwxyz'
export const base52 = base26 + base26.toUpperCase()
export const base60 = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ' + base10
export const base62 = base26 + base26.toUpperCase() + base10
export const base64 = base62 + '+='

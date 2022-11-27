export const getDigit = (n: number, base: number, isDecimal = false) => n.toString(base).split('.')[Number(isDecimal)]?.length ?? 0

export const parseFloat = (string: string, radix: number | undefined = 10) => {
  string = `${string || '0'}.`

  const [ integer, decimal ] = string.split('.')
  const int = parseInt(integer || '0', radix)
  const float = parseInt(decimal || '0', radix) / Math.pow(radix, decimal.length)

  return int + float
}

export const complementBase = (n: number, base: number, digit: number | undefined = undefined) => Math.pow(base, digit ? digit - getDigit(n, base, true) : getDigit(n, base)) - n
export const complementBaseM1 = (n: number, base: number, digit: number | undefined = undefined) => complementBase(n, base, digit) - Math.pow(base, -getDigit(n, base, true))
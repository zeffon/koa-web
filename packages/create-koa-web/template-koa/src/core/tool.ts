export const isNumber = (value: unknown): boolean => {
  return typeof value === 'number' && isFinite(value)
}

export const isArray = (value: unknown): boolean => {
  return Array.isArray(value)
}

export const isPlainObject = (value: unknown): boolean => {
  if (typeof value !== 'object' || value == null) {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto == null
}

export const format = (date: Date, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  const year = date.getFullYear().toString()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

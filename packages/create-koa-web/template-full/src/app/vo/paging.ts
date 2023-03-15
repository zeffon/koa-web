export interface Paging<T> {
  total: number
  page: number
  count: number
  items: T[]
}

export const pagingSchema = {
  start: { type: 'number', required: false, default: 1 },
  limit: { type: 'number', required: false, default: 20 },
}

export class Paging<T> {
  page = 1
  total = 0
  pageTotal = 0
  items: T[] = []
  constructor(items: T[], total: number, start: number, limit: number) {
    this.total = total
    this.page = start
    this.items = items
    this.pageTotal = Math.ceil(total / limit)
  }
}

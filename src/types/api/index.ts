export interface Result<T = any> {
  code: number
  data: T
  message: string
}

export interface PageData<T = any> {
  list: T[]
  total: number
}

export interface Page {
  current: number
  pageSize: number
}

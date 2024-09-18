export interface BusinessProcessItem {
  title: string
  data: string[]
}

export interface BusinessProcess {
  id: string
  title: string
  consultCount: number
  data: BusinessProcessItem[]
}

export interface DevelopmentData {
  id: string
  title: string
  image: string
  desc: string
  tags: string[]
}

export interface DevelopmentPath {
  id: string
  title: string
  date: string
  data: DevelopmentData[]
}

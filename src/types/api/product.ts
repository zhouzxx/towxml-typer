export interface ProductAttribute {
  name: string
  value: string
}

export interface Product {
  id: string
  title: string
  desc: string
  images: string[]
  price: number
  sale: number
  content: string
  attributes: ProductAttribute[]
  tags: string[]
}

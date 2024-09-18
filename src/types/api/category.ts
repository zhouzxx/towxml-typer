import type { Color } from '../color'

export interface Category {
  id: string
  name: string
  icon: string
  iconColor?: Color
  backgroundColor?: Color
  url?: string
}

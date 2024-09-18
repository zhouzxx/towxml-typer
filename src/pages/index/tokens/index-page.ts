import type { InjectionKey } from 'vue'
import type {
  IndexPageOnLoadFunc,
  IndexPageOnScrollFunc,
  IndexPageOnShowFunc,
} from '../types'

export type IndexSubPageContext = {
  uid: number
  index: number
  onLoad?: IndexPageOnLoadFunc
  onShow?: IndexPageOnShowFunc
  onScroll?: IndexPageOnScrollFunc
}

export type IndexPageContext = {
  items: IndexSubPageContext[]
  addItem: (item: IndexSubPageContext) => void
  removeItem: (uid: number) => void
}

export const indexPageContextKey: InjectionKey<IndexPageContext> = Symbol(
  'indexPageContextKey'
)

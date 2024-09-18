export type IndexPageOnLoadFunc = () => void
export type IndexPageOnShowFunc = () => void

export type IndexPageScrollParams = {
  top: number
  left: number
}
export type IndexPageOnScrollFunc = (params: IndexPageScrollParams) => void

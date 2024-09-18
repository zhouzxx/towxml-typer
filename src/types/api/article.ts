export interface Article {
  id: string
  title: string
  desc: string
  content: string
  mainImage: string
  tags: string[]
  hotCount: number
  replyCount: number
  likeCount: number
  viewCount: number
  shareCount: number
  viewUsersAvatar: string[]
  recommend: boolean
}

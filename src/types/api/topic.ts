export interface TopicAuthor {
  id: string
  nickname: string
  avatar: string
}

export interface TopicViewUser {
  id: string
  nickname: string
  avatar: string
}

export interface Topic {
  id: string
  title: string
  author: TopicAuthor
  createTime: string
  tags: string[]
  desc: string
  images: string[]
  hotCount: number
  replyCount: number
  likeCount: number
  viewCount: number
  viewUsersAvatar: string[]
}

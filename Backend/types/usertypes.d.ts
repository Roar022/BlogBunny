interface UserTypeTs{
    id:string
    username: string
    email: string
    location?: string | null
    password?: string
    blogs?: BlogType[]
}
interface BlogType {
    id: string
    title: string
    label: string
    description: string
    likes: number
    views: number
    userId: string
    updatedAt?: Date
    createdAt?: Date
    user?: UserType
    comments?: CommentType[]
}
interface CommentType{
    id:string
    description: string
    userId: string
    blogId: string
    user?: UserType
    blog?: BlogType
    updatedAt?: Date
    createdAt?: Date
}
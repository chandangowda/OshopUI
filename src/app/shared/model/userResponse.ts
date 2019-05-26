import { User } from './user';

export class UserResponse{
    status: boolean
    statusCode: number
    statusMessage: string
    userList:User[]
}
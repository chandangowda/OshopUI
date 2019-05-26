import { Category } from './category';

export class CategoryResponse{
    status: boolean
    statusCode: number
    statusMessage: string
    categoryres:Category[]
}
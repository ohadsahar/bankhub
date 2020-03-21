import {IsDefined} from "class-validator";

export class CategoryDto {

    @IsDefined()
    categoryName: string;
}
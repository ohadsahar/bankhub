import {Service} from "typedi";
import {CategoryDto} from "../dto/category.dto";
import {Category} from "../../entities/category.entity";

@Service()
export class CategoryService {

    async create(categoryData: CategoryDto, user: any): Promise<Category> {
        const categoryEntity = new Category();
        categoryEntity.categoryName = categoryData.categoryName;
        categoryEntity.user = user;
        return Category.save(categoryEntity);
    }

    async update(categoryData, categoryId: number): Promise<Category> {
        const categoryExists = await Category.findOne(categoryId);
        if (!categoryExists) {
            return;
        }
        return Category.save({...categoryExists, ...categoryData});
    }

    async deleteCategory(categoryId: number): Promise<any> {
        return Category.delete(categoryId);
    }

    async get(user: any): Promise<Category[]> {
        return Category.find({
            where: [
                {userId: user.id},
            ]
        });
    }

}
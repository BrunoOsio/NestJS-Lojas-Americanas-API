import { Category } from "src/category/entities/category.entity";
import { isDeepStrictEqual } from "util";

const checkIfNewCategoryIsDuplicatedOnProduct = (productCategories: Category[], newCategory: Category): boolean => {
  const checkIfNewCategoryIsDuplicated = (categoryOnProduct) => 
  isDeepStrictEqual(categoryOnProduct, newCategory);

  const isCategoryDuplicatedOnProduct = productCategories.some(
    checkIfNewCategoryIsDuplicated,
  );

  return isCategoryDuplicatedOnProduct
}

export default checkIfNewCategoryIsDuplicatedOnProduct;
export type Category = {
    id: number;
    name: string;
    src: string;
};

export type InitialCategoryState = {
    categoryList: Category[];
    categoryGroups: CategoryGroup[];
    popularCategories: Category[];
    renderList: Category[];
    categoryId: undefined | number;
    categoryName: string;
};

export type CategoryGroup = {
    groupId: number;
    groupName: string;
    categoriesList: Category[];
};
"use client";

import "./categories.scss";
import { List } from "@shared/ui";
import { CategoriesItem } from "@entities/category";
import { Category } from "@entities/category";
import { useEffect } from "react";
import { getAllCategories, useCategoriesStore } from "@/entities/category";

export default function CategoriesList() {
    const { renderList, getTenPopularCategories } = useCategoriesStore((state) => state);

    useEffect(() => {
        getAllCategories();
        getTenPopularCategories();
    }, [getTenPopularCategories]);

    useEffect(() => {
        console.log(getAllCategories());
        console.log(renderList);
    }, [renderList]);

    return (
        <div className="page__categories categories">
            <h2 className="categories__title">Популярные категории</h2>
            <List
                items={renderList}
                renderItem={(category: Category) => <CategoriesItem category={category} />}
                className="categories"
            />
        </div>
    );
}

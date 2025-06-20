"use client";

import "./categories.scss";
import { List } from "@shared/ui/List";
import { CategoriesItem } from "@entities/categories";
import { Category } from "@entities/categories/model/types";
import { useEffect } from "react";
import { getAllCategories, useCategoriesStore } from "@/entities/categories/model/categories-store";

export default function Categories() {
    const { renderList, getTenPopularCategories } = useCategoriesStore((state) => state);  

    useEffect(() => {
        getAllCategories();
        getTenPopularCategories();
        //    console.log(categories)
    }, []);
    useEffect(() => {
        console.log(getAllCategories());
        console.log(renderList)
    }, [renderList]);

    return (
        <div className="page__categories categories">
            <h2 className="categories__title">Популярные категории</h2>

            <List items={renderList} renderItem={(category: Category) => <CategoriesItem category={category} />} className="categories" />
            {/* <List items={categories} renderItem={(category: Category) => <CategoriesItem category={category} />} className="categories" /> */}
        </div>
    );
}

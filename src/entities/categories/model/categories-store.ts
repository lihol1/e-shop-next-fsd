import { create, StateCreator } from "zustand";

import { data } from "@shared/lib";
import { InitialCategoryState } from "./types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/shared/lib/createSelectors";

interface IActions {
    getCategories: () => void;
    getTenPopularCategories: ()=> void;
}

const initialState: InitialCategoryState = {
    categoryList: [],
    categoryGroups: [],
    popularCategories: [],
    renderList: [],
    categoryId: undefined,
    categoryName: "",
};

interface CategoryState extends InitialCategoryState, IActions {}

const categoriesStore: StateCreator<CategoryState, [["zustand/immer", never], ["zustand/persist", unknown], ["zustand/devtools", never]]> = (set) => ({
    ...initialState,
    getCategories: () =>
        set(
            (state) => {
                state.categoryList = data.categories;
            },
            false,
            "getCategories"
        ),
    getTenPopularCategories: () =>
        set(
            (state) => {
                if (state.popularCategories.length === 0) {
                    state.renderList = state.categoryList.slice(0, 10);
                } else {
                    if (state.popularCategories.length > 0 && state.popularCategories.length < 10) {
                        const difference = 10 - state.popularCategories.length;
                        //избавляемся от  дублей
                        const idsArr = state.popularCategories.map((category) => category.id);
                        const uniqueIdsArr = [...new Set(idsArr)];

                        // дополняем до 10 штук
                        let i = 1;
                        const adds = state.renderList.filter((category) => {
                            if (category) {
                                if (i <= difference) {
                                    if (!uniqueIdsArr.includes(category.id)) {
                                        i++;
                                        return true;
                                    }
                                }
                            }
                        });
                        state.renderList = [...state.popularCategories, ...adds];
                    } else if (state.popularCategories.length >= 10) {
                        state.renderList = state.popularCategories.slice(0, 10);
                    }
                }
            },

            false,
            "getPopularCategories"
        ),
});

export const useCategoriesStore = createSelectors(
    create<CategoryState>()(
        devtools(
            persist(immer(categoriesStore), {
                name: "category-storage",
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({ categoryList: state.categoryList }),
            }),
            {
                store: "categoryStore",
            }
        )
    )
);

//селекторы:

export const allCategories = () => useCategoriesStore((state) => state.categoryList);
export const getAllCategories = useCategoriesStore.getState().getCategories;



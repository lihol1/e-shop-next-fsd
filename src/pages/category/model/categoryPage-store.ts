import { create, StateCreator } from "zustand";
import { InitialCategoryPageState } from "./types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IActions {    
    setCurrentPage: (page: number) => void;
}

const initialState: InitialCategoryPageState = {
    currentPage: 1
};

interface CategoryPageState extends InitialCategoryPageState, IActions {}

type CategoryCreator = StateCreator<
    CategoryPageState,
    [["zustand/immer", never], ["zustand/persist", unknown], ["zustand/devtools", unknown]],
    [],
    CategoryPageState
>;

const categoriesStore: CategoryCreator = (set) => ({
    ...initialState,
    setCurrentPage: (page)=>set((state)=> {
        state.currentPage = page
    }, false, "setCurrentPage")   
    
});

export const useCategoryPageStore = create<CategoryPageState>()(
    devtools(
        persist(
            immer(categoriesStore), {
            name: "categoryPage-storage",
            storage: createJSONStorage(() => localStorage),
            // partialize: (state) => ({ categoryList: state.categoryList }),
        }),
        {
            store: "categoryPageStore",
        }
    )
);

//селекторы:

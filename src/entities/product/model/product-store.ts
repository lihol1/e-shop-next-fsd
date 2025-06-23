import { create, StateCreator } from "zustand";
import { InitialProductState, Product, RequestParams } from "./types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { data } from "@shared/lib";
import { filter } from "../lib/utils";

const products: Product[] = data.products;

interface IActions {
    getProducts: () => void;
    filterByCategory: (payload: string) => void;
    filterByParams: (payload: RequestParams) => void;
    setRequestParams: (payload: RequestParams) => void;
}

const initialState: InitialProductState = {
    productList: [],
    filteredByCategory: [],
    filteredByParams: null,
    foundProducts: [],
    searchList: [],
    requestParams: { min: 0, max: 0, features: {} },
    maxPrice: 0,
};

interface ProductState extends InitialProductState, IActions {}

type CategoryCreator = StateCreator<
    ProductState,
    [["zustand/immer", never], ["zustand/persist", unknown], ["zustand/devtools", unknown]],
    [],
    ProductState
>;

const productStore: CategoryCreator = (set) => ({
    ...initialState,

    getProducts: () =>
        set(
            (state) => {
                state.productList = products;
            },
            false,
            "getProducts"
        ),
    filterByCategory: (payload) =>
        set(
            (state) => {
                state.filteredByCategory = state.productList.filter(({ categoryId }) => categoryId === Number(payload));
                state.maxPrice = Math.max(...state.filteredByCategory.map((prod) => prod.price));
            },
            false,
            "filterByCategory"
        ),

    filterByParams: (payload) =>
        set(
            (state) => {
                state.filteredByParams = filter(state.filteredByCategory, payload);
            },
            false,
            "filterByParams"
        ),

    setRequestParams: (payload) =>
        set(
            (state) => {
                state.requestParams = { min: payload.min, max: payload.max, features: payload.features };
            },
            false,
            "setRequestParams"
        ),
});

export const useProductStore = create<ProductState>()(
    devtools(
        persist(immer(productStore), {
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

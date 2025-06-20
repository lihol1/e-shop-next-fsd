import { create, StateCreator } from "zustand";

import { data } from "@shared/lib";
import { InitialCartState } from "./types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/shared/lib/createSelectors";
import { Product } from "@/entities/product/model/types";

interface IActions {
    addItemToCart: (item: Product) => void;
    // getTenPopularCategories: ()=> void;
}

const initialState: InitialCartState = {
    orderedProducts: [],
    cartIsOpen: false,
    total: 0,
    noticeIsOpen: false,
};

interface CartState extends InitialCartState, IActions {}

const cartStore: StateCreator<CartState, [["zustand/immer", never], ["zustand/persist", unknown], ["zustand/devtools", never]]> = (set) => ({
    ...initialState,
    // addItemToCart: (state, { payload }: PayloadAction<Product>) => {
    //         let newCart = [...state.orderedProducts];
    //         const found = state.orderedProducts.find((prod) => prod.id === payload.id);
    //         if (found) {
    //             newCart = newCart.map((prod) => {
    //                 return prod.id === payload.id ? { ...prod, quantity: payload.quantity || (prod.quantity ?? 0) + 1 } : prod;
    //             });
    //         } else {
    //             newCart.push({ ...payload, quantity: 1 });
    //         }
    //         state.orderedProducts = newCart;
    //     },
    //     removeItemFromCart: (state, { payload }: PayloadAction<number>) => {
    //         state.orderedProducts = state.orderedProducts.filter(({ id }) => id !== payload);
    //     },
    //     clearCart: (state) => {
    //         state.orderedProducts = [];
    //     },
    //     changeCartStatus: (state, { payload }: PayloadAction<boolean>) => {
    //         state.cartIsOpen = payload;
    //     },
    //     getTotal: (state) => {
    //         if (state.orderedProducts.length > 0) {
    //             state.orderedProducts.reduce((sum, prod) => {
    //                 return (state.total = sum + prod.price * (prod.quantity ?? 1));
    //             }, 0);
    //         } else {
    //             state.total = 0;
    //         }
    //     },
    //     setNoticeIsOpen: (state, { payload }: PayloadAction<boolean>) => {
    //         state.noticeIsOpen = payload;
    //     },
    // },
});

export const useCategoriesStore = createSelectors(
    create<CartState>()(
        devtools(
            persist(immer(cartStore), {
                name: "cart-storage",
                storage: createJSONStorage(() => localStorage),
                // partialize: (state) => ({ categoryList: state.categoryList }),
            }),
            {
                store: "cartStore",
            }
        )
    )
);

//селекторы:

export const allCategories = () => useCategoriesStore((state) => state.categoryList);
export const getAllCategories = useCategoriesStore.getState().getCategories;

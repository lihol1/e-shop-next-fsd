import { create, StateCreator } from "zustand";
import { InitialCartState } from "./types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Product } from "@/entities/product/model/types";

interface IActions {
  addItemToCart: (item: Product) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
  changeCartStatus: (status: boolean) => void;
  getTotal: () => void;
}

const initialState: InitialCartState = {
  orderedProducts: [],
  cartIsOpen: false,
  total: 0,
  noticeIsOpen: false,
};

interface CartState extends InitialCartState, IActions {}

type CartStoreCreator = StateCreator<
  CartState,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", unknown]
  ],
  [],
  CartState
>;

const cartStore: CartStoreCreator = (set) => ({
  ...initialState,
  addItemToCart: (item) =>
    set((state) => {
      let newCart = [...state.orderedProducts];
      const found = state.orderedProducts.find((prod) => prod.id === item.id);
      if (found) {
        newCart = newCart.map((prod) => {
          return prod.id === item.id
            ? { ...prod, quantity: item.quantity || (prod.quantity ?? 0) + 1 }
            : prod;
        });
      } else {
        newCart.push({ ...item, quantity: 1 });
      }
      state.orderedProducts = newCart;
    }, false, "addItemToCart"),
  removeItemFromCart: (id) =>
    set((state) => {
      state.orderedProducts = state.orderedProducts.filter(
        (item) => item.id !== id
      );
    }, false, "removeItemFromCart"),
  clearCart: () =>
    set((state) => {
      state.orderedProducts = [];
    }, false, "clearCart"),
  changeCartStatus: (status) =>
    set((state) => {
      state.cartIsOpen = status;
    }, false, "changeCartStatus"),
  getTotal: () =>
    set((state) => {
      if (state.orderedProducts.length > 0) {
        state.orderedProducts.reduce((sum, prod) => {
          return (state.total = sum + prod.price * (prod.quantity ?? 1));
        }, 0);
      } else {
        state.total = 0;
      }
    }, false, "getTotal"),

 
  //     setNoticeIsOpen: (state, { payload }: PayloadAction<boolean>) => {
  //         state.noticeIsOpen = payload;
  //     },
  // },
});

export const useCartStore = create<CartState>()(
  devtools(
    persist(immer(cartStore), {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ orderedProducts: state.orderedProducts, total:state.total }),
    }),
    {
      store: "cartStore",
    }
  )
);

//селекторы:

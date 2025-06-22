import type { Product } from "@entities/product/@x/cart";

export type InitialCartState = {
    orderedProducts: Product[];
    cartIsOpen: boolean;
    total: number;
    noticeIsOpen: boolean;
};

import type {Product} from "@entities/product/model/types"

export type InitialCartState = {
    orderedProducts: Product[];
    cartIsOpen: boolean;
    total: number;
    noticeIsOpen: boolean;
};
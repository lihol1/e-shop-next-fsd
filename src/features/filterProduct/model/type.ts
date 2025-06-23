import type { Feat } from "@entities/product";

export type FilterFeature = {
    [string: string]: boolean;
};

// export type Feat = {
//     [key: string]: string[];
// };

export type InitialFilterState = {
    priceValues: number[];
    rangeValues: number[];
    featureValues: Feat | undefined;
    filterFeatures: FilterFeature;
    searchFilter: FilterFeature;
    searchValue: string;
    emptyFilter: boolean;
};

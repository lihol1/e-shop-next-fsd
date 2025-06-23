import { create, StateCreator } from "zustand";
import { Feat, FilterFeature, InitialFilterState } from "./type";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IActions {
    setPriceValues: (payload: number[]) => void;
    setRangeValues: (payload: number[]) => void;
    setFeatureValues: (payload: Feat | undefined) => void;
    setFilterFeatures: (payload: FilterFeature) => void;
    setSearchFilter: (payload: FilterFeature) => void;
    setSearchValue: (payload: string) => void;
    setEmptyFilter: (payload: boolean) => void;
}

const initialState: InitialFilterState = {
    priceValues: [0, 0],
    rangeValues: [0, 0],
    featureValues: undefined,
    filterFeatures: {},
    searchFilter: { price: true },
    searchValue: "",
    emptyFilter: false,
};

interface FilterState extends InitialFilterState, IActions {}

type CategoryCreator = StateCreator<
    FilterState,
    [["zustand/immer", never], ["zustand/persist", unknown], ["zustand/devtools", unknown]],
    [],
    FilterState
>;

const categoriesStore: CategoryCreator = (set) => ({
    ...initialState,
    setPriceValues: (payload) =>
        set(
            (state) => {
                state.priceValues = payload;
            },
            false,
            "setPriceValues"
        ),
    setRangeValues: (payload) =>
        set(
            (state) => {
                state.rangeValues = payload;
            },
            false,
            "setRangeValues"
        ),
    setFeatureValues: (payload) =>
        set(
            (state) => {
                state.featureValues = payload;
            },
            false,
            "setFeatureValues"
        ),
    setFilterFeatures: (payload) =>
        set(
            (state) => {
                state.filterFeatures = payload;
            },
            false,
            "setFilterFeatures"
        ),
    setSearchFilter: (payload) =>
        set(
            (state) => {
                state.searchFilter = payload;
            },
            false,
            "setSearchFilter"
        ),
    setSearchValue: (payload) =>
        set(
            (state) => {
                state.searchValue = payload;
            },
            false,
            "setSearchValue"
        ),
    setEmptyFilter: (payload) =>
        set(
            (state) => {
                state.emptyFilter = payload;
            },
            false,
            "setEmptyFilter"
        ),
});

export const useFilterStore = create<FilterState>()(
    devtools(
        persist(immer(categoriesStore), {
            name: "filter-storage",
            storage: createJSONStorage(() => localStorage),
            // partialize: (state) => ({ categoryList: state.categoryList }),
        }),
        {
            store: "filterStore",
        }
    )
);

//селекторы:

// export const useAllCategories = () => useCategoriesStore((state) => state.categoryList);
export const getAllCategories = useCategoriesStore.getState().getCategories;

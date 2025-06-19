import { create, StateCreator } from "zustand";

interface IActions {

}

interface IInitialState {

}

interface ICounterState extends IInitialState, IActions {}

const initialState: IInitialState = {

}

const categoriesStore: StateCreator<ICounterState> = (set) => ({
    ...initialState,
    // increment: ()=> set((state)=> ({count: state.count + 1})),
    // decrement: ()=> set((state)=> ({count: state.count + 1})),
})

const useCategoriesStore = create<ICounterState>()(categoriesStore)

//селекторы:
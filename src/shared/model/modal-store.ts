import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IModalActions {
  setModalIsOpen: (status: boolean) => void;
}
interface InitialModalState {
  modalIsOpen: boolean;
}
interface ModalStore extends InitialModalState, IModalActions {}

const initialState: InitialModalState = {
  modalIsOpen: false,
};

type ModalStoreCreator = StateCreator<
  ModalStore,
  [["zustand/immer", never], ["zustand/devtools", unknown]],
  [],
  ModalStore
>;

const modalStore: ModalStoreCreator = (set) => ({
  ...initialState,
  setModalIsOpen: (status: boolean) =>
    set((state) => {
      state.modalIsOpen = status;
    }, false, "setModalIsOpen"),
});

export const useModalStore = create<ModalStore>()(
  devtools(immer(modalStore), { name: "ModalStore" })
);

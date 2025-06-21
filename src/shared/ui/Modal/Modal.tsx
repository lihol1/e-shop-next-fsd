'use client'
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import "./modal.scss";
import CloseButton from "react-bootstrap/CloseButton";
import { useCartStore } from "@/entities/cart/model";
// import { setNoticeIsOpen } from "../store/cartSlice";
// import { useDispatch } from "react-redux";
// import { setModalIsOpen, setFormIsOpen, setRegFormIsOpen } from "../store/generalSlice";

export default function Modal({ children }: PropsWithChildren) {
    const refModal = useRef(null);
    const {changeCartStatus} = useCartStore(state=> state)
    // const dispatch = useDispatch();

    useEffect(() => {
        function checkIfClickedOutside(e: MouseEvent) {
            if (refModal.current && refModal.current === e.target) {
                // dispatch(setModalIsOpen(false));
            }
        }
        document.addEventListener("click", checkIfClickedOutside);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, []);

    const clickHandler = useCallback(() => {
        changeCartStatus(false)
        // dispatch(changeCartStatus(false));
        // dispatch(setModalIsOpen(false));
        // dispatch(setNoticeIsOpen(false));
        // dispatch(setFormIsOpen(false));
        // dispatch(setRegFormIsOpen(false));
    // }, [dispatch, changeCartStatus, setModalIsOpen, setNoticeIsOpen, setFormIsOpen, setRegFormIsOpen]);
    }, [changeCartStatus, ]);

    return (
        <div ref={refModal} className="page__modal my-modal">
            <div className="my-modal__window">
                <div className="my-modal__close">
                    <CloseButton onClick={clickHandler} />
                </div>
                {children}
            </div>
        </div>
    );
}
"use client";
import "./cart.scss";
import { List } from "@shared/ui";
// import { Product } from "../../common/types";
import { CartItem } from "@entities/cart";
// import { setFormIsOpen } from "../../store/generalSlice";
import { useCartStore } from "@/entities/cart";
import { useModalStore } from "@/shared/model";
import { useEffect } from "react";

export default function Cart() {
    // const { orderedProducts, cartIsOpen } = useAppSelector((state) => state.cart);
    const { cartIsOpen, orderedProducts, clearCart, changeCartStatus } = useCartStore((state) => state);
    // const dispatch = useAppDispatch();
    const { modalIsOpen } = useModalStore((state) => state);

    useEffect(() => {
        if (!modalIsOpen) {
            changeCartStatus(false);
        }
    }, [modalIsOpen, changeCartStatus]);

    function clear() {
        clearCart();
    }

    function openOrder() {
        changeCartStatus(false);
        // dispatch(setFormIsOpen(true));
    }

    return (
        cartIsOpen && (
            <div className="my-modal__wrapper">
                {orderedProducts.length > 0 ? (
                    <>
                        <h2 className="my-modal__title">Корзина</h2>
                        <List
                            items={orderedProducts}
                            renderItem={(prod: Product) => <CartItem prod={prod} />}
                            className="my-modal"
                        />

                        <div className="my-modal__btns">
                            <button className="my-modal__button my-modal__button--white" onClick={clear}>
                                Очистить корзину
                            </button>
                            <button className="my-modal__button my-modal__button--blue" onClick={openOrder}>
                                Оформить заказ
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Корзина пуста</p>
                )}
            </div>
        )
    );
}

"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Product } from "@/entities/product/model";
import { faRubleSign, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { formatter } from "@shared/lib";
import { memo } from "react";
import { useCartStore } from "@entities/cart";

type CartItemProps = {
    prod: Product;
};

function CartItemComponent ({ prod }: CartItemProps) {
    const {addItemToCart, removeItemFromCart} = useCartStore(state=>state)

    function changeQuantity(item: Product, quantity: number) {
        addItemToCart({ ...item, quantity });
    }

    function removeItem(id: number) {
       removeItemFromCart(id);
    }

    function divideStr(num: number) {
        return formatter.format(num);
    }
    return (
        <>
            <div className="my-modal__image">
                <img src={prod.src} alt={prod.name} />
            </div>
            <div className="my-modal__description">{prod.name[0].toUpperCase() + prod.name.slice(1)}</div>

            <div className="my-modal__quantity">
                <div
                    className="my-modal__btn my-modal__btn--minus"
                    onClick={() => changeQuantity(prod, Math.max(1, (prod.quantity ?? 0) - 1))}
                >
                    -
                </div>
                <span>{prod.quantity}</span>
                <div
                    className="my-modal__btn my-modal__btn--plus"
                    onClick={() => changeQuantity(prod, Math.max(1, (prod.quantity ?? 0) + 1))}
                >
                    +
                </div>
            </div>

            <div className="my-modal__price">
                {divideStr(prod.price * (prod.quantity ?? 1))}{" "}
                <FontAwesomeIcon icon={faRubleSign} className="my-modal__currency" />
            </div>

            <div className="my-modal__btn-block">
                <button type="button" onClick={() => removeItem(prod.id)}>
                    <FontAwesomeIcon icon={faTrashCan} className="my-modal__trash" />
                </button>
            </div>
        </>
    );
};

const CartItem = memo(CartItemComponent);
export default CartItem;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Product } from "@entities/product";
import { faCartShopping, faRubleSign } from "@fortawesome/free-solid-svg-icons";
// import { addItemToCart } from "../../store/cartSlice";
// import { setIsShown } from "../../store/generalSlice";
// import { useAppDispatch } from "../../hooks/hooks";
// import { List } from "@shared/ui";
import FeatureItem from "../../../entities/product/ui/FeatureItem";
import { AddToCart } from "@/features/cart";
import { useCartStore } from "@/entities/cart";
import { Dispatch, SetStateAction } from "react";

type CategoryPageItemProps = {
    product: Product;
    setIsShown: Dispatch<SetStateAction<boolean>>
};

export default function ProductItem({ product, setIsShown }: CategoryPageItemProps) {
    // const dispatch = useAppDispatch();
    const { addItemToCart } = useCartStore((state) => state);

    function addToCart(item: Product) {
        addItemToCart(item);
        showToast();
    }
    function showToast() {
        setIsShown(true);
        setTimeout(() => {
            setIsShown(false);
        }, 1500);
    }

    return (
        <>
            <div className="category__item-holder">
                <div className="category__image">
                    <img src={product.src} alt={product.name} />
                </div>
                <div className="category__description">
                    <h3 className="category__name">{product.name[0].toUpperCase() + product.name.slice(1)}</h3>
                    <div className="category__features features-category">
                        {Object.entries(product.features).map((arr, ind) => (
                            <FeatureItem key={ind} arr={arr} ind={ind} />
                        ))}
                    </div>
                </div>
                <div className="category__button-block">
                    <div className="category__price">
                        {product.price.toLocaleString()}{" "}
                        <FontAwesomeIcon icon={faRubleSign} className="category__currency" />
                    </div>
                    <button type="button" className="category__btn" onClick={() => addToCart(product)}>
                        <FontAwesomeIcon icon={faCartShopping} className="category__cart" />В корзину
                    </button>
                    {/* <AddToCart product={product} /> */}
                </div>
            </div>
        </>
    );
}

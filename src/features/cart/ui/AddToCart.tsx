import { useCartStore } from "@/entities/cart";
import { Product } from "@/entities/product";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AddToCartProps = {
    product: Product;
};
export default function AddToCart({ product }: AddToCartProps) {
    const { addItemToCart } = useCartStore((state) => state);

    function addToCart(item: Product) {
        addItemToCart(item);
        showToast();
    }

    function showToast() {
        // setIsShown(true);
        setTimeout(() => {
            // setIsShown(false);
        }, 1500);
    }

    return (
        <button type="button" className="category__btn" onClick={() => addToCart(product)}>
            <FontAwesomeIcon icon={faCartShopping} className="category__cart" />В корзину
        </button>
    );
}

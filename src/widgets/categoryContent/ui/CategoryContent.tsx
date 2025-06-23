import "../../styles/category.scss";
import { Product } from "@entities/product";
import { Toast } from "@widgets/toast";
import { Pagination } from "@widgets/pagination";
import { List } from "@shared/ui";
import { ProductItem } from "@/widgets/productCard";
import { useCategoriesStore } from "@/entities/category";
import { ITEMS_PER_PAGE } from "@/entities/category";
import { useCategoryPageStore } from "@/pages/category/model/categoryPage-store";
import { useState } from "react";

type CategoryContentProps = {
    list: Product[] | null; 
};

export default function CategoryContent({ list }: CategoryContentProps) {
    const { categoryName } = useCategoriesStore((state) => state);
    const { currentPage } = useCategoryPageStore((state) => state);
    const [isShown, setIsShown] = useState(false)

    const totalPages = list === null ? 1 : Math.ceil(list.length / ITEMS_PER_PAGE);

    function paginate(arr: Product[]) {
        if (arr.length <= ITEMS_PER_PAGE) {
            return arr;
        } else {
            const endIndex = currentPage * ITEMS_PER_PAGE;
            const startIndex = endIndex - ITEMS_PER_PAGE;
            return arr.slice(startIndex, endIndex);
        }
    }

    return (
        <div className="page__category category">
            <h3 className="category__title">
                {categoryName.length > 0 && categoryName[0].toUpperCase() + categoryName.slice(1)}{" "}
                {list && <span className="category__amount">{list?.length} товаров</span>}
            </h3>
            {list === null ? (
                <p>По вашему запросу ничего не найдено</p>
            ) : (
                <>
                    <List
                        items={paginate(list)}
                        renderItem={(product: Product) => <ProductItem product={product} setIsShown={setIsShown}/>}
                        className="category"
                    />

                    <Pagination totalPages={totalPages} />
                </>
            )}
            {isShown && <Toast />}
        </div>
    );
}

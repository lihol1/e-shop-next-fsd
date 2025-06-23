import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import "../../styles/category.scss";
import "../../styles/sidebar.scss";
import { Product, useProductStore } from "@entities/product";
import { Toast } from "@widgets/toast";
import { Sidebar } from "@widgets/sidebar";
import { Pagination } from "@widgets/pagination";
import { List } from "@shared/ui";
import { ProductItem } from "@entities/product";
import { useFilterStore } from "@/features/filterProduct";
import { ITEMS_PER_PAGE } from "../../../entities/category/lib/constants";
import { useCategoryPageStore } from "../model/categoryPage-store";
import { useCategoriesStore } from "@/entities/category";
import { CategoryContent } from "@/widgets/categoryContent";

export default function CategoryPage() {
    const { currentPage, setCurrentPage } = useCategoryPageStore((state) => state);
    const { getCategories, setCategoryId, setCategoryName, categoryList, categoryName } = useCategoriesStore(
        (state) => state
    );
    const {
        setPriceValues,
        setRangeValues,
        setFilterFeatures,
        setSearchFilter,
        priceValues,
        featureValues,
        filterFeatures,
        searchFilter,
    } = useFilterStore((state) => state);
    const {
        filterByCategory,
        filterByParams,
        getProducts,
        setRequestParams,
        filteredByCategory,
        filteredByParams,
        maxPrice,
        requestParams,
    } = useProductStore((state) => state);

    let params = useParams();

    const searchParams = useSearchParams();
    const [list, setList] = useState<Product[] | null>([]);

    const totalPages = list === null ? 1 : Math.ceil(list.length / ITEMS_PER_PAGE);

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    function setCategoryData() {
        const catId = params.categoryId ? +params.categoryId : -1;
        setCategoryId(catId);
        const category = categoryList.find((cat) => cat.id === catId);
        setCategoryName(category?.name ?? "");
    }

    useEffect(() => {
        const categoryId = params.categoryId ? +params.categoryId : -1;
        const page = searchParams.get("page");
        if (!page) {
            //заменяем запись в истории браузера
            window.history.replaceState({}, "", `/category/${categoryId}?page=1`);
        }
    }, []);

    useEffect(() => {
        const page = searchParams.get("page");
        if (page) {
            setCurrentPage(Number(page));
        } else {
            setCurrentPage(1);
        }
        setCategoryData();
    }, [searchParams, params.categoryId]);

    useEffect(() => {
        setCategoryData();
    }, [params.categoryId]);

    useEffect(() => {
        const filtered = (filteredByParams ?? []).length > 0 ? filteredByParams : null;
        setList(filtered === null ? filteredByCategory : filtered);
    }, [params.categoryId, currentPage, filteredByParams]);

    useEffect(() => {
        if (filteredByCategory.length > 0) {
            const filterObj = Object.fromEntries(
                Object.entries(filteredByCategory[0].features).map(([key]) => [key.toLowerCase(), true])
            );
            setFilterFeatures(filterObj);
        }
    }, [filteredByCategory]);

    useEffect(() => {
        if (filterFeatures) {
            setSearchFilter({ ...searchFilter, ...filterFeatures });
        }
    }, [filterFeatures]);

    useEffect(() => {
        if (filteredByCategory.length > 0 && requestParams.max > 0) {
            filterByParams(requestParams);
        }
    }, [requestParams, maxPrice]);

    useEffect(() => {
        setRequestParams({
            features: requestParams.features,
            min: priceValues[0],
            max: priceValues[1],
        });
    }, [priceValues]);

    useEffect(() => {
        setRequestParams({ min: requestParams.min, max: requestParams.max, features: { ...featureValues } });
    }, [featureValues]);

    useEffect(() => {
        setPriceValues([0, maxPrice]);
        setRangeValues([0, maxPrice]);
        setRequestParams({ features: requestParams.features, min: requestParams.min, max: maxPrice });
    }, [maxPrice]);

    useEffect(() => {
        setRangeValues(priceValues);
    }, [priceValues]);

    useEffect(() => {
        filterByCategory(params.categoryId ?? "");
    }, [params.categoryId]);

    // function paginate(arr: Product[]) {
    //     if (arr.length <= ITEMS_PER_PAGE) {
    //         return arr;
    //     } else {
    //         const endIndex = currentPage * ITEMS_PER_PAGE;
    //         const startIndex = endIndex - ITEMS_PER_PAGE;
    //         return arr.slice(startIndex, endIndex);
    //     }
    // }

    return (
        <div className="page__wrapper">
            <CategoryContent list={list}/>
            {/* <div className="page__category category">
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
                            renderItem={(product: Product) => <ProductItem product={product} />}
                            className="category"
                        />

                        <Pagination totalPages={totalPages} />
                    </>
                )}
                {isShown && <Toast />}
            </div> */}

            <Sidebar />
        </div>
    );
}

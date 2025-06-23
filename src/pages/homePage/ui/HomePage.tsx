// import { useEffect } from "react";
// import { getProducts } from "../../store/productSlice";
// import { getCategories } from "../../store/categorySlice";
// import Categories from "./Categories";
// import { useAppDispatch } from "../../hooks/hooks";
import { CategoriesList } from "@/widgets/categoriesList";

export default function HomePage() {
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(getProducts());
    //     dispatch(getCategories());
    // }, [dispatch]);

    return <CategoriesList />;
    // <>HomePage</>
}

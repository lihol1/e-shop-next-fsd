// import { useSearchParams } from "react-router";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { List } from "@shared/ui";
import PaginationButton from "./PaginationButton";
// import { setCurrentPage } from "../../store/generalSlice";
// import { useCategoryPageStore } from "@/pages/category/model/categoryPage-store";
import { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>
};

function Pagination({ totalPages, setCurrentPage }: PaginationProps) {
    // const {setCurrentPage} = useCategoryPageStore(state=> state)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);  
    // const [searchParams, setSearchParams] = useSearchParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const params = new URLSearchParams(searchParams??''.toString());
    

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // setSearchParams({ page: String(newPage) });
        params.set('page', String(newPage));
        router.push(`?${params.toString()}`); // обновляем URL
        // router.push(`${pathname}?${params.toString()}`);   //перезапрос страницы
    };

    return (
        <div className="category__pagination pagination">
            <List
                items={pages}
                renderItem={(page) => <PaginationButton page={page} handlePageChange={handlePageChange} currentPage={currentPage}/>}
                className="pagination"
            />
        </div>
    );
}
export default Pagination;

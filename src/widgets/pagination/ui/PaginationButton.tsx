// import { useCategoryPageStore } from "@/pages/category";

type PaginationButtonProps = {
    page: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
};

export default function PaginationButton({ page, handlePageChange, currentPage }: PaginationButtonProps) {
    // const { currentPage } = useAppSelector(state=>state.general)
    // const { currentPage } = useCategoryPageStore((state) => state);
    return (
        <button
            className={`pagination__button ${page === currentPage ? "active" : ""}`}
            key={page}
            disabled={page === currentPage}
            onClick={() => handlePageChange(page)}
        >
            {page}
        </button>
    );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category } from "../../model/types";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import  Link from "next/link";
import { memo } from "react";

type CategoriesItemProps = {
    category: Category;
};

export const CategoriesItem = memo(({ category }: CategoriesItemProps) => {
    return (
        <Link href={`category/${category.id}`} className="categories__link">
            <div className="categories__image">
                <img src={category.src} alt={category.name} />
            </div>
            <div className="categories__name-holder">
                <h3 className="categories__name">{category.name[0].toUpperCase() + category.name.slice(1)}</h3>
                <FontAwesomeIcon icon={faArrowRight} className="categories__arrow"/>
            </div>
        </Link>
    );
})
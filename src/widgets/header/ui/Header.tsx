'use client'
import "./header.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCartShopping, faHouse, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
// import { searchProducts } from "../store/productSlice";
// import { useAppDispatch, useAppSelector } from "../hooks/hooks";
// import Catalog from "./catalog/Catalog";
// import { changeCartStatus } from "../store/cartSlice";
// import { setCatalogIsOpen, setHeaderSearchValue, setModalIsOpen, setRegFormIsOpen } from "../store/generalSlice";
import { useCallback } from "react";
// import { removeUser } from "../store/userSlice";
import { useRouter } from 'next/navigation';
import { useCartStore } from "@/entities/cart";
import { useModalStore } from "@/shared/model";

export default function Header() {
    const { changeCartStatus } = useCartStore(state=> state)
    const { setModalIsOpen } = useModalStore(state=> state)
    // const { catalogIsOpen, headerSearchValue } = useAppSelector((state) => state.general);
    // const { currentUser } = useAppSelector((state) => state.user);
    const router = useRouter();
    // const dispatch = useAppDispatch();

    const searchHandler = useCallback(() => {
        // dispatch(searchProducts(headerSearchValue));
        router.push("/search");
    }, [        ]);

    const changeHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            // dispatch(setHeaderSearchValue(e.target.value));
        },
        []
    );

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        searchHandler();
    }
    function redirectHome() {
        router.push("/");
    }
    const clickHandler = useCallback(() => {
        // dispatch(setCatalogIsOpen(!catalogIsOpen));
    // }, [dispatch, setCatalogIsOpen, catalogIsOpen]);
    }, []);

    const cartClickHandler = useCallback(() => {
        setModalIsOpen(true);
        changeCartStatus(true);
    // }, [dispatch, setModalIsOpen, changeCartStatus]);
    }, []);

    function userClickHandler() {
        // dispatch(setModalIsOpen(true));
        // dispatch(setRegFormIsOpen(true));
    }

    function logOut() {
        // dispatch(removeUser());
    }

    return (
        <div className="page__header header">
            <div className="header__container">
                <Button className="btn-blue header__catalog-btn" variant="primary" onClick={clickHandler}>
                    Каталог
                </Button>
                {/* <Catalog /> */}
                <div className="header__home-wrapper">
                    <FontAwesomeIcon icon={faHouse} className="header__icon header__icon--home" onClick={redirectHome} />
                </div>
                <div className="header__search">
                    <form onSubmit={submit}>
                        <Form.Control type="search" placeholder="Поиск по товарам" className="pe-5" value={''} onChange={changeHandler}></Form.Control>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="header__icon header__icon--search" onClick={searchHandler} />
                    </form>
                </div>
                <div>
                    <div className="header__icon-group">
                        <FontAwesomeIcon icon={faCartShopping} className="header__icon" onClick={cartClickHandler} />
                        {/* {currentUser.email ? (
                            <>
                                <p className="header__email">{currentUser.email}</p>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={logOut} className="header__icon" />
                            </>
                        ) : (
                            <FontAwesomeIcon icon={faUser} className="header__icon" onClick={userClickHandler} />
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
// {headerSearchValue}
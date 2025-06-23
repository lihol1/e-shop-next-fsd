export type Features = {
    [key: string]: string;
};

export type Product = {
    id: number;
    categoryId: number;
    name: string;
    features: Features;
    price: number;
    src: string;
    quantity?: number;
};

export type InitialProductState = {
    productList: Product[];    
    filteredByCategory: Product[];
    filteredByParams: Product[] | null;
    foundProducts: Product[];
    searchList: Array<Product[]>;
    requestParams: RequestParams;
    maxPrice: number;
};


export type RequestParams = {
    min: number;
    max: number;
    features: Feat;
};

export type Feat = {
    [key: string]: string[];
};
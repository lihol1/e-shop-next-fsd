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
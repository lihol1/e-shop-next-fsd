import { Product, RequestParams } from "../model/types";

export function filter(list: Product[], params: RequestParams) {
                let tempArr = list.filter((prod) => prod.price >= params.min && prod.price <= params.max);
                if (tempArr.length > 0) {
                    tempArr = tempArr.filter((prod) => {
                        let i = 0;
                        let count = 0;
                        for (const feat in params.features) {
                            if ((params.features[feat as keyof typeof params.features] as string[]).length > 0) {
                                count++;
                                if ((params.features[feat as keyof typeof params.features] as string[]).includes(prod.features[feat])) {
                                    i++;
                                }
                            }
                        }
                        return i === count;
                    });
                }
                return tempArr;
            }
export interface IProduct {
  _id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  image: {
    large: string;
    medium: string;
    small: string;
    alt: string;
  };
}

export interface UserCart {
  productsCart: IProduct[];
}

export type Category = {
  id: string;
  name: string;
};

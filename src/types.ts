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

type productType = Partial<IProduct>;
export interface UserCart {
  product: productType;
  quantity: number;
}

export type Category = {
  id: string;
  name: string;
};

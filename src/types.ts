export interface IProduct {
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  image: {
    url: string;
    alt: string;
  };
}

type productType = Partial<IProduct>;
export interface UserCart {
  product: productType;
  quantity: number;
}

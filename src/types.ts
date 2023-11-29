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

export interface IProductCardProps {
  product: IProduct;
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

export interface SignUp_signInProp {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

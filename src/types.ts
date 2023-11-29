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
  img: string;
};

export interface SignUp_signIn {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

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

export interface UserCart {
  productsCart: IProduct[];
}

export type Category = {
  id: string;
  name: string;
  img: string;
};

export interface PaymentFormProps {
  subtotal: number;
  shippingFee: number;
}

export interface OrderProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}
export interface ShippingDetails {
  userId: number;
  address: string;
  contactNumber: string;
  orderType: string;
}
export interface Order {
  id?: string;
  cartItems: OrderProduct[];
  orderTime: string;
  status: string;
  price: number;
  shippingDetails: ShippingDetails;
}
export interface SignUp_signInProp {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

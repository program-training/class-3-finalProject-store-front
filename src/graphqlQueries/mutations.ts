import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($user: User!) {
    register(user: $user) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($user: User!) {
    login(user: $user) {
      token
    }
  }
`;

export const POST_ORDER = gql`
  mutation PostOrderCart($order: Order!) {
    postOrderCart(order: $order) {
      id
      orderTime
      status
      price
      cartItems {
        _id
        name
        price
        quantity
      }
      shippingDetails {
        address
        userId
        contactNumber
        orderType
      }
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($deleteCartInput: DeleteCartInput) {
    deleteCartItem(deleteCartInput: $deleteCartInput) {
      userId
      product
    }
  }
`;
export const ADD_CART_ITEM = gql`
  mutation AddCartItem($cartItem: CartItemInput!) {
    addCartItem(cartItem: $cartItem) {
      userId
      product
    }
  }
`;

import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($user: User!) {
    register(user: $user)
  }
`;

export const LOGIN = gql`
  mutation Login($user: User!) {
    login(user: $user)
  }
`;

export const POST_ORDER = gql`
  mutation postOrderCart($order: Order!) {
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

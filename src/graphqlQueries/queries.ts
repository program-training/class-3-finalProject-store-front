import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getAllProducts($categoryName: String) {
    getAllProducts(categoryName: $categoryName) {
      _id
      name
      salePrice
      quantity
      description
      category
      discountPercentage
      image {
        large
        medium
        small
        alt
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($productId: ID!) {
    getProduct(productId: $productId) {
      _id
      name
      salePrice
      quantity
      description
      category
      discountPercentage
      image {
        large
        medium
        small
        alt
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      _id
      name
      img
    }
  }
`;

export const GET_CART_BY_USER = gql`
  query getCartByUser($userId: String) {
    getCategories(userId: $userId) {
      userId
      product
    }
  }
`;

export const SIMILAR_PRODUCTS = gql`
  query SimilarProductsQuery($categoryName: String, $quantity: Int) {
    similarProducts(categoryName: $categoryName, quantity: $quantity) {
      _id
      name
      salePrice
      quantity
      description
      category
      discountPercentage
      image {
        large
        medium
        small
        alt
      }
    }
  }
`;

export const GET_ORDER_BY_USER = gql`
  query GetOrderByUserQuery($userId: String!) {
    getOrderByUser(userId: $userId) {
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

export const GET_TRRIGER_CART= gql`
  query getTrrigerCart{
    getTrrigerCart {
      trrigerCart
    }
  }
`;
export const GET_TRRIGER_POSTGRES= gql`
  query getTrrigerPostgres{
    getTrrigerPostgres {
      trrigerUser
    }
  }
`;

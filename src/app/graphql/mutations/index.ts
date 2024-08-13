import { gql } from "@apollo/client";


export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $price: Float!
    $description: String!
    $category: String!
    $stock: Int!
    $image: String!
    $variations: [VariationInput!]!
  ) {
    addProduct(
      name: $name
      price: $price
      description: $description
      category: $category
      stock: $stock
      image: $image
      variations: $variations
    ) {
      status
      message
    }
  }
`;

// Mutation for admin login
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    loginAdmin(username: $username, password: $password) {
      status
      message
    }
  }
`;

// Mutation to activate an item (or user) by ID
export const ACTIVATE = gql`
  mutation Activate($id: ID!) {
    activate(id: $id) {
      status
      message
    }
  }
`;


export const LOGOUT = gql`
  mutation Logout {
    logout {
      status
      message
    }
  }
`;


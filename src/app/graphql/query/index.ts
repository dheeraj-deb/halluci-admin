import { gql } from "@apollo/client";

export const GetProduct = gql`
  query GetProduct{
    getProducts {
    _id
    name
    description
    category
    price
    image
    variations {
      color
      image
    }
  }
  }
`;

export const AddProduct = gql`
  mutation addProduct($input: AddProductInput!) {
    addProduct(input: $input) {
      status
      message
    }
  }
`;

export const GetUsers = gql`
  query getUsers {
    _id
    name
    shopname
    phone
    address {
      place
      pincode
      city
      state
      address
    }
    password
}
`;


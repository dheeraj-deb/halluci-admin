import { gql } from "@apollo/client";

// Query to get a list of products
export const GET_PRODUCTS = gql`
  query GetProducts {
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

// Query to get the user's profile
export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      status
    }
  }
`;

// Query to get a list of users
export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      shopname
      phone
      verified
      address{
        city
        state
       
      }
    }
  }
`;



export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      _id
      label
      
    }
  }
`;
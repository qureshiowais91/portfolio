// schema.js
const { gql } = require('apollo-server-express');
// const { GraphQLUpload } = require('graphql-upload');

const typeDefs = gql`
  scalar Upload

  type File {
    id: ID!
    filename: String!
    # Add other fields as needed
  }

  type Query {
    files: [File!]!
    file(id: ID!): File
  }

  type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

module.exports = typeDefs;

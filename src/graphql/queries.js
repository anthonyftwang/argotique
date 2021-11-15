/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      bio
      joinedAt
      createdAt
      updatedAt
      owner
      UserPosts {
        items {
          id
          title
          subtitle
          content
          createdAt
          updatedAt
          lastActivityAt
          votes
          userID
          owner
        }
        nextToken
      }
      VotesFor {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        bio
        joinedAt
        createdAt
        updatedAt
        owner
        UserPosts {
          nextToken
        }
        VotesFor {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      content
      createdAt
      updatedAt
      votes
      postID
      owner
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        updatedAt
        votes
        postID
        owner
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      subtitle
      content
      createdAt
      updatedAt
      lastActivityAt
      votes
      userID
      PostComments {
        items {
          id
          content
          createdAt
          updatedAt
          votes
          postID
          owner
        }
        nextToken
      }
      owner
      VotedBy {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        subtitle
        content
        createdAt
        updatedAt
        lastActivityAt
        votes
        userID
        PostComments {
          nextToken
        }
        owner
        VotedBy {
          nextToken
        }
      }
      nextToken
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      joinedAt
      bio
      createdAt
      updatedAt
      owner
      posts {
        items {
          id
          title
          subtitle
          content
          createdAt
          updatedAt
          lastActivityAt
          voteCount
          commentCount
          userID
          owner
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        joinedAt
        bio
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
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
      voteCount
      commentCount
      userID
      user {
        id
        name
        joinedAt
        bio
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
      }
      owner
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          userID
          postID
          owner
        }
        nextToken
      }
      votes {
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
        voteCount
        commentCount
        userID
        user {
          id
          name
          joinedAt
          bio
          createdAt
          updatedAt
          owner
        }
        owner
        comments {
          nextToken
        }
        votes {
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
      userID
      postID
      user {
        id
        name
        joinedAt
        bio
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
      }
      post {
        id
        title
        subtitle
        content
        createdAt
        updatedAt
        lastActivityAt
        voteCount
        commentCount
        userID
        user {
          id
          name
          joinedAt
          bio
          createdAt
          updatedAt
          owner
        }
        owner
        comments {
          nextToken
        }
        votes {
          nextToken
        }
      }
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
        userID
        postID
        user {
          id
          name
          joinedAt
          bio
          createdAt
          updatedAt
          owner
        }
        post {
          id
          title
          subtitle
          content
          createdAt
          updatedAt
          lastActivityAt
          voteCount
          commentCount
          userID
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
export const getPostVote = /* GraphQL */ `
  query GetPostVote($id: ID!) {
    getPostVote(id: $id) {
      id
      userID
      postID
      createdAt
      updatedAt
      post {
        id
        title
        subtitle
        content
        createdAt
        updatedAt
        lastActivityAt
        voteCount
        commentCount
        userID
        user {
          id
          name
          joinedAt
          bio
          createdAt
          updatedAt
          owner
        }
        owner
        comments {
          nextToken
        }
        votes {
          nextToken
        }
      }
      owner
    }
  }
`;
export const listPostVotes = /* GraphQL */ `
  query ListPostVotes(
    $filter: ModelPostVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        post {
          id
          title
          subtitle
          content
          createdAt
          updatedAt
          lastActivityAt
          voteCount
          commentCount
          userID
          owner
        }
        owner
      }
      nextToken
    }
  }
`;

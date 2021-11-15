/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createUserPost = /* GraphQL */ `
  mutation CreateUserPost(
    $input: CreateUserPostInput!
    $condition: ModelUserPostConditionInput
  ) {
    createUserPost(input: $input, condition: $condition) {
      id
      userID
      postID
      createdAt
      updatedAt
      user {
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
      post {
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
      owner
    }
  }
`;
export const updateUserPost = /* GraphQL */ `
  mutation UpdateUserPost(
    $input: UpdateUserPostInput!
    $condition: ModelUserPostConditionInput
  ) {
    updateUserPost(input: $input, condition: $condition) {
      id
      userID
      postID
      createdAt
      updatedAt
      user {
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
      post {
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
      owner
    }
  }
`;
export const deleteUserPost = /* GraphQL */ `
  mutation DeleteUserPost(
    $input: DeleteUserPostInput!
    $condition: ModelUserPostConditionInput
  ) {
    deleteUserPost(input: $input, condition: $condition) {
      id
      userID
      postID
      createdAt
      updatedAt
      user {
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
      post {
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
      owner
    }
  }
`;

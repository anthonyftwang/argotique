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
      joinedAt
      createdAt
      updatedAt
      owner
      bio
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      joinedAt
      createdAt
      updatedAt
      owner
      bio
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      joinedAt
      createdAt
      updatedAt
      owner
      bio
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
      voteCount
      commentCount
      userID
      user {
        id
        name
        email
        joinedAt
        createdAt
        updatedAt
        owner
        bio
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
      voteCount
      commentCount
      userID
      user {
        id
        name
        email
        joinedAt
        createdAt
        updatedAt
        owner
        bio
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
      voteCount
      commentCount
      userID
      user {
        id
        name
        email
        joinedAt
        createdAt
        updatedAt
        owner
        bio
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
      userID
      postID
      user {
        id
        name
        email
        joinedAt
        createdAt
        updatedAt
        owner
        bio
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
          email
          joinedAt
          createdAt
          updatedAt
          owner
          bio
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
      userID
      postID
      user {
        id
        name
        email
        joinedAt
        createdAt
        updatedAt
        owner
        bio
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
          email
          joinedAt
          createdAt
          updatedAt
          owner
          bio
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
      userID
      postID
      user {
        id
        name
        email
        joinedAt
        createdAt
        updatedAt
        owner
        bio
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
          email
          joinedAt
          createdAt
          updatedAt
          owner
          bio
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
export const createPostVote = /* GraphQL */ `
  mutation CreatePostVote(
    $input: CreatePostVoteInput!
    $condition: ModelPostVoteConditionInput
  ) {
    createPostVote(input: $input, condition: $condition) {
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
          email
          joinedAt
          createdAt
          updatedAt
          owner
          bio
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
export const updatePostVote = /* GraphQL */ `
  mutation UpdatePostVote(
    $input: UpdatePostVoteInput!
    $condition: ModelPostVoteConditionInput
  ) {
    updatePostVote(input: $input, condition: $condition) {
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
          email
          joinedAt
          createdAt
          updatedAt
          owner
          bio
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
export const deletePostVote = /* GraphQL */ `
  mutation DeletePostVote(
    $input: DeletePostVoteInput!
    $condition: ModelPostVoteConditionInput
  ) {
    deletePostVote(input: $input, condition: $condition) {
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
          email
          joinedAt
          createdAt
          updatedAt
          owner
          bio
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

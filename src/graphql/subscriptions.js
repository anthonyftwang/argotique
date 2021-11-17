/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreatePostVote = /* GraphQL */ `
  subscription OnCreatePostVote {
    onCreatePostVote {
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
export const onUpdatePostVote = /* GraphQL */ `
  subscription OnUpdatePostVote {
    onUpdatePostVote {
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
export const onDeletePostVote = /* GraphQL */ `
  subscription OnDeletePostVote {
    onDeletePostVote {
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

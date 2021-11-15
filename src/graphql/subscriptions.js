/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateUserPost = /* GraphQL */ `
  subscription OnCreateUserPost {
    onCreateUserPost {
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
export const onUpdateUserPost = /* GraphQL */ `
  subscription OnUpdateUserPost {
    onUpdateUserPost {
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
export const onDeleteUserPost = /* GraphQL */ `
  subscription OnDeleteUserPost {
    onDeleteUserPost {
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

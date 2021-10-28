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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      VotesFor {
        items {
          id
          userID
          postID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      VotesFor {
        items {
          id
          userID
          postID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      VotesFor {
        items {
          id
          userID
          postID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      PostComments {
        items {
          id
          content
          createdAt
          updatedAt
          votes
          postID
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      owner
      VotedBy {
        items {
          id
          userID
          postID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      PostComments {
        items {
          id
          content
          createdAt
          updatedAt
          votes
          postID
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      owner
      VotedBy {
        items {
          id
          userID
          postID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      PostComments {
        items {
          id
          content
          createdAt
          updatedAt
          votes
          postID
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      owner
      VotedBy {
        items {
          id
          userID
          postID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
        id
        name
        email
        bio
        joinedAt
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserPosts {
          nextToken
          startedAt
        }
        VotesFor {
          nextToken
          startedAt
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
        _version
        _deleted
        _lastChangedAt
        PostComments {
          nextToken
          startedAt
        }
        owner
        VotedBy {
          nextToken
          startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
        id
        name
        email
        bio
        joinedAt
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserPosts {
          nextToken
          startedAt
        }
        VotesFor {
          nextToken
          startedAt
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
        _version
        _deleted
        _lastChangedAt
        PostComments {
          nextToken
          startedAt
        }
        owner
        VotedBy {
          nextToken
          startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
        id
        name
        email
        bio
        joinedAt
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserPosts {
          nextToken
          startedAt
        }
        VotesFor {
          nextToken
          startedAt
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
        _version
        _deleted
        _lastChangedAt
        PostComments {
          nextToken
          startedAt
        }
        owner
        VotedBy {
          nextToken
          startedAt
        }
      }
      owner
    }
  }
`;

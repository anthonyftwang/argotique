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
  subscription OnCreateComment($owner: String) {
    onCreateComment(owner: $owner) {
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
  subscription OnUpdateComment($owner: String) {
    onUpdateComment(owner: $owner) {
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
  subscription OnDeleteComment($owner: String) {
    onDeleteComment(owner: $owner) {
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
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
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
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
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
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
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
  subscription OnCreateUserPost($owner: String) {
    onCreateUserPost(owner: $owner) {
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
  subscription OnUpdateUserPost($owner: String) {
    onUpdateUserPost(owner: $owner) {
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
  subscription OnDeleteUserPost($owner: String) {
    onDeleteUserPost(owner: $owner) {
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

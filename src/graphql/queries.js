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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUserPosts = /* GraphQL */ `
  query SyncUserPosts(
    $filter: ModelUserPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          owner
        }
        owner
      }
      nextToken
      startedAt
    }
  }
`;

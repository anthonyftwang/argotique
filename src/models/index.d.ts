import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields;
}

type CommentMetaData = {
  readOnlyFields;
}

type UserPostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly bio?: string;
  readonly joinedAt: string;
  readonly UserPosts?: (Post | null)[];
  readonly VotesFor?: (UserPost | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly content?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastActivityAt: string;
  readonly votes: number;
  readonly userID: string;
  readonly PostComments?: (Comment | null)[];
  readonly VotedBy?: (UserPost | null)[];
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly content: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly votes: number;
  readonly postID: string;
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

export declare class UserPost {
  readonly id: string;
  readonly user: User;
  readonly post: Post;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserPost, UserPostMetaData>);
  static copyOf(source: UserPost, mutator: (draft: MutableModel<UserPost, UserPostMetaData>) => MutableModel<UserPost, UserPostMetaData> | void): UserPost;
}
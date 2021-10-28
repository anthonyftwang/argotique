// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Post, Comment, UserPost } = initSchema(schema);

export {
  User,
  Post,
  Comment,
  UserPost
};
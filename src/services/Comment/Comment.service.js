import { API } from 'aws-amplify';
import { listComments as listCommentsQuery } from 'graphql/queries';
import { createComment as createCommentMutation } from 'graphql/mutations';

export const listCommentsService = async function apiListCommentsService(
  postID
) {
  const commentData = await API.graphql({
    query: listCommentsQuery,
    variables: {
      filter: {
        postID: { eq: postID },
      },
    },
  });
  return commentData.data.listComments.items;
};

export const createCommentService = async function apiCreateCommentService(
  content,
  userID,
  postID
) {
  const date = new Date();
  const params = {
    content,
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
    userID,
    postID,
  };
  const newComment = await API.graphql({
    query: createCommentMutation,
    variables: { input: params },
  });
  return newComment;
};

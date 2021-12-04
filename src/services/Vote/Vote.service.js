import { API } from 'aws-amplify';
import { listPostVotes as listPostVotesQuery } from 'graphql/queries';
import {
  createPostVote as createPostVoteMutation,
  deletePostVote as deletePostVoteMutation,
} from 'graphql/mutations';

export const listPostVotesService = async function apiListPostVotesService(
  userID
) {
  const likeData = await API.graphql({
    query: listPostVotesQuery,
    variables: {
      filter: {
        userID: { eq: userID },
      },
    },
  });
  return likeData.data.listPostVotes.items;
};

export const createPostVoteService = async function apiCreatePostVoteService(
  userID,
  postID
) {
  const date = new Date();
  const voteParams = {
    userID,
    postID,
    createdAt: date.toISOString(),
  };
  const newPostVote = await API.graphql({
    query: createPostVoteMutation,
    variables: { input: voteParams },
  });
  return newPostVote.data.createPostVote;
};

export const deletePostVoteService = async function apiDeletePostVoteService(
  id
) {
  await API.graphql({
    query: deletePostVoteMutation,
    variables: { input: { id } },
  });
};

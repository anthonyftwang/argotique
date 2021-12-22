import { API } from 'aws-amplify';
import {
  getPost as getPostQuery,
  listPosts as listPostsQuery,
} from 'graphql/queries';
import {
  createPost as createPostMutation,
  updatePost as updatePostMutation,
  deletePost as deletePostMutation,
} from 'graphql/mutations';
import { listPostVotesService } from 'services/Vote';

export const getPostService = async function apiGetPostService(id, userID) {
  const postData = await API.graphql({
    query: getPostQuery,
    variables: { id },
  });
  const post = {
    ...postData.data.getPost,
    isLiked: postData.data.getPost.votes.items.some(
      (vote) => vote.userID === userID
    ),
    isOwnedByUser: postData.data.getPost.user.id === userID,
  };
  return post;
};

export const listAllPostsService = async function apiListAllPostsService(
  userID
) {
  const postData = await API.graphql({ query: listPostsQuery });
  const likeData = await listPostVotesService(userID);
  const posts = postData.data.listPosts.items.map((post) => ({
    ...post,
    isLiked: likeData.some((like) => like.postID === post.id),
  }));
  return posts;
};

export const listUserPostsService = async function apiListUserPostsService(
  userID
) {
  const postData = await API.graphql({
    query: listPostsQuery,
    variables: {
      filter: {
        userID: { eq: userID },
      },
    },
  });
  const likeData = await listPostVotesService(userID);
  const posts = postData.data.listPosts.items.map((post) => ({
    ...post,
    isLiked: likeData.some((like) => like.postID === post.id),
  }));
  return posts;
};

export const listLikedPostsService = async function apiListLikedPostsService(
  userID
) {
  const likeData = await listPostVotesService(userID);
  const likedIDs = likeData.map((like) => like.postID);
  const likedFilter = likedIDs.map((likeID) => ({
    id: { eq: likeID },
  }));
  const postData = await API.graphql({
    query: listPostsQuery,
    variables: {
      filter: {
        or: likedFilter,
      },
    },
  });
  const posts = postData.data.listPosts.items.map((post) => ({
    ...post,
    isLiked: likeData.some((like) => like.postID === post.id),
  }));
  return posts;
};

export const createPostService = async function apiCreatePostService(
  title,
  subtitle,
  content,
  userID
) {
  const date = new Date();
  const postParams = {
    title,
    subtitle,
    content,
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
    lastActivityAt: date.toISOString(),
    voteCount: 0,
    commentCount: 0,
    userID,
  };
  const newPost = await API.graphql({
    query: createPostMutation,
    variables: { input: postParams },
  });
  return newPost.data.createPost;
};

export const updatePostContentService =
  async function apiUpdatePostContentService(id, title, subtitle, content) {
    const date = new Date();
    const postParams = {
      id,
      title,
      subtitle,
      content,
      updatedAt: date.toISOString(),
      lastActivityAt: date.toISOString(),
    };
    await API.graphql({
      query: updatePostMutation,
      variables: { input: postParams },
    });
  };

export const updatePostVoteCountService = async function apiUpdatePostVoteCount(
  id,
  voteCount
) {
  const postParams = {
    id,
    voteCount,
  };
  await API.graphql({
    query: updatePostMutation,
    variables: { input: postParams },
  });
};

export const updatePostCommentCountService =
  async function apiUpdatePostCommentCountService(id, commentCount) {
    const date = new Date();
    const postParams = {
      id,
      commentCount,
      lastActivityAt: date.toISOString(),
    };
    await API.graphql({
      query: updatePostMutation,
      variables: { input: postParams },
    });
  };

export const deletePostService = async function apiDeletePostService(id) {
  await API.graphql({
    query: deletePostMutation,
    variables: { input: { id } },
  });
};
